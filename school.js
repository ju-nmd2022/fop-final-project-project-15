// DOM consts
const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const characterOnScreen = document.getElementById('character');

const school = document.querySelector('.jthbuilding');
const fountain = document.querySelector('.fountain');

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let armsAnimationState = false;
let topPosition = 38;
let leftPosition = 80;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();

const schoolPosition = school.getBoundingClientRect();
const fountainPosition = fountain.getBoundingClientRect();

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
    if (characterPosition.bottom > schoolPosition.top) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move down 
function canMoveDown() {
    if (characterPosition.bottom < schoolPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move left
function canMoveLeft() {
    if (characterPosition.bottom < schoolPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move right
function canMoveRight() {
    if (characterPosition.bottom < schoolPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}

function moveUp() {
    if (canMoveUp() ) {
        topPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveDown() {
    if (canMoveDown() ) {
    topPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveLeft() {   
    if (canMoveLeft() ) {
    leftPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveRight() {
    if (canMoveRight()) {
    leftPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
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
    // checkForScreenChange();
})

generateSavedCharacter();