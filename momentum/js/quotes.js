import * as settings from './settings.js';

const quoteButton = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

export async function getQuotes() {
  let lang = settings.state.lang;
  let quotesPath = '';
  if (lang === 'ru') {
    quotesPath = 'data_ru.json';
  }
  if (lang === 'en'){
    quotesPath = 'data_en.json';
  }

  const quotes = quotesPath;
  const res = await fetch(quotes);
  const data = await res.json();
  const randomIndex = Math.floor(Math.random() * 60 - 1 + 1) + 1;

  quote.textContent = `${data[randomIndex].quote}`;
  author.textContent = `${data[randomIndex].author}`;
}

getQuotes();

quoteButton.addEventListener('click', () => {
  getQuotes();
  quoteButton.style.transform = 'rotate(180deg)';
  setTimeout(() => {
    quoteButton.style.transform = 'rotate(0)';
  }, 400);
});
