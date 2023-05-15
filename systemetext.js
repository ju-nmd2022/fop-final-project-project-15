// DOM consts
// get character assets
const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const characterOnScreen = document.getElementById('character'); 

// get hitbox items
const systemetDoor = document.querySelector('.systemet-door');
const systemetBuilding = document.querySelector('.systemet-building');
const systemetImage = document.querySelector('.systemet-image');

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

// use for determining what state the arms animation is in
let armsAnimationState = false;
// place the player based on these values
let topPosition = 58;
let leftPosition = 80;
// used for applying sprint
let sprintMultiplier = 1;
// continusly get the position of the character
let characterPosition = characterOnScreen.getBoundingClientRect();
// get the position of the door and building
const doorPosition = systemetDoor.getBoundingClientRect();
const buildingPosition = systemetBuilding.getBoundingClientRect();

// import the character settings
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

// animate the arms
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

// update the characters position
function updateCharacterPosition() {
    characterOnScreen.style.top = topPosition + 'vh';
    characterOnScreen.style.left = leftPosition + 'vw';
    characterPosition = characterOnScreen.getBoundingClientRect();
}

// check if the character can move up
function canMoveUp() {
    if (characterPosition.bottom > buildingPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}

// move the character up if possible
function moveUp() {
    if (canMoveUp()) {
        topPosition -= 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}
// move the character down
function moveDown() {
    topPosition += 1 * sprintMultiplier;
    updateCharacterPosition();
}
// move the character left
function moveLeft() {   
    leftPosition -= 1 * sprintMultiplier;
    updateCharacterPosition();
}
// move the character right
function moveRight() {
    leftPosition += 1 * sprintMultiplier;
    updateCharacterPosition();
}

function checkForScreenChange() {
    // top: characterposition.top + characterposition.height/2
    console.log(doorPosition.right);
    console.log(characterPosition.right);
    if (characterPosition.top + characterPosition.height/3 < buildingPosition.bottom && characterPosition.left + characterPosition.width/3 > doorPosition.left && characterPosition.left + characterPosition.width/3 < doorPosition.right) {
        window.location.href = 'systemetint.html';
    }
    // left: characterposition.left + characterposition.width/2
    if (characterPosition.left + characterPosition.width/2 < 0) {
        alert('halla')
        // go to alcamo
    }
    // right: characterposition.right - characterposition.width/2
    if (characterPosition.right - characterPosition.width/2 > window.innerWidth) {
        window.location.href = 'bridge.html';
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

