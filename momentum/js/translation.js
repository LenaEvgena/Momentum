import * as weather from './weather.js';
import * as quotes from './quotes.js';
import * as greeting from './script.js';
import * as settings from './settings.js';

let languageInputs = document.querySelectorAll('.language');

languageInputs.forEach(input => {
  input.addEventListener('change', () => {
    weather.setCity();
    weather.checkLangWeather();
    quotes.getQuotes();
    greeting.setBgGreeting();
    greeting.showCurrentDate();
    settings.checkLangSettings();
  })
})
