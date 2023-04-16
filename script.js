const backdrop = document.getElementById('backdrop');

const hair = document.getElementById('hair');
const rightEye = document.getElementById('rightEye');
const pupilAxisRight = document.getElementById('pupilAxisRight');
const leftEye = document.getElementById('leftEye');
const pupilAxisLeft = document.getElementById('pupilAxisLeft');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');

const characterInfo = JSON.parse(localStorage.character);

function generateSavedCharacter() {
    character.style.position = 'absolute';

    hair.style.backgroundColor = characterInfo.hairColor;
    rightArm.style.backgroundColor = characterInfo.shirtColor;
    leftArm.style.backgroundColor = characterInfo.shirtColor;
    torso.style.backgroundColor = characterInfo.shirtColor;
    rightLeg.style.backgroundColor = characterInfo.ovveColor;
    leftLeg.style.backgroundColor = characterInfo.ovveColor;
}

generateSavedCharacter();

console.log(characterInfo.hairColor);

let armsAnimationState = false;

let topPosition = 0;
let leftPosition = 0;

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
    character.style.top = topPosition + 'vh';
    character.style.left = leftPosition + 'vw';
}

function moveUp() {
    if (topPosition !== 0) {
        topPosition -= 1;
    }
    updateCharacterPosition();
}
function moveDown() {
    topPosition += 1;
    updateCharacterPosition();
}

function moveRight() {
    leftPosition += 1;
    updateCharacterPosition();
}
function moveLeft() {
    if (leftPosition !== 0) {
        leftPosition -= 1;
    }
    updateCharacterPosition();
}

document.addEventListener('keydown', () => {
    if (event.key === 'ArrowUp' || event.key === 'w') {
        moveUp();
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        moveDown();
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRight();
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveLeft();
    }
    animateArms();
})
