// DOM consts
const bridge = document.getElementById('bridge');
const bridgePillarLeft = document.getElementById('bridgePillarLeft');
const bridgePillarRight = document.getElementById('bridgePillarRight');
const character = document.getElementById('character');
const head = document.getElementById('head');
const body = document.getElementById('body');
const legs = document.getElementById('legs');
const popup = document.getElementById('popup');
const removePopup = document.getElementById('removePopup');
const cars = document.getElementsByClassName('car');

const bridgeLeftPosition = bridge.getBoundingClientRect().left;
const bridgeWidth = bridge.getBoundingClientRect().width;
const laneWidth = bridgeWidth/6;
const lanes = [0,laneWidth,laneWidth*2,laneWidth*3,laneWidth*4,laneWidth*5];

const savedCharacter = JSON.parse(localStorage.character);
let carPositions = [];
let currentLane = 3;
let currentBottomPosition = 5;

let carsDriving;
let carsSpawning;
let playerWalking; 

let gameFailed;

// remove all cars currently on screen
function removeCars() {
    const allCars = Array.from(cars);
    allCars.forEach(car => {
        car.remove();
    });
}

removePopup.addEventListener('click', () => {
    removeCars();
    currentBottomPosition = 5;
    currentLane = 3;
    updateLanePosition();
    carsDriving = setInterval(moveCarsForward,50);
    carsSpawning = setInterval(spawnCarsRegularly,500);
    playerWalking = setInterval(movePlayerForward,50);
    popup.style.display = 'none';
    gameFailed = false;
})

function displayReplayPopup() {
    const popupText = document.getElementById('popupText');
    
    popupText.innerText = 'Darn it!';
    removePopup.innerText = 'Click to try again';
    popup.style.display = 'block';
}

// get the saved character colors
function generateSavedCharacter() {
    head.style.backgroundColor = savedCharacter.hairColor;
    body.style.backgroundColor = savedCharacter.shirtColor;
    legs.style.backgroundColor = savedCharacter.ovveColor;
}

// make sure the character fits between the bridge lines
function resizeCharacter() {
    const characterWidth = laneWidth/3;

    head.style.width = characterWidth + 'px';
    head.style.height = characterWidth + 'px';
    body.style.width = characterWidth + 'px';
    body.style.height = characterWidth + 'px';
    legs.style.width = characterWidth + 'px';
    legs.style.height = characterWidth + 'px';
}

// make sure the cars are the right size
function resizeCars() {
    const carWidth = laneWidth-laneWidth/5;

    const allCars = Array.from(cars);
    allCars.forEach(car => {
        car.style.width = carWidth + 'px';
        car.style.marginLeft = laneWidth/5;
    });
}

// align the pillars to be next to the bridge regardless of screen size
function alignBridgePillars() {
    const bridgePosition = bridge.getBoundingClientRect();

    bridgePillarLeft.style.right = bridgePosition.right + 'px';
    bridgePillarRight.style.left = bridgePosition.right + 'px';
}

// spawn a car
// generate a color
function chooseCarColor() {
    const colorRoller = Math.floor(Math.random() * 6)

    return colorRoller;
}
// generate a lane
function chooseLane() {
    const laneRoller = Math.floor(Math.random() * lanes.length);

    return lanes[laneRoller];
}
// spawn the car
function spawnCar() {
    const screenContainer = document.getElementById('screenContainer');
    const chosenCar = chooseCarColor(); // generate a color only once
    const car = document.createElement('img');
    car.classList.add('car');
    if (chosenCar === 0) { //blue
        car.setAttribute('src','glyphs/cars/bluecar.svg')
    }
    if (chosenCar === 1) { //green
        car.setAttribute('src','glyphs/cars/greencar.svg')
    }
    if (chosenCar === 2) { //red
        car.setAttribute('src','glyphs/cars/redcar.svg')
    }
    if (chosenCar === 3) { //skyblue
        car.setAttribute('src','glyphs/cars/skybluecar.svg')
    }
    if (chosenCar === 4) { //white
        car.setAttribute('src','glyphs/cars/whitecar.svg')
    }
    if (chosenCar === 5) { //yellow
        car.setAttribute('src','glyphs/cars/yellowcar.svg')
    }
    car.style.left = bridgeLeftPosition + chooseLane() + 'px';
    screenContainer.appendChild(car);
}

// move character to desired lane 
function updateLanePosition() {
    character.style.left = bridgeLeftPosition + lanes[currentLane] + character.getBoundingClientRect().width + 'px';
}
function moveToLeftLane() {
    if (currentLane !== 0) {
        currentLane -= 1;
    }
    updateLanePosition();
}
function moveToRightLane() {
    if (currentLane !== 5) {
        currentLane += 1;
    }
    updateLanePosition();
}

// spawn three cars every half second unless the player is at the top
function spawnCarsRegularly() {
    if (character.getBoundingClientRect().top < 200 === false) {
        spawnCar();
        spawnCar();
        spawnCar();
        carPositions.push(0);
        carPositions.push(0);
        carPositions.push(0);
        resizeCars();
    }
}

function failGame() {
    clearInterval(carsDriving);
    clearInterval(carsSpawning);
    clearInterval(playerWalking);
    gameFailed = true;
    displayReplayPopup();
}


// detect a collision between the character and the car
function detectCollision(car) {
    const characterPosition = character.getBoundingClientRect();
    const carPosition = car.getBoundingClientRect();
    if (characterPosition.top < carPosition.bottom && characterPosition.left > carPosition.left && characterPosition.right < carPosition.right && characterPosition.bottom > carPosition.top) {
        failGame();
    }
}

// make the character move forward every 50ms 
function movePlayerForward() {
    if (character.getBoundingClientRect().top < 200 === false) {
        currentBottomPosition += 1;
    }
    else {
        currentBottomPosition += 2;
    }
    character.style.bottom = currentBottomPosition + 'px';
}

// make the cars move forward every 50ms
function moveCarsForward() {
    for (let i = 0; i < cars.length; i++) {
        carPositions[i] += 3.5;
        cars[i].style.top = carPositions[i] + 'vh';
        detectCollision(cars[i]);
        if (cars[i].getBoundingClientRect().top > window.innerHeight) {
        // screenContainer.removeChild(cars[i]); 
        // why doesnt this work
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (!gameFailed) {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            moveToRightLane();
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            moveToLeftLane();
        }
    }
})

// on launch
document.addEventListener('DOMContentLoaded', () => {
    generateSavedCharacter();
    resizeCharacter();
    alignBridgePillars();
    updateLanePosition();
});

