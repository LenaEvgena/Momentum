import { playList } from './playList.js';

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const audioList = document.querySelector('.play-list');
const soundButton = document.querySelector('.sound_i');
const audioRange = document.querySelector('.range1');
const soundRange = document.querySelector('.range2');
const audioCurrent = document.querySelector('.audio_current-time');
const audioDuration = document.querySelector('.audio_duration');
const audioTrack = document.querySelector('.audio-track');
const audio = new Audio();

let isPlaying = false;
let playNum = 0;

createAudioList(playList);
const miniButtons = Array.from(document.querySelectorAll('.mini_icon'));
const audioTracks = Array.from(document.querySelectorAll('.play-item'));

//аудиоконтроллеры
const ranges = Array.from(document.querySelectorAll('.range'));
ranges.forEach(range => {
  range.addEventListener('input', function() {
    const value = this.value || 0;
    this.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  })
});

function createAudioList(arr) {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = arr[i].title;
    let but = document.createElement('button');
    let span = document.createElement('span');
    but.classList.add('mini_button');
    span.id = i;
    span.classList.add(`mini_icon${i}`);
    span.classList.add(`mini_icon`);
    but.append(span);
    li.append(but);
    audioList.append(li);
  }
}

function toggleAudio() {
  if (!isPlaying) {
    audio.src = playList[playNum].src;
    audio.play();
    audio.currentTime = localStorage.getItem('currentTime');
    play.classList.toggle('pause');
    miniButtons.forEach(item => {
      item.classList.remove('active');
    });
    audioTracks.forEach(track => {
      track.classList.remove('item-active');
    });
    document.querySelector(`.mini_icon${playNum}`).classList.add('active');
    audioTracks[playNum].classList.toggle('item-active');
    isPlaying = true;
  } else {
    audio.pause();
    play.classList.toggle('pause');
    miniButtons.forEach(item => {
      item.classList.remove('active');
    });
    audioTracks.forEach(track => {
      track.classList.remove('item-active');
    });
    document.querySelector(`.mini_icon${playNum}`).classList.remove('active');
    audioTracks[playNum].classList.toggle('item-active');
    isPlaying = false;
  }
}

function playPrevAudio() {
  isPlaying = false;
  play.classList.add('pause');
  document.querySelector(`.mini_icon${playNum}`).classList.remove('active');

  if (playNum === 0) {
    playNum = playList.length;
  }
  playNum--;
  play.classList.toggle('pause');
  document.querySelector(`.mini_icon${playNum}`).classList.toggle('active');

  toggleAudio();
  audio.currentTime = 0;
}

function playNextAudio() {
  isPlaying = false;
  play.classList.add('pause');
  document.querySelector(`.mini_icon${playNum}`).classList.remove('active');

  if (playNum === playList.length - 1) {
    playNum = -1;
  }
  playNum++;
  play.classList.toggle('pause');
  document.querySelector(`.mini_icon${playNum}`).classList.toggle('active');

  toggleAudio();
  audio.currentTime = 0;
}

function toggleIcons(e) {
  if (!isPlaying) {
    audio.src = playList[e.target.id].src;
    audio.play();
    audio.currentTime = 0;
    play.classList.toggle('pause');
    miniButtons.forEach(item => {
      item.classList.remove('active');
    });
    audioTracks.forEach(track => {
      track.classList.remove('item-active');
    });
    document.getElementById(`${e.target.id}`).classList.add('active');
    audioTracks[e.target.id].classList.toggle('item-active');
    isPlaying = true;
  } else {
    audio.pause();
    play.classList.toggle('pause');
    miniButtons.forEach(item => {
      item.classList.remove('active');
    });
    audioTracks.forEach(track => {
      track.classList.remove('item-active');
    });
    document.getElementById(`${e.target.id}`).classList.remove('active');
    audioTracks[e.target.id].classList.toggle('item-active');
    isPlaying = false;
  }
}


function toggleVolume() {
  if (audio.volume !== 0) {
    localStorage.setItem('volume', audio.volume);
    audio.volume = 0;
    soundRange.value = 0;
    soundRange.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${soundRange.value}%, #c4c4c4 ${soundRange.value}%, #c4c4c4 100%)`;
    soundButton.classList.add('active');
  } else {
    audio.volume = localStorage.getItem('volume');
    soundRange.value = localStorage.getItem('volume') * 100;
    soundRange.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${soundRange.value}%, #c4c4c4 ${soundRange.value}%, #c4c4c4 100%)`;
    soundButton.classList.remove('active');
  }
}

function rangeVolume() {
  let volumeRangeValue = soundRange.value;
  if (volumeRangeValue <= 0) {
    soundButton.classList.add('active');
  } else {
    soundButton.classList.remove('active');
  }
  audio.volume = volumeRangeValue / 100;
  localStorage.setItem('volume', audio.volume);

  if (localStorage.volume) {
    volumeRangeValue = localStorage.getItem('volume') * 100;
  }
  localStorage.setItem('volume', (volumeRangeValue / 100));
}


function rangeDuration() {
  let durationRangeValue = audioRange.value;

  if (durationRangeValue <= 0 || durationRangeValue >= 100) {
    play.classList.remove('pause');
    audio.pause();
    audio.currentTime = 0;
  } else {
    audio.play();
    play.classList.add('pause');
  }

  audio.currentTime = (durationRangeValue * audio.duration / 100).toFixed(2);
  localStorage.setItem('currentTime', audio.currentTime);

  if (localStorage.currentTime) {
    durationRangeValue = localStorage.getItem('currentTime') * 100 / audio.duration;
  }
  localStorage.setItem('currentTime', (durationRangeValue * audio.duration / 100));
  audioRange.style.background = `linear-gradient(to right, #C5B358 ${durationRangeValue}%, #C5B358 ${durationRangeValue}%, #c4c4c4 0%, #c4c4c4 100%)`
}

function audioRanging() {
  let durationRangeValue = audio.currentTime * 100 / audio.duration || 0;
  audioRange.value = durationRangeValue;
  localStorage.setItem('currentTime', audio.currentTime);
  audioRange.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${durationRangeValue}%, #c4c4c4 ${durationRangeValue}%, #c4c4c4 100%)`;
  if (durationRangeValue >= 100) {
  }
  showAudioInfo();
}

function showAudioInfo() {
  audioCurrent.textContent = '0'+ getTimeCodeFromNum(audio.currentTime) || '0:00';
  audioDuration.textContent = playList[playNum].duration;
  audioTrack.textContent = playList[playNum].title;
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

//Listeners
play.addEventListener('click', toggleAudio);
playPrev.addEventListener('click', playPrevAudio);
playNext.addEventListener('click', playNextAudio);
audio.addEventListener('ended', () => {
  if (audio.currentTime >= audio.duration) {
    playNextAudio();
    console.log('New audio track!');
  }
})
soundButton.addEventListener('click', toggleVolume);
soundRange.addEventListener('input', rangeVolume);

audioRange.addEventListener('input', rangeDuration);
audio.addEventListener('timeupdate', audioRanging);
window.onload = () => {
  localStorage.setItem('currentTime', 0);
}
miniButtons.forEach(miniButton => {
  miniButton.addEventListener('click', (e) => {
    toggleIcons(e);
    playNum = e.target.id;
    showAudioInfo(e);
  });
});
