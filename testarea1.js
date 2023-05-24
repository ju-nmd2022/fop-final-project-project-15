const backdrop = document.querySelector('.backdrop');
const character = document.getElementById('character');

let topMargin = 0;
let leftMargin = 0;
let topPosition = 50;
let leftPosition = 50;

function moveBackdropUp() {
    const characterPosition = character.getBoundingClientRect();
    if (characterPosition.top < 100 && topMargin !== 0) {
        topMargin += 1;
        backdrop.style.top = `${topMargin}vh`;
    }
}
function moveBackdropDown() {
    const characterPosition = character.getBoundingClientRect();
    const backdropPosition = backdrop.getBoundingClientRect();
    if (characterPosition.bottom > window.innerHeight - 100) {
        topMargin -= 1;
        backdrop.style.top = `${topMargin}vh`;
    }    
}
function moveBackdropLeft() {
    const characterPosition = character.getBoundingClientRect();
    if (characterPosition.left < 100  && leftMargin !== 0) {
        leftMargin += 1;
        backdrop.style.left = `${leftMargin}vw`;
    }
}
function moveBackdropRight() {
    const characterPosition = character.getBoundingClientRect();
    const backdropPosition = backdrop.getBoundingClientRect();
    if (characterPosition.right > window.innerWidth - 90) {
        leftMargin -= 1;
        backdrop.style.left = `${leftMargin}vw`;
    }  
}

function canMoveUp() {
    moveBackdropUp();
    if (characterPosition.top > 90) {
        return true;
    } else {
        return false;
    }
}
function canMoveDown() {
    moveBackdropDown();
    if (characterPosition.top < window.innerHeight - 210) {
        return true;
    } else {
        return false;
    }
}
function canMoveLeft() {
    moveBackdropLeft();
    if (characterPosition.left > 90) {
        return true;
    } else {
        return false;
    }
}
function canMoveRight() {
    moveBackdropRight();
    if (characterPosition.right < window.innerWidth-90) {
        return true;
    } else {
        return false;
    }
}
function checkForScreenChange() {

}

