// every document that uses the standard character should use this document

const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const rightOvveLeg = document.getElementById('rightOvveLeg');
const leftOvveLeg = document.getElementById('leftOvveLeg');
const ovve = document.querySelector('.ovve');
const legs = document.querySelector('.legs');
const characterOnScreen = document.getElementById('character'); 

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let armsAnimationState = false;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();

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
    rightOvveLeg.style.backgroundColor = characterInfo.ovveColor;
    leftOvveLeg.style.backgroundColor = characterInfo.ovveColor;
    isOvveOn();
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

generateSavedCharacter();