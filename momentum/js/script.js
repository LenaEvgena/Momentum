import * as settings from './settings.js'

const time = document.querySelector('.time');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.userName');
const prevArrow = document.querySelector('.slide-prev');
const nextArrow = document.querySelector('.slide-next');
let randomNumber;
let greetTranslate = {
  'greeting': {
    'morning': {
      'ru': 'Доброе утро,',
      'en': 'Good morning,'
    },
    'afternoon': {
      'ru': 'Добрый день,',
      'en': 'Good afternoon,'
    },
    'evening': {
      'ru': 'Добрый вечер,',
      'en': 'Good evening,'
    },
    'night': {
      'ru': 'Доброй ночи,',
      'en': 'Good night,'
    }
  },
  'date': {
    'ru': 'ru-RU',
    'en': 'en-US'
  }
};
let lang = settings.state.lang;


// Show Time and Date
function showCurrentTime() {
  // let today = new Date(2020, 10, 24, 00, 33, 30);
  let today = new Date();
  let currentTime = today.toLocaleTimeString();
  time.textContent = currentTime;

  showCurrentDate();
  setBgGreeting();
  setTimeout(showCurrentTime, 1000);
};

export function showCurrentDate() {
  const today = new Date();
  const options = {month: 'long', day: 'numeric', weekday: 'long',};
  const currentDate = today.toLocaleDateString(`${greetTranslate.date[lang]}`, options);
  day.textContent = currentDate;
}

//Show greeting
export function setBgGreeting() {
  lang = settings.state.lang;
  let dayTime = getTimeOfDay();
  let greetingString = `${greetTranslate.greeting[dayTime][lang]}`;
  greeting.textContent = greetingString;
};

function getTimeOfDay() {
  let today = new Date();
  let hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon';
  } else if (hour >= 18 && hour < 24) {
    return 'evening';
  } else {
    return 'night';
  }
}

//Check Name
function checkName() {
  if (!userName.value || (userName.value.trim().length == 0)) {
    userName.value = getLocalStorage();
  } else {
    setLocalStorage();
    userName.value = getLocalStorage();
  }
};

function setLocalStorage() {
  localStorage.setItem('userName', userName.value.trim());
}

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName');
  }
  return userName.value;
}

//Change background image
function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1);
}

function setBgImage() {
  let dayTime = getTimeOfDay();
  let bgNumber = randomNumber.toString().padStart(2, 0);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${bgNumber}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${bgNumber}.jpg')`;
  };
}

async function setBgImageUnsplash() {
  let dayTime = getTimeOfDay();
  let tag = settings.state.tag || dayTime;
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=TZHJYXn0_S7Kq30f2AyvZSo4P4lkckQ-AGx_3CB5bLk`;
  const res = await fetch(url);
  const data = await res.json();

  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
  };
}

async function setBgImageFlickr() {
  let dayTime = getTimeOfDay();
  let bgNum =  Math.floor(Math.random() * 90);
  let tag = settings.state.tag || dayTime;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b8fffd18a513d83c41529b8a49b5ea4&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();

  const img = new Image();
  img.src = data.photos.photo[bgNum].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.photos.photo[bgNum].url_l}')`;
  };
}

function chooseBbImages() {
  if (settings.state.photoSource === 'git') {
    setBgImage();
  }
  if (settings.state.photoSource === 'unsplash') {
    setBgImageUnsplash();
  }
  if (settings.state.photoSource === 'flickr') {
    setBgImageFlickr();
  }
}

function getNextSlide() {
  if (randomNumber === 20) {
    randomNumber = 0;
  }
  randomNumber++;
  chooseBbImages();
}

function getPrevSlide() {
  if (randomNumber === 1) {
    randomNumber = 21;
  }
  randomNumber--;
  chooseBbImages();
}




//Run
showCurrentTime();
setBgGreeting();
checkName();
getRandomNumber();
chooseBbImages();

//Listeners
window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
userName.addEventListener('change', () => {
  checkName();
  userName.blur();
});
userName.addEventListener('blur', checkName);
userName.addEventListener('focus', () => {
  userName.value = '';
});
prevArrow.addEventListener('click', getPrevSlide);
nextArrow.addEventListener('click', getNextSlide);
settings.overlay.addEventListener('click', chooseBbImages);


//https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=TZHJYXn0_S7Kq30f2AyvZSo4P4lkckQ-AGx_3CB5bLk
//https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b8fffd18a513d83c41529b8a49b5ea4&tags=nature&extras=url_l&format=json&nojsoncallback=1
