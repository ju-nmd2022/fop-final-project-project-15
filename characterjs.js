// every document that uses the standard character should use this document

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

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let armsAnimationState = false;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();

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

let bagRotation = 0;
let rotationOngoing = false;
let bagRotationState = true;

let bagRot;

function bagAnimation() {
    if (bagRotationState) {
        bagRotation -= 6;
        if (bagRotation <= -30) {
            bagRotationState = false;
        }
    } else {
        bagRotation += 6;
        if (bagRotation >= 30) {
            bagRotationState = true;
        }
    }
    bag.style.transform = `rotate(${bagRotation}deg)`
};

function moveUp() {
    if (canMoveUp()) {
        bagRotationState = false;
        bagAnimation();
        topPosition -= 1 * sprintMultiplier;
    }
}
function moveDown() {
    if (canMoveDown()) {
        bagRotationState = true;
        bagAnimation();
    topPosition += 1 * sprintMultiplier;
    }
}
function moveLeft() {   
    if (canMoveLeft()) {
        bagRotationState = false;
        bagAnimation();
    leftPosition -= 1 * sprintMultiplier;
    }
}
function moveRight() {
    if (canMoveRight()) {
        bagRotationState = true;
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
    // animateArms();
    checkForScreenChange();
    updateCharacterPosition();
    }
})

generateSavedCharacter();
checkForEquippedPatches();