// every screen in the game uses this js

// the clock
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
// the pausebutton
const pauseButton = document.getElementById('pauseButton');
const pauseIcon = document.getElementById('pauseIcon');
const restartGame = document.querySelector('.restart-game');
// tasks + task tooltips
const alcoholTaskIcon = document.getElementById('alcoholTaskIcon');
const kebabTaskIcon = document.getElementById('kebabTaskIcon');
const ovveTaskIcon = document.getElementById('ovveTaskIcon');
const prepartyTaskIcon = document.getElementById('prepartyTaskIcon');
const alcoholTooltip = document.querySelector('.tt-alcohol');
const kebabTooltip = document.querySelector('.tt-kebab');
const ovveTooltip = document.querySelector('.tt-ovve');
const prepartyTooltip = document.querySelector('.tt-preparty');

let gameIsPaused = false;
let currentHour;
let currentMinute;
let timeInterval;

timeInterval = setInterval(addTime,4000);

if (!localStorage.currentHour || !localStorage.currentMinute) {
    currentHour = 21;
    currentMinute = 0;
} else {
    currentHour = JSON.parse(localStorage.currentHour);
    currentMinute = JSON.parse(localStorage.currentMinute);
}

if (!localStorage.alcoholTaskCompleted) {
    localStorage.alcoholTaskCompleted = 'false'
}
if (!localStorage.kebabTaskCompleted) {
    localStorage.kebabTaskCompleted = 'false'
}
if (!localStorage.ovveTaskCompleted) {
    localStorage.ovveTaskCompleted = 'false'
}
if (!localStorage.prepartyTaskCompleted) {
    localStorage.prepartyTaskCompleted = 'false'
}

function upgradeTaskColors() {
    if (localStorage.alcoholTaskCompleted === 'true') {
        alcoholTaskIcon.style.backgroundColor = 'green';
    }
    if (localStorage.kebabTaskCompleted === 'true') {
        kebabTaskIcon.style.backgroundColor = 'green';
    }
    if (localStorage.ovveTaskCompleted === 'true') {
        ovveTaskIcon.style.backgroundColor = 'green';
    }
    if (localStorage.prepartyTaskCompleted === 'true') {
        prepartyTaskIcon.style.backgroundColor = 'green';
    }
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

function pauseGame() {
    pauseIcon.setAttribute('class','fa-solid fa-play');
    clearInterval(timeInterval);
    restartGame.style.display = 'block';
    gameIsPaused = true;
}
function unpauseGame() {
    pauseIcon.setAttribute('class','fa-solid fa-pause');
    timeInterval = setInterval(addTime,4000);
    restartGame.style.display = 'none';
    gameIsPaused = false;
}

pauseButton.addEventListener('click', ()=> {
    if (!gameIsPaused) {
        pauseGame();
    } else {
        unpauseGame();
    }    
})

function restart() {
    window.location.href = 'school.html';
    localStorage.currentHour = 21;
    localStorage.currentMinute = 0;
    localStorage.alcoholTaskCompleted = 'false';
    localStorage.kebabTaskCompleted = 'false';
    localStorage.ovveTaskCompleted = 'false';
    localStorage.prepartyTaskCompleted = 'false';
    localStorage.bridgeCompleted = 'false';
}

restartGame.addEventListener('click', () => {
    restart();
})

// display task tooltips on hover 
alcoholTaskIcon.addEventListener('mouseenter', () => {
    alcoholTooltip.style.display = 'block';
    alcoholTaskIcon.style.border = '0.5vmin solid white';
});
alcoholTaskIcon.addEventListener('mouseleave', () => {
    alcoholTooltip.style.display = 'none';
    alcoholTaskIcon.style.border = '0.5vmin solid gray';
});
kebabTaskIcon.addEventListener('mouseenter', () => {
    kebabTooltip.style.display = 'block';
    kebabTaskIcon.style.border = '0.5vmin solid white';
});
kebabTaskIcon.addEventListener('mouseleave', () => {
    kebabTooltip.style.display = 'none';
    kebabTaskIcon.style.border = '0.5vmin solid gray';
});
ovveTaskIcon.addEventListener('mouseenter', () => {
    ovveTooltip.style.display = 'block';
    ovveTaskIcon.style.border = '0.5vmin solid white';
});
ovveTaskIcon.addEventListener('mouseleave', () => {
    ovveTooltip.style.display = 'none';
    ovveTaskIcon.style.border = '0.5vmin solid gray';
});
prepartyTaskIcon.addEventListener('mouseenter', () => {
    prepartyTooltip.style.display = 'block';
    prepartyTaskIcon.style.border = '0.5vmin solid white';
});
prepartyTaskIcon.addEventListener('mouseleave', () => {
    prepartyTooltip.style.display = 'none';
    prepartyTaskIcon.style.border = '0.5vmin solid gray';
});

updateTimeDisplay();
upgradeTaskColors();