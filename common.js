// every screen in the game uses this js

// the clock
const currentTimeDisplay = document.getElementById('currentTimeDisplay');

let currentHour;
let currentMinute;

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

setInterval(addTime,800);

updateTimeDisplay();