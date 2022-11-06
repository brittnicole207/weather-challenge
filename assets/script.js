//api key
const apiKey = "df2bb5439b348fc694c1df0bcc4620f9";
const moment = require("moment");

//dom elements
let inputEl = document.querySelector(".input");
let searchBtnEl = document.querySelector("search.button");
let citiesListEl = document.querySelector(".cities-list");

//searched city name in local storage
let cityName = localstorage.getItem("cityNameEntry");

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

//sets the input value in localStorage
function recordCityData() {
  localStorage.setItem("cityNameEntry", inputEl.value);
}

// Append the search input from localStorage to the cities list
for (let i = 0; i < localStorage.length; i++) {
  $("cities-list").append(
    "<p>" + localStorage.getItem(localStorage.key(i)) + "</p>"
  );
}

function functionDate() {
  $(".current-date").text(currentDay);
}
functionDate();

// Current day forecast function
$.ajax({
  url: weatherURL,
  method: "GET",
}).then(function (response) {
  //Add weather to page
  $(".city").html("<h2" > +response.name + "</h2>");
  $(".weather-icon").html(
    "<img src=https://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png' >"
  );
  $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
  $(".humidity").text("Humidity: " + response.main.humidity + "%");
  $(".temperature").text("Temperature: " + response.main.temp + " F");

  //URL for UV Index
  let lat = response.coord.lat;
  let lon = response.coord.lon;
  let queryURLUV = "";

  //UV Index Function
  $.ajax({
    url: queryURLUV,
    method: "GET",
  }).then(function (response) {
    let uvNum = response.value;

    //Add UV Index to page
    $(".uv").text("UV Index: " + response.value);
    $(".uv").css("background-color", uvColor(uvValue));
  });
});

//Function for UV Index colors - Returns a color depending on what the UV index is for that day
function uvColor(uvValue, colorbgd) {
  if (uvValue <= 2) {
    colorbgd = "#66FF00"; // HEX Code for Green will return if the UV is less than or equal to two
  } else if (uvValue <= 5 && uvValue > 2) {
    colorbgd = "#FFBB00"; // HEX Code for Orange. The background of the UV value will return if the UV is less than or equal to five
  } else if (uvvalue >= 6 && uvValue > 5) {
    colorbgd = "#FF0000"; // HEX Code for Red. The background of the UV value will return red if the UV is greater than or equal to 6 and greater than 5
  }
  return colorbgd;
}

//Day Display
let currentDay = moment().format("ddd, MMMM, D"); //Formats the day using moment.js

function functionDay() {
  $(".current-date").text(currentDay);
}
functionDay();

// Function for 5 Day Forecast
$.ajax({
  url: URLWeather,
  method: "GET",
}).then(function (response) {
  let dayOne = moment(response.list[0].dt.txt).format("ddd, MMM D");
  //Inputs data from Day One to HTML
  $(".day-one-temperature").text("Temp " + response.list[0].main.temp + " F");
  $("day-one-date").html("<h6>" + dayOne + "</h6>");
  $(".day-one-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[0].weather[0].icon +
      response.list[0].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-one-humidity").text(
    "Humidity: " + response.list[0].main.humidity + "%"
  );

  let dayTwo = moment(response.list[8].dt.txt).format("ddd, MMM D");
  //Inputs data from Day Two to HTML
  $(".day-two-temperature").text("Temp " + response.list[8].main.temp + " F");
  $("day-two-date").html("<h6>" + dayTwo + "</h6>");
  $(".day-two-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[8].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-two-humidity").text(
    "Humidity: " + response.list[8].main.humidity + "%"
  );

  let dayThree = moment(response.list[16].dt.txt).format("ddd, MMM D");
  //Inputs data from Day Three to HTML
  $(".day-three-temperature").text(
    "Temp " + response.list[16].main.temp + " F"
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

  let dayFour = moment(response.list[24].dt.txt).format("ddd, MMM D");
  //Inputs data from Day Three to HTML
  $(".day-four-temperature").text("Temp " + response.list[24].main.temp + " F");
  $("day-four-date").html("<h6>" + dayFour + "</h6>");
  $(".day-four-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[24].weather[0].icon +
      ".png' alt='Icon that resembles current weather for the corresponding day.'>"
  );
  $("day-four-humidity").text(
    "Humidity: " + response.list[24].main.humidity + "%"
  );

  let dayFive = moment(response.list[32].dt.txt).format("ddd, MMM D");
  $(".day-five-temperature").text("Temp " + response.list[32].main.temp + " F");
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
