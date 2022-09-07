window.addEventListener("load", main);

let apiKey = `fdaeb70f86d9811e4917af5701e5fdf2`;
let unit = `metric`;
let days = [
  "Sun", 
  "Mon", 
  "Thu", 
  "Wed", 
  "Tue", 
  "Fri", 
  "Sat"]

let webAdress = `https://api.openweathermap.org/data/2.5/weather?`;

// let temperature = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector("#temperature");
  
// let humidityToday = Math.round(response.data.main.humidity);
let humidity = document.querySelector("#humidityToday");

// let windSpeedToday = Math.round(response.data.wind.speed);
let windSpeed = document.querySelector("#windSpeedToday");

let cityName = document.querySelector("#city");
// let foundedCity = response.data.name;
let cityInput = document.querySelector("#inputCity");

// let latitude = position.coords.latitude;
// let longitude = position.coords.longitude;


function main() {
  let currentTime = new Date();
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatTime(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit)
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  let currentCity = document.querySelector("#currentPosition")
  currentCity.addEventListener("click", getCurrentPosition);
  
  let namedCityElement = document.querySelector("#namedCity");
  namedCityElement.addEventListener("click", displayForecastForNamedCity);
  }

function formatTime(date){
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  // let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature *9) / 5 + 32 );
}

function convertToCelsius(event) {
  event.preventDefault();
  // let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature -32) * 5 / 9 );
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(event) {
  event.preventDefault();
let cityName = document.querySelector("#city")
let cityInput = document.querySelector("#inputCity")
cityName.innerHTML = cityInput.value;

  function showTemperatureWindSpeedHumidity (response){
 console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let humidityToday = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityToday");
  humidity.innerHTML = humidityToday;

  let windSpeedToday = Math.round(response.data.wind.speed);
  // //console.log(windSpeedToday);
  let windSpeed = document.querySelector("#windSpeedToday");
  windSpeed.innerHTML = windSpeedToday;

  let iconElement =  document.querySelector("#icon")
iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute(
  "alt",
  response.data.weather[0].description);
  }

// let apiKey = `fdaeb70f86d9811e4917af5701e5fdf2`;
// let webAdress = `https://api.openweathermap.org/data/2.5/weather?`;
// let unit = `metric`;
let apiURL = `${webAdress}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
console.log(apiURL);
axios.get(apiURL).then(showTemperatureWindSpeedHumidity);
}

function showPosition (position) {
  function showTemperatureWindSpeedHumidityCity (response){
    console.log(response);
 
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
  
    let humidityToday = Math.round(response.data.main.humidity);
    let humidity = document.querySelector("#humidityToday");
    humidity.innerHTML = humidityToday;
  
    let windSpeedToday = Math.round(response.data.wind.speed);
    // //console.log(windSpeedToday);
    let windSpeed = document.querySelector("#windSpeedToday");
    windSpeed.innerHTML = windSpeedToday;

    let cityName = document.querySelector("#city")
    let foundedCity = response.data.name;
    cityName.innerHTML = foundedCity;

    let iconElement =  document.querySelector("#icon")
iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute(
  "alt",
  response.data.weather[0].description);
    }

let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
// let apiKey = `fdaeb70f86d9811e4917af5701e5fdf2`;
// let webAdress = `https://api.openweathermap.org/data/2.5/weather?`;
// let unit = `metric`;
let apiURLGeoloc = `${webAdress}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
console.log(apiURLGeoloc);
axios.get(apiURLGeoloc).then(showTemperatureWindSpeedHumidityCity);
  }


function displayForecastForNamedCity(event) {
  // console.log(event.target.dataset.value);
  event.preventDefault();
  let city = event.target.dataset.value;

  function showEverything (response){
    console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let humidityToday = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityToday");
  humidity.innerHTML = humidityToday;

  let windSpeedToday = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windSpeedToday");
  windSpeed.innerHTML = windSpeedToday;

  let descriptionToday = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = descriptionToday;

  let cityName = document.querySelector("#city");
    let foundedCity = response.data.name;
    cityName.innerHTML = foundedCity;

let iconElement =  document.querySelector("#icon")
iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute(
  "alt",
  response.data.weather[0].description);
}

// let webAdress = `https://api.openweathermap.org/data/2.5/weather?`;
// let unit = `metric`;
let apiURL = `${webAdress}q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiURL).then(showEverything);

  }




// function findCity(event) {
//   event.preventDefault();
// let currentCity = document.querySelector("#currentPosition")
// currentCity.addEventListener("click", getCurrentPosition);

// }





// function handlePosition(position) {
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
// }

// navigator.geolocation.getCurrentPosition(handlePosition)

//axios.get(apiURL).then(showTemperature);



// //як викликати функцію для кожного міста атрибута

// weather.lisbon.tempFer = convertCelsiumToFarangeit(weather.lisbon.temp); // Math.round(weather.lisbon.temp * 9/5 + 32);
// weather.paris.tempFer = convertCelsiumToFarangeit(weather.paris.temp);
// weather.tokyo.tempFer = convertCelsiumToFarangeit(weather.tokyo.temp);
// weather["san francisco"].tempFer = convertCelsiumToFarangeit(weather["san francisco"].temp);
// weather.oslo.tempFer = convertCelsiumToFarangeit(weather.oslo.temp);
// // Object.defineProperty(weather.oslo, 'tempFer', {
// //   value: temp * 9/5 + 32,
// // });
// //console.log(weather);
// //weather.як міста назвати одним словом.tempFer = Math.round(temp * 9/5 + 32)

// let city = prompt("Enter a city");
// city = city.toLowerCase();
// city = city.trim();

// if (weather[city] !== undefined) {
//   alert(`It is currently ${Math.round(weather[city].temp)}°C (${weather[city].tempFer}°F) in ${city} with a humidity of ${weather[city].humidity}%`)
// }else{
//   if (weather[city] === null) {
//     prompt("Enter a city");
//   } else {
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)
//   }
// }



// // (city = null) {
// //   let city = prompt("Enter a city");
// // } else {
// //   if (city = weather[city]) {
// //     alert(`It is currently ${Math.round(weather[city].temp)}°C (${weather[city].tempFer}°F) in ${city} with a humidity of ${weather.paris.humidity}%`)
// //      } else{
// // alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`)
// //             }

// // if (city == weather[input] ) {
// //   // якщо такий обєкт є, то витягти властивості обєкта
// //     alert(`It is currently ${Math.round(temp)}°C (${66}°F) in Paris with a humidity of ${humidity}%`)
// //      };
// // }
// //} else {
// //якщо міста в списку немає то вивести текст
// //   alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${sydney}`)
  




//   // if (city == weather[input] ) {
//   //   // якщо такий обєкт є, то витягти властивості обєкта
//   //     alert(`It is currently ${Math.round(temp)}°C (${66}°F) in Paris with a humidity of ${humidity}%`)
//   //      };
//       // }
//     //} else {
//         //якщо міста в списку немає то вивести текст
//      //   alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${sydney}`)
    
      
