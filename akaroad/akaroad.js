// DOM consts
const building = document.querySelector('.building');
const jibsVision = Array.from(document.querySelectorAll('.jibs-vision'));
const jibsHead = Array.from(document.querySelectorAll('.jibs-head-container'));
const pillar = Array.from(document.querySelectorAll('.pillar'));
const jibsStudent = Array.from(document.querySelectorAll('.jibs-student'));
const jibsBody = Array.from(document.querySelectorAll('.jibs-body'));

// get hitboxes
const buildingPosition = building.getBoundingClientRect();

// make arrays from the queryselectorall elements
 
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

// used to get the school of the player
const playerSchool = JSON.parse(localStorage.character);

if (!localStorage.akaRoadCompleted) {
    localStorage.akaRoadCompleted = 'false';
}

// change the 'enemy to JTH students instead of JIBS should the player be a JIBS student'
function whichEnemies() {
    
    if (playerSchool.school === 'JIBS') {
        for (let index in jibsBody) {
            
            jibsBody[index].setAttribute('src','/glyphs/akaroad/jthbody.png');
        }
        enemySchool = 'JTH';
    }
}

// on launch
whichEnemies();

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
        window.location.href = '/intersection/intersection.html';
    }
    if (characterPosition.top < 0 - characterPosition.height/2) {
        localStorage.akaRoadCompleted = 'true';
        window.location.href = '/aka/aka.html';
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

