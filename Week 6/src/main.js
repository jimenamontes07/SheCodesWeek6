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
  console.log(searchCity);
  searchCity.addEventListener("click", changeCity);

  let celciusbtn = document.querySelector("#celciusbtn");
  let farenheitbtn = document.querySelector("#farenheitbtn");
  let locationbtn = document.querySelector("#currentLocation");

  celciusbtn.addEventListener("click", toCelcius);
  farenheitbtn.addEventListener("click", toFarenheit);
  locationbtn.addEventListener("click",getCurrentPosition );
  console.log(locationbtn);

  return;
};

function getWeekTemps() {
    let tempWeek = document.querySelectorAll(".weeklyDayWeather")
    for (i in tempWeek){
        let tempWeekhtml = tempWeek.innerHTML;
        console.log(tempWeek);
    }
   
    //tempWeek.innerHTML = Math.round((tempWeekhtml*9)/5+32);
    // tempWeekhtml = Number(tempWeekhtml);
    //console.log(tempWeekhtml);
}

function toFarenheit(event ) {
    event.preventDefault();
  if (celcius === true) {
    let currentTemp = document.querySelector("#mainTemp");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    celcius = false;
    currentTemp.innerHTML = Math.round((temp*9)/5+32);
    return celcius;
  }
  
}


function toCelcius(event) {
    event.preventDefault();
  if (celcius === false) {
    let currentTemp = document.querySelector("#mainTemp");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    let tempCelcuis = Math.round((temp-32)*5/9);
    celcius = true;
    currentTemp.innerHTML = tempCelcuis;
    return celcius;
  }
}
function changeCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#cityInput").value;

  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(getCountry) ;
  axios.get(weatherApiUrl).then(getTemp);
  axios.get(weatherApiUrl).then(getHum);

}

function getTemp(response){
  let temp = response.data.main.temp;
  temp = Math.round(temp);
  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = temp;
}
function getCountry (response){
  let currentcity = document.querySelector("#CurrentCity");
  let cityEntered = document.querySelector("#cityInput").value;
  let country = response.data.sys.country;
  let newCity = `${cityEntered}, ${country}`;
  console.log(newCity);
  currentcity.innerHTML = newCity;

}
function showPosition(position){
  console.log("gotlatlong")
  console.log(position);
  let long = osition.choods.long;
  let lat = position.choods.latitude;
  changeCityByLoc(lat,long);
  
}


function getCurrentPosition (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  console.log(0)

}


function changeCityByLoc(lat, long){

  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(getTemp);
  axio.get(weatherApiUrl).then(getCityName);
 

}

function getCityName(){
  let currentcity = document.querySelector("#CurrentCity");
  let country = response.data.sys.country;
  let newCity = `${document.data.name}, ${country}`;
  console.log(newCity);
  currentcity.innerHTML = newCity;
}

function getHum(response){
  let hum = response.data.main.humidity;
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

  console.log(date);
  date.innerHTML = `${day}, ${time}`;
}
