// DOM consts
const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const characterOnScreen = document.getElementById('character');
const middlePathway = document.getElementById('middlePathway');
const verticalPathway1 = document.getElementById('verticalPathway1');
const verticalPathway2 = document.getElementById('verticalPathway2');
const horizontalPathway1 = document.getElementById('horizontalPathway1');
const horizontalPathway2 = document.getElementById('horizontalPathway2');

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let armsAnimationState = false;
let topPosition = 38;
let leftPosition = 80;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();
const verticalPathwayPosition = verticalPathway1.getBoundingClientRect();
const horizontalPathwayPosition = horizontalPathway1.getBoundingClientRect();
const railingWidth = horizontalPathwayPosition.height/5;

// align the pathways so they stay connected regardless of screen size
function alignPaths() {
    const middlePathwayPosition = middlePathway.getBoundingClientRect();

    verticalPathway1.style.bottom = middlePathwayPosition.bottom + 'px';
    verticalPathway2.style.top = middlePathwayPosition.bottom + 'px';

    horizontalPathway1.style.right = middlePathwayPosition.right + 'px';
    horizontalPathway2.style.left = middlePathwayPosition.right + 'px';
}

// align the signs to be close to the pathway regardless of screen size
function alignSigns() {
    const akaSign = document.getElementById('akaSign');
    const schoolSign = document.getElementById('schoolSign');
    const bridgeSign = document.getElementById('bridgeSign');
    const homeSign = document.getElementById('homeSign');

    akaSign.style.top = window.innerHeight/2 - horizontalPathwayPosition.height - 30 + 'px';
    schoolSign.style.bottom = window.innerHeight/2 - horizontalPathwayPosition.height + 30 + 'px';
    bridgeSign.style.left = window.innerWidth/2 + verticalPathwayPosition.width/2 - 15 + 'px';
    homeSign.style.right = window.innerWidth/2 + verticalPathwayPosition.width/2 - 15 + 'px';
}

function generateSavedCharacter() {
    characterOnScreen.style.position = 'absolute';
    updateCharacterPosition();

    hair.style.backgroundColor = characterInfo.hairColor;
    rightArm.style.backgroundColor = characterInfo.shirtColor;
    leftArm.style.backgroundColor = characterInfo.shirtColor;
    torso.style.backgroundColor = characterInfo.shirtColor;
    rightLeg.style.backgroundColor = characterInfo.ovveColor;
    leftLeg.style.backgroundColor = characterInfo.ovveColor;
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

// check if the character can move up
function canMoveUp() {
    if (characterPosition.bottom > horizontalPathwayPosition.top + railingWidth) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move down 
function canMoveDown() {
    if (characterPosition.bottom < horizontalPathwayPosition.bottom - railingWidth) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move left
function canMoveLeft() {
    if (characterPosition.left > verticalPathwayPosition.left + railingWidth/2) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move right
function canMoveRight() {
    if (characterPosition.right < verticalPathwayPosition.right - railingWidth/2) {
        return true;
    }
    else {
        return false;
    }
}

function moveUp() {
    if (canMoveUp() || (canMoveLeft() && canMoveRight())) {
        topPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveDown() {
    if (canMoveDown() || (canMoveLeft() && canMoveRight())) {
    topPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveLeft() {   
    if (canMoveLeft() || (canMoveUp() && canMoveDown())) {
    leftPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveRight() {
    if (canMoveRight() || (canMoveUp() && canMoveDown())) {
    leftPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}

function checkForScreenChange() {
    // top: characterposition.top + characterposition.height/2
    if (characterPosition.top + characterPosition.height/2 < 0) {
        window.location.href = 'bridge.html';
    }
    // bottom: characterposition.bottom - characterposition.height/2
    if (characterPosition.bottom - characterPosition.height/2 > window.innerHeight) {
        alert('halla')
    }
    // left: characterposition.left + characterposition.width/2
    if (characterPosition.left + characterPosition.width/2 < 0) {
        alert('halla')
    }
    // right: characterposition.right - characterposition.width/2
    if (characterPosition.right - characterPosition.width/2 > window.innerWidth) {
        alert('halla')
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
})

document.addEventListener('keydown', (e) => {
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
})

// on launch
generateSavedCharacter();
alignPaths();
alignSigns();

// since the position of the other paths are placed in relation to the middlepath, it is important that it has loaded properly
function reloadOnZeroWidth() {
    if (middlePathway.getBoundingClientRect().height === 0) {
        location.reload();
    }
}
reloadOnZeroWidth();