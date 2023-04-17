const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');

const characterInfo = JSON.parse(localStorage.character);
const characterOnScreen = document.getElementById('character');

let armsAnimationState = false;

let topPosition = 38;
let leftPosition = 80;
let sprintMultiplier = 1;

let characterPosition = characterOnScreen.getBoundingClientRect();

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
    if (characterPosition.bottom > window.innerHeight/2-115 || (characterPosition.left > window.innerWidth/2-135 && characterPosition.right < window.innerWidth/2+135)) { //make return function of this
        topPosition -= 1 * sprintMultiplier;
    }
    
    updateCharacterPosition();
}
function moveDown() {
    if (characterPosition.bottom < window.innerHeight/2+115 || (characterPosition.left > window.innerWidth/2-135 && characterPosition.right < window.innerWidth/2+135)) {
    topPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}

function moveRight() {   
    if (characterPosition.left < window.innerWidth/2 || (characterPosition.bottom > window.innerHeight/2-115 && characterPosition.bottom < window.innerHeight/2+125)) {
    leftPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
function moveLeft() {
    if (characterPosition.left > window.innerWidth/2-115 || (characterPosition.bottom > window.innerHeight/2-115 && characterPosition.bottom < window.innerHeight/2+125)) {
    leftPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}

function checkForScreenChange() {
    // top: characterposition.top + characterposition.height/2
    if (characterPosition.top + characterPosition.height/2 < 0) {
        alert('hej')
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
    checkForScreenChange();
    // p1 position top - 90
})
