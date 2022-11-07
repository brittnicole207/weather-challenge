//Api Key
const apiKey = "df2bb5439b348fc694c1df0bcc4620f9";
//const moment = require("moment");

//Dom Elements
let inputEl = document.querySelector(".input");
let searchBtnEl = document.querySelector(".search.button");
let citiesListEl = document.querySelector(".cities-list");

// Sets the cityName in LocalStorage
let cityName = localstorage.getItem("cityNameStore");

// URL for current day parameters (city name + weather units of measurements)
let weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&units=imperial" +
  apiKey;

// URL for 5-days forecast parameters (city name + weather units of measurements)
let forecastURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&units=imperial" +
  apiKey;

//Sets the input value in localStorage
function recordCityData() {
  localStorage.setItem("cityNameStore", inputEl.value);
}

// Append the search input from localStorage to the cities list
for (var i = 0; i < localStorage.length; i++) {
  $("cities-list").append(
    "<p>" + localStorage.getItem(localStorage.key(i)) + "</p>"
  );
}

// Current day forecast function
$.ajax({
  url: URLWeather,
  method: "GET",
}).then(function (response) {
  //Add weather info to page
  $(".city").html("<h2>" + response.name + "</h2>");
  $(".weather-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png' >"
  );
  $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
  $(".humidity").text("Humidity: " + response.main.humidity + "%");
  $(".temperature").text("Temperature: " + response.main.temp + " F");

  //URL for UV Index
  const lat = response.coord.lat;
  const lon = response.coord.lon;
  let queryURLUV =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    apiKey;

  //UV Index Function
  $.ajax({
    url: queryURLUv,
    method: "GET",
  }).then(function (response) {
    var uvValue = response.value;

    //Add UV Index to page
    $(".uv").text("UV Index: " + response.value);
    $(".uv").css("background-color", uvColor(uvValue));
  });
});

//Function for UV Index colors - Returns a color depending on what the UV index is for that day
function uvColor(uvValue, colorbgd) {
  if (uvValue <= 2) {
    colorbgd = "#66FF00"; // HEX Code for Green will return if the UV is less than or equal to two
  } else if (uvValue <= 5 && uvNum > 2) {
    colorbgd = "#FFBB00"; // HEX Code for Orange. The background of the UV value will return if the UV is less than or equal to five
  } else if (uvValue >= 6 && uvValue > 5) {
    colorbgd = "#FF0000"; // HEX Code for Red. The background of the UV value will return red if the UV is greater than or equal to 6 and greater than 5
  }
  return colorbgd;
}

//Day Display
var currentDay = moment().format("dddd, MMMM Do");

function functionDay() {
  $(".current-date").text(currentDay);
}
functionDay();

// 5 Day Forecast Function
$.ajax({
  url: URLForecast,
  method: "GET",
}).then(function (response) {
  var dayOne = moment(response.list[0].dt_txt).format("ddd, MMM D");

  //Inputs data from Day One to HTML
  $(".day-one-temperature").text("Temp: " + response.list[0].main.temp + " F");
  $("day-one-date").html("<h6>" + dayOne + "</h6>");
  $(".day-one-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[0].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-one-humidity").text(
    "Humidity: " + response.list[0].main.humidity + "%"
  );

  var dayTwo = moment(response.list[8].dt_txt).format("ddd, MMM D");
  //Inputs data from Day Two to HTML
  $(".day-two-temperature").text("Temp: " + response.list[8].main.temp + " F");
  $("day-two-date").html("<h6>" + dayTwo + "</h6>");
  $(".day-two-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[8].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-two-humidity").text(
    "Humidity: " + response.list[8].main.humidity + "%"
  );

  var dayThree = moment(response.list[16].dt_txt).format("ddd, MMM D");
  //Inputs data from Day Three to HTML
  $(".day-three-temperature").text(
    "Temp: " + response.list[16].main.temp + " F"
  );
  $("day-three-date").html("<h6>" + dayThree + "</h6>");
  $(".day-three-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[16].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-three-humidity").text(
    "Humidity: " + response.list[16].main.humidity + "%"
  );

  var dayFour = moment(response.list[24].dt_txt).format("ddd, MMM D");
  //Inputs data from Day Four to HTML
  $(".day-four-temperature").text(
    "Temp: " + response.list[24].main.temp + " F"
  );
  $("day-four-date").html("<h6>" + dayFour + "</h6>");
  $(".day-four-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[24].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-four-humidity").text(
    "Humidity: " + response.list[24].main.humidity + "%"
  );

  var dayFive = moment(response.list[32].dt_txt).format("ddd, MMM D");
  // Inputs data from Day Five to HTML
  $(".day-five-temperature").text(
    "Temp: " + response.list[32].main.temp + " F"
  );
  $("day-five-date").html("<h6>" + dayFive + "</h6>");
  $(".day-five-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[32].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-five-humidity").text(
    "Humidity: " + response.list[32].main.humidity + "%"
  );
});

//Allows Search Button to become Event Listener
searchBtnEl.addEventListener("click", recordCityData);
