// DOM consts
const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const ovve = document.querySelector('.ovve');
const playerOvve = document.getElementById('playerOvve');
const legs = document.querySelector('.legs');
const characterOnScreen = document.getElementById('character');
const bag = document.querySelector('.bag');

const building = document.querySelector('.building');
const jibsVision = Array.from(document.querySelectorAll('.jibs-vision'));
const jibsHead = Array.from(document.querySelectorAll('.jibs-head-container'));
const pillar = Array.from(document.querySelectorAll('.pillar'));
const jibsStudent = Array.from(document.querySelectorAll('.jibs-student'));
const jibsBody = Array.from(document.querySelectorAll('.jibs-body'));

// get hitboxes
const buildingPosition = building.getBoundingClientRect();

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let armsAnimationState = false;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();

let bagAnimationActive = false;
let bagRotation = 0;
let bagRotationDirection = false;
 
// starting position
let topPosition = 80;
let leftPosition = 80;

let visionInterval;
let gameActive = false;
let replayPopupDisplayed = false;

let enemySchool = 'JIBS';

// used for rotating the jibs people
let jibsRotaion;
let rotationState;

if (!localStorage.akaRoadCompleted) {
    localStorage.akaRoadCompleted = 'false';
}

// change the enemy to JTH students instead of JIBS should the player be a JIBS student
function whichEnemies() {
    
    if (characterInfo.school === 'JIBS') {
        for (let index in jibsBody) {
            
            jibsBody[index].setAttribute('src','/glyphs/akaroad/jthbody.png');
        }
        enemySchool = 'JTH';
    }
}

function checkForEquippedPatches() {
    // current patches: winner patch, speedfreak patch, westcoast patch, hitech patch, lok patch, halsosektionen patch, jsa patch, qult patch
    const equippedPatches = JSON.parse(localStorage.equippedPatches);
    const winnerPatch = document.querySelector('.winner-patch');
    const speedfreakPatch = document.querySelector('.speedfreak-patch');
    const westcoastPatch = document.querySelector('.westcoast-patch');
    const hitechPatch = document.querySelector('.hitech-patch');
    const lokPatch = document.querySelector('.lok-patch');
    const halsosektionenPatch = document.querySelector('.halsosektionen-patch');
    const jsaPatch = document.querySelector('.jsa-patch');
    const qultPatch = document.querySelector('.qult-patch');
    for (let index in equippedPatches) {
        switch (equippedPatches[index]) {
            case 'winnerPatch':
                winnerPatch.style.display = 'block';
                break;
            case 'speedfreakPatch':
                speedfreakPatch.style.display = 'block';
                break;
            case 'westcoastPatch':
                westcoastPatch.style.display = 'block';
                break;
            case 'hitechPatch':
                hitechPatch.style.display = 'block';
                break;
            case 'lokPatch':
                lokPatch.style.display = 'block';
                break;
            case 'halsosektionenPatch':
                halsosektionenPatch.style.display = 'block';
                break;
            case 'jsaPatch':
                jsaPatch.style.display = 'block';
                break;
            case 'qultPatch':
                qultPatch.style.display = 'block';
                break;
        } 
    }
}

function animateArms() {
    if (armsAnimationState === false) {
        document.getElementById('rightArm').style.transform = 'rotate(20deg)'
        document.getElementById('leftArm').style.transform = 'rotate(-20deg)'
        armsAnimationState = true;
    }
    else {
        document.getElementById('rightArm').style.transform = 'rotate(0deg)'
        document.getElementById('leftArm').style.transform = 'rotate(0deg)'
        armsAnimationState = false;
    }
}

function updateCharacterPosition() {
    characterOnScreen.style.top = topPosition + 'vh';
    characterOnScreen.style.left = leftPosition + 'vw';
    characterPosition = characterOnScreen.getBoundingClientRect();
}

function isOvveOn() {
    if (localStorage.ovveTaskCompleted === 'true') {
        legs.style.display = 'none';
        ovve.style.display = 'flex';
    } else {
        legs.style.display = 'flex';
        ovve.style.display = 'none';
    }
}

function generateSavedCharacter() {
    characterOnScreen.style.position = 'absolute';
    updateCharacterPosition();

    hair.style.backgroundColor = characterInfo.hairColor;
    rightArm.style.backgroundColor = characterInfo.shirtColor;
    leftArm.style.backgroundColor = characterInfo.shirtColor;
    torso.style.backgroundColor = characterInfo.shirtColor;
    rightLeg.style.backgroundColor = characterInfo.pantsColor;
    leftLeg.style.backgroundColor = characterInfo.pantsColor;
    playerOvve.setAttribute('src',`/glyphs/ovve/${characterInfo.ovveColor}`);

    isOvveOn();
}

function bagAnimation() {
    if (!bagAnimationActive) {
        let numbersOfRotations = 0;
        bagAnimationActive = true;
        let bagInterval = setInterval(() => {
            if (bagRotationDirection) {
                bagRotation += 10;
                if (bagRotation > 0 && numbersOfRotations === 2) {
                    clearInterval(bagInterval);
                    bagAnimationActive = false;
                }
            } else {
                bagRotation -= 10;
                if (bagRotation < 0 && numbersOfRotations === 2) {
                    clearInterval(bagInterval);
                    bagAnimationActive = false;
                }
            }
            if (bagRotation > 45) {
                if (numbersOfRotations < 2) {
                    numbersOfRotations++;
                    bagRotationDirection = false;
                }
            }
            if (bagRotation < -45) {
                if (numbersOfRotations < 2) {
                    numbersOfRotations++;
                    bagRotationDirection = true;
                }
                
            }
            
            bag.style.transform = `rotate(${bagRotation}deg)`;
        }, 50);
    }
}


