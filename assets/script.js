//vars used to search 
function initPage() {
  var inputEl = document.getElementById("city-input");
  var searchEl = document.getElementById("search-button");
  var clearEl = document.getElementById("clear-history");
  var nameEl = document.getElementById("city-name");
  var currentPicEl = document.getElementById("current-pic");
  var currentTempEl = document.getElementById("temperature");
  var currentHumidityEl = document.getElementById("humidity");4
  var currentWindEl = document.getElementById("wind-speed");
  var currentUVEl = document.getElementById("UV-index");
  var historyEl = document.getElementById("history");
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  console.log(searchHistory);
  

  var APIKey = "9f0d64292e1b281a67cbfa79b9ff3cb6";
//  When search button is clicked, read the city name typed by the user

 
initPage();
