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
// let humidity = document.querySelector("#humidityToday");
// let windSpeed = document.querySelector("#windSpeedToday");
// let cityName = document.querySelector("#city");
// let cityInput = document.querySelector("#inputCity");


function main() {
  let celsiusTemperature = null;  
  search(Kyiv);
  let currentTime = new Date();
  let dateElement = document.querySelector("#current-date");
  let searchForm = document.querySelector("#search-form");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius-link");
  let currentCity = document.querySelector("#currentPosition")
  let namedCityElement = document.querySelector("#namedCity");

  dateElement.innerHTML = formatTime(currentTime);
  searchForm.addEventListener("submit", search);
  fahrenheitLink.addEventListener("click", convertToFahrenheit)
  celsiusLink.addEventListener("click", convertToCelsius);
  currentCity.addEventListener("click", getCurrentPosition);
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
  let temperatureElement = document.querySelector("#temperature");
  let celsiusLink=document.querySelector("#celsius-link");
  let fahrenheitLink=document.querySelector("#fahrenheit-link");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsiusTemperature *9) / 5 + 32 );
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusLink=document.querySelector("#celsius-link");
  let fahrenheitLink=document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(event) {
event.preventDefault();
let cityName = document.querySelector("#city");
let cityInput = document.querySelector("#inputCity");
cityName.innerHTML = cityInput.value;

  function showTemperatureWindSpeedHumidity (response){
  let temperatureElement = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidityToday");
  let windSpeed = document.querySelector("#windSpeedToday");
  let iconElement =  document.querySelector("#icon")

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  
iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
  }

let apiURL = `${webAdress}q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
axios.get(apiURL).then(showTemperatureWindSpeedHumidity);
}

function showPosition (position) {
  function showTemperatureWindSpeedHumidityCity (response){
    let temperatureElement = document.querySelector("#temperature");
    let humidity = document.querySelector("#humidityToday");
    let windSpeed = document.querySelector("#windSpeedToday");
    let cityName = document.querySelector("#city");
    let iconElement =  document.querySelector("#icon")

    celsiusTemperature = Math.round(response.data.main.temp);

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.name;

    iconElement.setAttribute(
      "src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    }

let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiURLGeoloc = `${webAdress}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
axios.get(apiURLGeoloc).then(showTemperatureWindSpeedHumidityCity);
  }


function displayForecastForNamedCity(event) {
  event.preventDefault();
  let city = event.target.dataset.value;

  function showEverything (response){
    console.log(response);

  let temperatureElement = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidityToday");
  let windSpeed = document.querySelector("#windSpeedToday");
  let descriptionElement = document.querySelector("#description");
  let cityName = document.querySelector("#city");
  let iconElement =  document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiURL = `${webAdress}q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiURL).then(showEverything);

  }

  // function displayForecast(response){
    
    // let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class = "forecastForFiveDays">`;
    // forecast.forEach(function(forecastDay, index){
    //     if (index<6) {
        forecastHTML = forecastHTML + `
        <div class = "row">
        <div class="col">
          
                    <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="icon"
                    width="42">
                    <span class="weather-forecast-date">Thu</span>
                    <span class="weather-forecast-temperature-max">18°</span>
                    <span class="weather-forecast-temperature-min">12°</span>
        </div>
        </div>`;
                        // <div class="weather-forecast-date">
                        // ${formatDay(forecastDay.dt)}</div>

                        // <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
                        // <div class="weather-forecast-temperature">
                        //     <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                        //     <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                        //     </div>
                        //  </div>
                        //  `;
    //     }
    // });      
    forecastHTML = forecastHTML + `
    <div class = "row">
    <div class="col">
          
                    <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="icon"
                    width="42">
                    <span class="weather-forecast-date">Thu</span>
                    <span class="weather-forecast-temperature-max">18°</span>
                    <span class="weather-forecast-temperature-min">12°</span>
      </div>
      </div>`;
forecastHTML = forecastHTML + `</div>`;
console.log(forecastHTML);
// forecastElement.innerHTML  = forecastHTML;// }


// function getForecast (coordinates){




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