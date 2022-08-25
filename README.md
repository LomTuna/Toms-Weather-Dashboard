# Toms-Weather-Dashboard
function init(){
var clearEl = document.getElementById("clear-history");
var inputEl = document.getElementById("city-input");
var searchEl = document.getElementById("search-button"); 

// vars used for visual/textual elements "what's being searched"
var cityNameEl = document.getElementById("city-name"); 
var currentPic = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumEl = document.getElementById("humidity"); 
var currentWindEl = document.getElementById("wind-speed"); 
var currentUvIndex = document.getElementById("UV-index");

var historyEl = document.getElementById("history"); 
// pulls search history in JSON (parsed) format, with a console Log
var searchHistory = JSON.parse(localStorage.getItem("search")) || []; 
console.log(searchHistory);

//API Key needed, to communicate with ... API lol 
var APIKey = "9f0d64292e1b281a67cbfa79b9ff3cb6"

// function to operate off of search button, register city name typed

function getWeather (cityName) {
// create a URL when city name is typed to condition a request from weather API

var getURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
axios.get(getURL)

.then(function(response){
    console.log(response);
//  Parse response to display current conditions
//  Method for using "date" objects obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const currentDate = new Date(response.data.dt*1000);
    console.log(currentDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
    let weatherPic = response.data.weather[0].icon;
    currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    currentPicEl.setAttribute("alt",response.data.weather[0].description);
    currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
    currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
    currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
let lat = response.data.coord.lat;
let lon = response.data.coord.lon;
let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
axios.get(UVQueryURL)
.then(function(response){
    let UVIndex = document.createElement("span");
    UVIndex.setAttribute("class","badge badge-danger");
    UVIndex.innerHTML = response.data[0].value;
    currentUVEl.innerHTML = "UV Index: ";
    currentUVEl.append(UVIndex);
});
//  Using saved city name, execute a 5-day forecast get request from open weather map api
let cityID = response.data.id;
let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
axios.get(forecastQueryURL)
.then(function(response){
//  Parse response to display forecast for next 5 days underneath current conditions
    console.log(response);
    const forecastEls = document.querySelectorAll(".forecast");
    for (i=0; i<forecastEls.length; i++) {
        forecastEls[i].innerHTML = "";
        const forecastIndex = i*8 + 4;
        const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
        const forecastDay = forecastDate.getDate();
        const forecastMonth = forecastDate.getMonth() + 1;
        const forecastYear = forecastDate.getFullYear();
        const forecastDateEl = document.createElement("p");
        forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
        forecastEls[i].append(forecastDateEl);
        const forecastWeatherEl = document.createElement("img");
        forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
        forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
        forecastEls[i].append(forecastWeatherEl);
        const forecastTempEl = document.createElement("p");
        forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
        forecastEls[i].append(forecastTempEl);
        const forecastHumidityEl = document.createElement("p");
        forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
        forecastEls[i].append(forecastHumidityEl);
        }
    })
});  
}

searchEl.addEventListener("click",function() {
const searchTerm = inputEl.value;
getWeather(searchTerm);
searchHistory.push(searchTerm);
localStorage.setItem("search",JSON.stringify(searchHistory));
renderSearchHistory();
})

clearEl.addEventListener("click",function() {
searchHistory = [];
renderSearchHistory();
})

function k2f(K) {
return Math.floor((K - 273.15) *1.8 +32);
}

function renderSearchHistory() {
historyEl.innerHTML = "";
for (let i=0; i<searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
    historyItem.setAttribute("type","text");
    historyItem.setAttribute("readonly",true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click",function() {
        getWeather(historyItem.value);
    })
    historyEl.append(historyItem);
}
}

renderSearchHistory();
if (searchHistory.length > 0) {
getWeather(searchHistory[searchHistory.length - 1]);
}
}
init();
