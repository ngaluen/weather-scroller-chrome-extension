document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggleSwitch");

  chrome.storage.sync.get("toggleState", function (data) {
    var toggleState = data.toggleState;

    // Set the default toggle state if it's not stored in storage
    if (toggleState === undefined) {
      toggleState = true;
      chrome.storage.sync.set({ toggleState: toggleState });
    }

    // Update the toggle switch state
    toggleSwitch.checked = toggleState;

    toggleSwitch.addEventListener("change", function () {
      toggleState = toggleSwitch.checked;
      chrome.storage.sync.set({ toggleState: toggleState });

      // Send a message to the active tab to enable or disable the weather scroller
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { enabled: toggleState });
      });
    });
  });
});
