// every screen in the game uses this js

// the clock
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
// the pausebutton
const pauseButton = document.getElementById('pauseButton');
const pauseIcon = document.getElementById('pauseIcon');
const restartGame = document.querySelector('.restart-game');

let gameIsPaused = false;
let currentHour;
let currentMinute;
let timeInterval;

timeInterval = setInterval(addTime,800);

if (!localStorage.currentHour || !localStorage.currentMinute) {
    currentHour = 19;
    currentMinute = 0;
} else {
    currentHour = JSON.parse(localStorage.currentHour);
    currentMinute = JSON.parse(localStorage.currentMinute);
}

function updateTimeDisplay() {
    if (currentMinute < 10) {
        currentTimeDisplay.innerText = `${currentHour}:0${currentMinute}`;
    } else {
        currentTimeDisplay.innerText = `${currentHour}:${currentMinute}`;
    }
    
}

function addTime() {
    currentMinute += 1;
    if (currentMinute === 60) {
        currentMinute = 0;
        currentHour += 1;
    }
    localStorage.currentHour = JSON.stringify(currentHour);
    localStorage.currentMinute = JSON.stringify(currentMinute);
    updateTimeDisplay();
}

pauseButton.addEventListener('click', ()=> {
    if (!gameIsPaused) {
        pauseIcon.setAttribute('class','fa-solid fa-play');
        clearInterval(timeInterval);
        restartGame.style.display = 'block';
        gameIsPaused = true;
    } else {
        pauseIcon.setAttribute('class','fa-solid fa-pause');
        timeInterval = setInterval(addTime,800);
        restartGame.style.display = 'none';
        gameIsPaused = false;
    }    
})

restartGame.addEventListener('click', () => {
    window.location.href = 'school.html';
    localStorage.currentHour = 19;
    localStorage.currentMinute = 0;
})

updateTimeDisplay();