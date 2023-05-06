let celcius = true;

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
window.onload = function () {
  loadDate();
  let searchCity = document.querySelector("#search");

  searchCity.addEventListener("click", changeCity);

  let celciusbtn = document.querySelector("#celciusbtn");
  let farenheitbtn = document.querySelector("#farenheitbtn");
  let locationbtn = document.querySelector("#currentLocation");

  celciusbtn.addEventListener("click", toCelcius);
  farenheitbtn.addEventListener("click", toFarenheit);
  locationbtn.addEventListener("click",getLocation );
 
  //getCurrentPosition();
  getLocation() ;


  return;
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // success
      function(location) {
        console.log("GPS coordinates retrieved");
        showPosition(position);
      }, 
      // failure
      function(error) {
        alert("GPS not supported by browser")
      },
      {
        timeout: 5000 // ms
      }
    )
  } else {
    alert("GPS not supported by browser")
  }
}


function toFarenheit(event ) {
    event.preventDefault();

  if (celcius === true) {
    
    let currentTemp = document.querySelector("#mainTemp");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    
    currentTemp.innerHTML = Math.round((temp*9)/5+32);

    let weektemps = document.querySelectorAll(".weeklyDayWeather");
    weektemps.forEach(farenheit);

    celcius = false;
    return celcius;
  }
  
}
function farenheit(item){
  let daytemp = item.innerHTML;
  daytemp = Number(daytemp);
  let newTemp = Math.round((daytemp*9)/5+32);
  item.innerHTML = newTemp;
}


function toCelcius(event) {
    event.preventDefault();
  if (celcius === false) {
    
    let currentTemp = document.querySelector("#mainTemp");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    let tempCelcuis = Math.round((temp-32)*5/9);
    
    currentTemp.innerHTML = tempCelcuis;

    let weektemps = document.querySelectorAll(".weeklyDayWeather");
    weektemps.forEach(celciusfunc);

    celcius = true;
    return celcius;
  }

}
function celciusfunc(item){
  let daytemp = item.innerHTML;
  daytemp = Number(daytemp)
  let newTemp = Math.round((daytemp-32)*5/9);
  item.innerHTML = newTemp;
}


function changeCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#cityInput").value;

  let apiKey = "4da2e8bf3a200c5adda75dotf32bef74";
  weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityEntered}&key=${apiKey}`;

  
  axios.get(weatherApiUrl).then(getCountry) ;
  axios.get(weatherApiUrl).then(getTemp);
  axios.get(weatherApiUrl).then(getHum);
  axios.get(weatherApiUrl).then(getForecast);
  axios.get(weatherApiUrl).then(getIcon);
  

}

function getForecast(response){
  //event.preventDefault();
  lat = response.data.coordinates.latitude;
  long = response.data.coordinates.longitude;

  let apiKey = "4da2e8bf3a200c5adda75dotf32bef74";
  weatherApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${lat}&key=${apiKey}`;
  axios.get(weatherApiUrl).then(changeForecast);
}

function changeForecast(response){
  //event.preventDefault();


  for(var i = 1; i < 6; i++){
    getTemp(i);
  }

  function getTemp(i){
    
    let dayMin = document.querySelector(`#minTemp${i}`);
    let dayMax = document.querySelector(`#maxTemp${i}`);

    let icon = document.querySelector(`#day${i}Icon`);

    let newMax = response.data.daily[i-1].temperature.maximum;
    let newMin = response.data.daily[i-1].temperature.minimum;

    let newIcon = response.data.daily[i-1].condition.icon_url;

    dayMax.innerHTML = Math.round(newMax);
    dayMin.innerHTML =  Math.round(newMin);
  
    icon.setAttribute("src", newIcon);
    
  }
  

}

function getTemp(response){
  //event.preventDefault();
  let temp = response.data.temperature.current;
  temp = Math.round(temp);
  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = temp;
}

function getCountry (response){
  //event.preventDefault();
  let currentcity = document.querySelector("#CurrentCity");
  let cityEntered = document.querySelector("#cityInput").value;
  let country = response.data.country;
  let newCity = `${cityEntered}, ${country}`;
  currentcity.innerHTML = newCity;

}
function showPosition(position){
  console.log("gotlatlong")
  console.log(position);
  let long = position.coords.long;
  let lat = position.coords.latitude;
  changeCityByLoc(lat,long);
  
}




function changeCityByLoc(lat, long){
  let apiKey = "4da2e8bf3a200c5adda75dotf32bef74";
  weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;

  axios.get(weatherApiUrl).then(getTemp);
  axios.get(weatherApiUrl).then(getCityName);
  axios.get(weatherApiUrl).then(getIcon);
  axios.get(weatherApiUrl).then(getForecast);
 

}

function getIcon(response){
  let icon = document.querySelector("#mainWeather")
  let newIcon = response.data.condition.icon_url;
  icon.setAttribute("src", newIcon);
}


function getCityName(){
  let currentcity = document.querySelector("#CurrentCity");
  let country = response.data.country;
  let newCity = `${document.city}, ${country}`;
  currentcity.innerHTML = newCity;
}

function getHum(response){
  let hum = response.data.temperature.humidity;
  hum = Math.round(hum);
  let mainHum = document.querySelector(".mainHumidity");
  mainHum.innerHTML = hum;
}


function loadDate() {
  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let time = `${hours}:${min}`;

  let date = document.getElementById("date");

  date.innerHTML = `${day}, ${time}`;
}
