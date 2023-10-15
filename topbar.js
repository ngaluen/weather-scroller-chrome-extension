// Create scroller div
let scrollerDiv = document.createElement("div");
scrollerDiv.id = "scrollerDiv";

// Insert the div into the document before body
const body = document.getElementsByTagName("body")[0];
body.parentNode.insertBefore(scrollerDiv, body);

let weatherScrollerContent = document.createElement("p");
weatherScrollerContent.id = "weatherScrollerContent";

// fetch api
const request1 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en"
).then((response) => response.json());
const request2 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
).then((response) => response.json());
const request3 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
).then((response) => response.json());
const request4 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en"
).then((response) => response.json());
const request5 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en"
).then((response) => response.json());
const request6 = fetch(
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=en"
).then((response) => response.json());

Promise.all([request1, request2, request3, request4, request5, request6])
  .then(([data1, data2, data3, data4, data5, data6]) => {
    if (data3.warningMessage !== "") {
      weatherScrollerContent.innerText =
        data5.details[0].contents +
        " " +
        `The following is the weather forecast for today updated at ${data1.updateTime}: ` +
        " " +
        data1.forecastDesc +
        " " +
        data2.generalSituation;
    } else {
      weatherScrollerContent.innerText =
        `The following is the weather forecast for today updated at ${data1.updateTime}: ` +
        " " +
        data1.forecastDesc +
        " " +
        data2.generalSituation;
    }
  })
  .catch((error) => {
    console.error(error);
  });

scrollerDiv.appendChild(weatherScrollerContent);
var isWeatherScrollerEnabled = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.enabled !== undefined) {
    if (message.enabled) {
      enableWeatherScroller();
    } else {
      disableWeatherScroller();
    }
  }
});

function enableWeatherScroller() {
  if (!isWeatherScrollerEnabled) {
    scrollerDiv.style.display = "block";
    isWeatherScrollerEnabled = true;
  }
}

function disableWeatherScroller() {
  if (isWeatherScrollerEnabled) {
    scrollerDiv.style.display = "none";

    isWeatherScrollerEnabled = false;
  }
}

// might be useful
// let firstChild = document.body.firstElementChild;
// document.body.insertBefore(scrollerDiv, firstChild);
// scrollerDiv.appendChild(weatherScrollerContent);
