import * as settings from './settings.js'

const menuIcon = document.querySelector('.settings_icon');
const menu = document.querySelector('.settings__menu');
export const overlay = document.querySelector('.overlay');

const audioBlock = document.querySelector('.player');
const weatherBlock = document.querySelector('.weather');
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.day');
const greetingBlock = document.querySelector('.greeting-container');
const quoteBlock = document.querySelector('.quote-container');
const quoteBut = document.querySelector('.change-quote');

const languages = Array.from(document.querySelectorAll('.language'));
const images = Array.from(document.querySelectorAll('.images'));
const blocks = Array.from(document.querySelectorAll('.blocks'));
const hashTag = document.querySelector('.hashTag');

const setSet = document.querySelector('.set_set');
const setLang = document.querySelector('.set_lang');
const setImg = document.querySelector('.set_img');
const setShow = document.querySelector('.set_show');
const ruType = document.querySelector('.russian');
const enType = document.querySelector('.english');
const audioBl = document.querySelector('.audio-bl');
const dateBl = document.querySelector('.date-bl');
const greetingBl = document.querySelector('.greeting-bl');
const timeBl = document.querySelector('.time-bl');
const quoteBl = document.querySelector('.quote-bl');
const weatherBl = document.querySelector('.weather-bl');
const userName = document.querySelector('.userName');

export const state = {
  'lang': 'en',
  'photoSource': 'git',
  'tag': 'false',
  'blocks': {
    'audio': 'audio',
    'date': 'date',
    'greeting': 'greeting',
    'quote': 'quote',
    'time': 'time',
    'weather': 'weather'
  },
};

if (localStorage.getItem('state')) {
  parseState();
}
localStorage.setItem('state', JSON.stringify(state));

let settingsTranslate = {
  'settings': {
    'ru': 'Настройки',
    'en': 'Settings'
  },
  'languages': {
    'ru': 'Язык приложения',
    'en': 'Languages',
    'type': {
      'ru': {
        'ru': 'Русский',
        'en': 'Russian',
      },
      'en': {
        'ru': 'Английский',
        'en': 'English',
      }
    }
  },
  'images': {
    'ru': 'Изображения',
    'en': 'Images'
  },
  'show': {
    'ru': 'Отображать',
    'en': 'Show'
  },
  'blocks': {
    'audio': {
      'ru': 'Аудиоплеер',
      'en': 'Audio'
    },
    'date': {
      'ru': 'Дата',
      'en': 'Date'
    },
    'greeting': {
      'ru': 'Приветствие',
      'en': 'Greeting'
    },
    'time': {
      'ru': 'Время',
      'en': 'Time'
    },
    'quote': {
      'ru': 'Цитата',
      'en': 'Quote'
    },
    'weather': {
      'ru': 'Погода',
      'en': 'Weather'
    }
  },
  'placeholder': {
    'ru': '[Введите ваше имя]',
    'en': '[Enter your name]'
  },
};

export function checkLangSettings() {
  let lang = state.lang;
  setSet.textContent = `${settingsTranslate.settings[lang]}`;
  setLang.textContent = `${settingsTranslate.languages[lang]}`;
  setImg.textContent = `${settingsTranslate.images[lang]}`;
  setShow.textContent = `${settingsTranslate.show[lang]}`;

  ruType.textContent = `${settingsTranslate.languages.type.ru[lang]}`;
  enType.textContent = `${settingsTranslate.languages.type.en[lang]}`;
  userName.placeholder = `${settingsTranslate.placeholder[lang]}`;

  audioBl.textContent = `${settingsTranslate.blocks.audio[lang]}`;
  dateBl.textContent = `${settingsTranslate.blocks.date[lang]}`;
  greetingBl.textContent = `${settingsTranslate.blocks.greeting[lang]}`;
  timeBl.textContent = `${settingsTranslate.blocks.time[lang]}`;
  quoteBl.textContent = `${settingsTranslate.blocks.quote[lang]}`;
  weatherBl.textContent = `${settingsTranslate.blocks.weather[lang]}`;
}

