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

// copied over from the p5 document
const unitY = window.innerHeight/100;
const pathwayWidth = unitY*25; 

let armsAnimationState = false;
let topPosition = 38;
let leftPosition = 80;
let sprintMultiplier = 1;
let characterPosition = characterOnScreen.getBoundingClientRect();
const verticalPathwayPosition = verticalPathway1.getBoundingClientRect();
const horizontalPathwayPosition = horizontalPathway1.getBoundingClientRect();
const railingWidth = 35;

// align the pathways so they stay connected regardless of screen size
function alignPaths() {
    const middlePathwayPosition = middlePathway.getBoundingClientRect()

    verticalPathway1.style.bottom = middlePathwayPosition.bottom + 'px';
    verticalPathway2.style.top = middlePathwayPosition.bottom + 'px';

    horizontalPathway1.style.right = middlePathwayPosition.right + 'px';
    horizontalPathway2.style.left = middlePathwayPosition.right + 'px';
    console.log(middlePathwayPosition.top)
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
    if (characterPosition.bottom > horizontalPathwayPosition.top + railingWidth || canMoveLeft() || canMoveRight()) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move down 
function canMoveDown() {
    if (characterPosition.bottom < horizontalPathwayPosition.bottom - railingWidth || canMoveLeft() || canMoveRight()) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move left
function canMoveLeft() {
    if (characterPosition.left > verticalPathwayPosition.left + railingWidth || canMoveUp() || canMoveDown()) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move right
function canMoveRight() {
    if (characterPosition.right < verticalPathwayPosition.right - railingWidth || canMoveUp() || canMoveDown()) {
        return true;
    }
    else {
        return false;
    }
}

function moveUp() {
    if (canMoveUp()) {
        topPosition -= 1 * sprintMultiplier;
    }
    
    updateCharacterPosition();
}
function moveDown() {
    if (canMoveDown()) {
    topPosition += 1 * sprintMultiplier;
    }
    updateCharacterPosition();
}

function moveLeft() {   
    if (canMoveLeft()) {
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

generateSavedCharacter();
alignPaths();