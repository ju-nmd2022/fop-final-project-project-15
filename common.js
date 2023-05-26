// every screen in the game uses this js

// popup class, YES I know classes should be put in a separate file but i can't get modules to work
const popupLocation = document.querySelector('.screen-container');

class Popup {
    constructor(description, removeText,link) {
        this.description = description;
        this.removeText = removeText;
        this.link = link;
    }
    createPopup() {
        pauseGame();
        const newPopupShade = document.createElement('div');
        newPopupShade.classList.add('popup-shade');
        const newPopup = document.createElement('div');
        newPopup.classList.add('popup'); 
        const newPopupText = document.createElement('p');
        newPopupText.innerText = this.description;
        const newPopupRemover = document.createElement('p');
        newPopupRemover.classList.add('remove-popup');
        newPopupRemover.innerText = this.removeText;
        
        newPopupRemover.addEventListener('click', () => {
            newPopupShade.style.display = 'none';
            newPopup.style.display = 'none';
            unpauseGame();
            if (this.description !== 'Dang it! I won/t get in for free at this time!') {
                removePopupHandler();
            } else {
                window.location.href = '/index.html';
            }
        })
        
        newPopup.appendChild(newPopupText);
        newPopup.appendChild(newPopupRemover);
        if (this.link !== '') {
            const newPopupLink = document.createElement('a');
            newPopupLink.setAttribute('href',this.link);
            const newPopupLinkText = document.createElement('p');
            newPopupLinkText.innerText = `Back to ${this.link}`
            newPopupLink.appendChild(newPopupLinkText);
            newPopup.appendChild(newPopupLink);
        }
        popupLocation.appendChild(newPopupShade);
        popupLocation.appendChild(newPopup);
    }
}
// end of popup class


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

timeInterval = setInterval(addTime,6500);

currentHour = JSON.parse(localStorage.currentHour);
currentMinute = JSON.parse(localStorage.currentMinute);

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

function testForFail() {
    if (currentHour === 22) {
        const losePopup = new Popup('Dang it! I won/t get in for free at this time!','Try Again','');
        losePopup.createPopup();
    }
}

function addTime() {
    currentMinute += 1;
    if (currentMinute === 60) {
        currentMinute = 0;
        currentHour += 1;
    }
    testForFail();
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
    timeInterval = setInterval(addTime,6500);
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