function toggleSettings() {
  menu.classList.toggle('open');
  overlay.classList.toggle('active');
}

function removeActiveClasses() {
  menu.classList.remove('open');
  overlay.classList.remove('active');
}

overlay.addEventListener('click', (EO) => {
  EO = EO || window.event;
  EO.preventDefault();
  const isClickInside = menu.contains(EO.target);
  if (isClickInside) {
    return;
  } else {
    removeActiveClasses();
  }
});

function checkState() {
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].checked) {
      state.lang = languages[i].value;
    }
  }
  for (let i = 0; i < images.length; i++) {
    if (images[i].checked) {
      state.photoSource = images[i].value;
      if (images[i].value === 'unsplash' || images[i].value === 'flickr') {
        hashTag.removeAttribute('disabled', 'disabled');
        state.tag = hashTag.value.trim();
      } else {
        hashTag.setAttribute('disabled', 'disabled');
        hashTag.value = '';
        state.tag = false;
      }
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].checked) {
      state.blocks[blocks[i].value] = blocks[i].value;
    } else {
      state.blocks[blocks[i].value] = false;
    }
  }
  localStorage.setItem('state', JSON.stringify(state));
}

function parseState() {
  let data = JSON.parse(localStorage.getItem('state'));
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].value === data.lang) {
      languages[i].setAttribute('checked', 'checked');
    }
  }
  for (let i = 0; i < images.length; i++) {
    if (images[i].value === data.photoSource) {
      images[i].setAttribute('checked', 'checked');
      if (images[i].value === 'unsplash' || images[i].value === 'flickr') {
        hashTag.removeAttribute('disabled', 'disabled');
        hashTag.value = data.tag.trim();
      } else {
        hashTag.setAttribute('disabled', 'disabled');
        hashTag.value = '';
      }
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].value ===  data.blocks[blocks[i].value]) {
      blocks[i].setAttribute('checked', 'checked');
      toggleActiveClasses(blocks[i]);
    } else {
      blocks[i].removeAttribute('checked', 'checked');
      toggleActiveClasses(blocks[i]);
    }
  }
  checkState();
  return state;
}

export function getState() {
  parseState();
  return state;
}

function toggleActiveClasses(item) {
  let id = item.getAttribute('id');
  switch (id) {
    case 'time':
      if (item.checked) {
        timeBlock.classList.remove('hidden');
      } else {
        timeBlock.classList.add('hidden');
      }
      break;
    case 'date':
      if (item.checked) {
        dateBlock.classList.remove('hidden');
      } else {
        dateBlock.classList.add('hidden');
      }
      break;
    case 'greeting':
      if (item.checked) {
        greetingBlock.classList.remove('hidden');
      } else {
        greetingBlock.classList.add('hidden');
      }
      break;
    case 'quote':
      if (item.checked) {
        quoteBlock.classList.remove('hidden');
        quoteBut.classList.remove('hidden');
      } else {
        quoteBlock.classList.add('hidden');
        quoteBut.classList.add('hidden');
      }
      break;
    case 'audio':
      if (item.checked) {
        audioBlock.classList.remove('hidden');
      } else {
        audioBlock.classList.add('hidden');
      }
      break;
    case 'weather':
      if (item.checked) {
        weatherBlock.classList.remove('hidden');
      } else {
        weatherBlock.classList.add('hidden');
      }
      break;
    }
}

getState(); //обновляем hash
checkLangSettings();

menuIcon.addEventListener('click', toggleSettings);
menu.addEventListener('click', checkState);
overlay.addEventListener('click', checkState);
window.addEventListener('load', () => {
  if (localStorage.getItem('state')) {
    parseState();
  }
});
window.addEventListener('beforeunload', checkState);

blocks.forEach(block => {
  block.addEventListener('change', () => {
    toggleActiveClasses(block);
  });
})


