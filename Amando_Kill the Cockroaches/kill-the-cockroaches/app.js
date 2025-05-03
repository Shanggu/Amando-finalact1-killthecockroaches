let score = 0;
let timeLeft = 90;
let timer;
let gameInterval;

const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const killsEl = document.getElementById('kills');
const gameScreen = document.getElementById('game-screen');
const soundToggle = document.getElementById('sound-toggle');

startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.parentElement.style.display = 'none';
  score = 0;
  timeLeft = 90;
  updateHUD();
  timer = setInterval(updateTimer, 1000);
  gameInterval = setInterval(spawnCockroach, 800);
}

function updateHUD() {
  killsEl.textContent = `${score} kills`;
  timerEl.textContent = `${timeLeft} sec`;
}

function updateTimer() {
  timeLeft--;
  updateHUD();
  if (timeLeft <= 0) {
    clearInterval(timer);
    clearInterval(gameInterval);
    alert(`Time's up! You killed ${score} cockroaches!`);
    location.reload();
  }
}

function spawnCockroach() {
  const roach = document.createElement('div');
  roach.classList.add('cockroach');
  roach.style.top = `${Math.random() * 90}%`;
  roach.style.left = `${Math.random() * 90}%`;
  roach.addEventListener('click', () => {
    roach.remove();
    score++;
    updateHUD();
  });
  gameScreen.appendChild(roach);

  setTimeout(() => {
    if (roach.parentElement) roach.remove();
  }, 2000);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registered'));
  }

  const splatSound = new Audio('splat.mp3');
  let soundEnabled = true;

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  });
  
  splatSound.play = (function(play) {
    return function() {
      if (soundEnabled) play.call(this);
    };
  })(splatSound.play);  

  const bgMusic = new Audio('bg-music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // Adjust volume as needed

  document.getElementById('start-btn').addEventListener('click', () => {
    bgMusic.play();
    startGame();
  });

  let musicEnabled = true;

document.getElementById('sound-toggle').addEventListener('click', () => {
  musicEnabled = !musicEnabled;
  document.getElementById('sound-toggle').textContent = musicEnabled ? '🔊' : '🔇';
  
  if (musicEnabled) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
});

  