function moveUp() {
    if (canMoveUp()) {
        bagAnimation();
        topPosition -= 1 * sprintMultiplier;
    }
}
function moveDown() {
    if (canMoveDown()) {
        bagAnimation();
    topPosition += 1 * sprintMultiplier;
    }
}
function moveLeft() {   
    if (canMoveLeft()) {
        bagAnimation();
    leftPosition -= 1 * sprintMultiplier;
    }
}
function moveRight() {
    if (canMoveRight()) {
        bagAnimation();
    leftPosition += 1 * sprintMultiplier;
    }
}

// raise the sprintMultiplier on shift press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        sprintMultiplier = 2;
    }
})
// revert the sprintMultiplier to starting value on shift release
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        sprintMultiplier = 1;
    }
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'ArrowDown' || e.key === 's' || e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') {
        bagRot = setInterval(bagAnimation(), 100);
        setTimeout(() => {
            clearInterval(bagRot);
        }, 2000);
    }
})

document.addEventListener('keydown', (e) => {
    if (!gameIsPaused) {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        moveUp();
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        moveDown();
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    }
    animateArms();
    checkForScreenChange();
    updateCharacterPosition();
    }
})

function displayFirstPopup() {
    const firstPopup = new Popup(`Oh no, ${enemySchool} students! Better not let them see me`,'click to start','')
    firstPopup.createPopup();
}

function displayReplayPopup() {
    if (!replayPopupDisplayed) {
        const replayPopup = new Popup('Darn it!','try again','')
        replayPopup.createPopup();
        replayPopupDisplayed = true;
    }
}

function removePopupHandler() {
    topPosition = 80;
    leftPosition = 80;
    jibsRotaion = -30;
    rotationState = true;
    updateCharacterPosition();
    visionInterval = setInterval(rotateVision,45);
    gameActive = true;
    replayPopupDisplayed = false;
}

function canMoveUp() {
    if (characterPosition.top > buildingPosition.bottom - characterPosition.height/2 || characterPosition.left < buildingPosition.left - characterPosition.width) {
        return true;
    }
}
function canMoveDown() {
    if (characterPosition.bottom < window.innerHeight) {
        return true;
    }
}
function canMoveLeft() {
    for (let index in pillar) {
        const pillarLocation = pillar[index].getBoundingClientRect();
        if (characterPosition.left > pillarLocation.right) {
            return true;
        }
    }
}
function canMoveRight() {
    return true;
}

function checkForScreenChange() {
    if ((characterPosition.right > window.innerWidth + characterPosition.width) || characterPosition.bottom > window.innerHeight + characterPosition.height/2) {
        window.location.href = '/area1.html';
    }
    if (characterPosition.top < 0 - characterPosition.height/2) {
        localStorage.akaRoadCompleted = 'true';
        window.location.href = '/area3.html';
    }
}

function failGame() {
    clearInterval(visionInterval);
    displayReplayPopup();
    gameActive = false;
}

function detectPillar(index) {
    const jibsVisionLocation = jibsVision[index].getBoundingClientRect();
    const pillarLocation = pillar[index].getBoundingClientRect();
    if (jibsVisionLocation.top > pillarLocation.top - (pillarLocation.height - pillarLocation.height/3)  && jibsVisionLocation.bottom < pillarLocation.bottom + (pillarLocation.height - pillarLocation.height/3) || jibsVisionLocation.bottom > pillarLocation.top + (pillarLocation.height - pillarLocation.height/3) && jibsVisionLocation.top < pillarLocation.bottom - (pillarLocation.height - pillarLocation.height/3)) {
        jibsVision[index].style.borderRightWidth = pillarLocation.left - jibsVisionLocation.left + 'px';
    } else {
        jibsVision[index].style.borderRightWidth = '42vw';
    }
}

function detectJibsSpotting(index) {
    const jibsVisionLocation = jibsVision[index].getBoundingClientRect();
    if (characterPosition.right < jibsVisionLocation.right && jibsVisionLocation.top < characterPosition.top && jibsVisionLocation.bottom > characterPosition.bottom) {
        failGame();
    }
}

if (localStorage.akaRoadCompleted === 'false') {
function rotateVision() {
    if (!gameActive) {return;}
    if (rotationState) {
        jibsRotaion += 1;
        if (jibsRotaion === 20) {
            rotationState = false;
        }
    } else {
        jibsRotaion -= 1;
        if (jibsRotaion === -20) {
            rotationState = true;
        }
    }
    for (let index in jibsVision) {
        jibsHead[index].style.transform = `rotate(${jibsRotaion}deg)`
        detectPillar(index);
        detectJibsSpotting(index);
    }
};
displayFirstPopup();
} else {
    for (let index in jibsStudent) {
        jibsStudent[index].style.display = 'none';
        jibsBody[index].style.display = 'none';
    }
}


// on launch
whichEnemies();
generateSavedCharacter();
checkForEquippedPatches();