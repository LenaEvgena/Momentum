//https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=0e90f6cd4011848b8863399eefe8f343&units=metric
import * as settings from './settings.js';

const weatherIcon = document.querySelector('.weather-icon');
const city = document.querySelector('.city');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind-data');
const humidity = document.querySelector('.humidity-data');
let windText = document.querySelector('.wind-text');
let humidityText = document.querySelector('.humidity-text');
const weatherError = document.querySelector('.weather-error');
let lang = settings.state.lang;

export function checkLangWeather() {
  if (lang === 'ru') {
    windText.textContent = 'Скорость ветра:';
    humidityText.textContent = 'Влажность:';
    city.value = getWeatherStorage() || 'Минск';
  }
  if (lang === 'en'){
    windText.textContent = 'Wind speed:';
    humidityText.textContent = 'Humidity:';
    city.value = getWeatherStorage() || 'Minsk';
  }
}

async function getWeather() {
  lang = settings.state.lang;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=0e90f6cd4011848b8863399eefe8f343&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherError.textContent = '';
  if (!data.id) {
    weatherError.textContent = 'Incorrect data! City not found!';
    weatherError.style.color = 'red';
    temperature.textContent = '';
    windText.textContent = '';
    humidityText.textContent = '';
    weatherDescription.textContent = '';
  }
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  wind.textContent = `${data.wind.speed.toFixed(0)}m/s`;
  humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
  weatherDescription.textContent = data.weather[0].description;
}

export function setCity() {
  checkCity();
  checkLangWeather();
  getWeather();
}

//Check City
function checkCity() {
  if (!city.value || (city.value.trim().length == 0)) {
    checkLangWeather();
    city.value = getWeatherStorage() || 'Minsk';

  } else {
    setWeatherStorage();
    checkLangWeather();
    city.value = getWeatherStorage() || 'Minsk';
  }
};

function setWeatherStorage() {
  if (lang === 'ru') {
    city.value = city.value || 'Минск';
  }
  if (lang === 'en'){
    city.value = city.value || 'Minsk';
  }
  localStorage.setItem('city', city.value.trim());
}

function getWeatherStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city') || 'Minsk';
  }
  return city.value;
}


//Listeners
window.addEventListener('load', () => {
  checkLangWeather();
  city.value = getWeatherStorage() || 'Minsk';
  getWeatherStorage();
  getWeather();
});
window.addEventListener('beforeunload', setWeatherStorage);
city.addEventListener('change', () => {
  setCity();
  city.blur();
});
city.addEventListener('blur', setCity);
city.addEventListener('focus', () => {
  city.value = '';
});
