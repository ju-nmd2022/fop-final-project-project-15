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
const failCountText = document.getElementById('failCountText');

const bridgeLeftPosition = bridge.getBoundingClientRect().left;
const bridgeWidth = bridge.getBoundingClientRect().width;
const laneWidth = bridgeWidth/6;
const lanes = [0,laneWidth,laneWidth*2,laneWidth*3,laneWidth*4,laneWidth*5];

if (!localStorage.bridgeCompleted) {
    localStorage.bridgeCompleted = 'false';
}

const savedCharacter = JSON.parse(localStorage.character);
let carPositions = [];
let currentLane = 3;
let currentBottomPosition = 25;
let failCount = 0;

let carsDriving;
let carsSpawning;
let playerWalking; 

let gameActive = false;

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
// align the pillars to be next to the bridge regardless of screen size
function alignBridgePillars() {
    const bridgePosition = bridge.getBoundingClientRect();

    bridgePillarLeft.style.right = bridgePosition.right + 'px';
    bridgePillarRight.style.left = bridgePosition.right + 'px';
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
function checkForScreenChange() {
    const characterPosition = character.getBoundingClientRect();
    // top: characterposition.top + characterposition.height/2
    if (characterPosition.top + characterPosition.height/2 < 0) {
        window.location.href = 'systemetext.html';
        console.log('hej');
    }
    // bottom: characterposition.bottom - characterposition.height/2
    if (characterPosition.bottom - characterPosition.height/2 > window.innerHeight) {
        window.location.href = 'intersection.html';
        console.log('hej');
    }
}

if (localStorage.bridgeCompleted === 'false') {
function updateFailCountText() {
    failCountText.innerText = 'Fails: ' + failCount;
}
// remove all cars currently on screen
function removeCars() {
    const allCars = Array.from(cars);
    allCars.forEach(car => {
        car.remove();
    });
    carPositions = [];
}
removePopup.addEventListener('click', () => {
    const popupShade = document.getElementById('popupShade');

    removeCars();
    currentBottomPosition = 5;
    currentLane = 3;
    updateLanePosition();
    carsDriving = setInterval(moveCarsForward,3);
    carsSpawning = setInterval(spawnCarsRegularly,500);
    playerWalking = setInterval(movePlayerForward,50);
    popup.style.display = 'none';
    popupShade.style.display = 'none';
    gameActive = true;
})
function displayReplayPopup() {
    const popupText = document.getElementById('popupText');
    
    popupText.innerText = 'Darn it!';
    removePopup.innerText = 'Click to try again';
    popup.style.display = 'block';
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

// spawn three cars every half second unless the player is at the top
function spawnCarsRegularly() {
    if (character.getBoundingClientRect().top < 400 === false) {
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
    failCount += 1;
    updateFailCountText();
    clearInterval(carsDriving);
    clearInterval(carsSpawning);
    clearInterval(playerWalking);
    gameActive = false;
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
    if (character.getBoundingClientRect().top < 400 === false) {
        currentBottomPosition += 1;
    }
    else {
        currentBottomPosition += 2;
        localStorage.bridgeCompleted = 'true';
    }
    character.style.bottom = currentBottomPosition + 'px';
}
// make the cars move forward every 50ms
function moveCarsForward() {
    for (let i = 0; i < cars.length; i++) {
        carPositions[i] += 0.35;
        cars[i].style.top = carPositions[i] + 'vh';
        detectCollision(cars[i]);
        // if (cars[i].getBoundingClientRect().top > window.innerHeight) {
        //     screenContainer.removeChild(cars[i]);
        //     carPositions.splice(i,1); 
        // }
    }
}
} else {
    popup.style.display = 'none';
    const popupShade = document.getElementById('popupShade');
    popupShade.style.display = 'none';
    failCountText.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    if (gameActive || localStorage.bridgeCompleted === 'true') {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            moveToRightLane();
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            moveToLeftLane();
        }
    }
    if (localStorage.bridgeCompleted === 'true') {
        if (e.key === 'ArrowUp' || e.key === 'w') {
            currentBottomPosition += 10;
            character.style.bottom = currentBottomPosition + 'px';
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
            currentBottomPosition -= 10;
            character.style.bottom = currentBottomPosition + 'px';
        }
        checkForScreenChange();
    }
})

// on launch
generateSavedCharacter();
resizeCharacter();
alignBridgePillars();
updateLanePosition();

// since the position of many things are placed in relation to the bridge, it is important that it has loaded properly
function reloadOnZeroWidth() {
    if (bridgeWidth === 0) {
        location.reload();
    }
}
reloadOnZeroWidth();