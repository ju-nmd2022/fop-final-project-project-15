import Character from "./character.js";

const backdrop = document.getElementById('backdrop');
const pathway1 = document.getElementById('pathway1');
const pathway2 = document.getElementById('pathway2');

const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');

const characterInfo = JSON.parse(localStorage.character);
const characterOnScreen = document.getElementById('character');
const character = new Character(characterInfo.name,characterInfo.hairColor,characterInfo.shirtColor,characterInfo.ovveColor);

let armsAnimationState = false;

let topPosition = 38;
let leftPosition = 80;
let sprintMultiplier = 1;

const pathway1Position = pathway1.getBoundingClientRect();
const pathway2Position = pathway2.getBoundingClientRect();
let characterPosition = characterOnScreen.getBoundingClientRect();

function generateSavedCharacter() {
    characterOnScreen.style.position = 'absolute';
    updateCharacterPosition();

    hair.style.backgroundColor = character.hairColor;
    rightArm.style.backgroundColor = character.shirtColor;
    leftArm.style.backgroundColor = character.shirtColor;
    torso.style.backgroundColor = character.shirtColor;
    rightLeg.style.backgroundColor = character.ovveColor;
    leftLeg.style.backgroundColor = character.ovveColor;
}

generateSavedCharacter();

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
function moveUp() {
    if (characterPosition.top > pathway1Position.top-90 || (characterPosition.left > pathway2Position.left -10 && characterPosition.right < pathway2Position.right+10)) { //only move up if the character remains on the path
        topPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveDown() {
    if (characterPosition.bottom < pathway1Position.bottom - 5 || (characterPosition.left > pathway2Position.left -10 && characterPosition.right < pathway2Position.right+10)) {
        topPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}

function moveRight() {
    if (characterPosition.right < pathway2Position.right+7.9 || (characterPosition.bottom < pathway1Position.bottom - 5 && characterPosition.top > pathway1Position.top-90)) {
        leftPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveLeft() {
    if (characterPosition.left > pathway2Position.left -11 || (characterPosition.bottom < pathway1Position.bottom - 5 && characterPosition.top > pathway1Position.top-90)) {
        leftPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        sprintMultiplier = 2;
    }
})
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
    if (e.key === 'Shift') {
        console.log('hej')
    }
    animateArms();
    // p1 position top - 90

    if (characterPosition.bottom > pathway1Position.bottom - 5) {

    }
    console.log(characterPosition.top);
    console.log(pathway1Position.height);
})
