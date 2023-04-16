const character = document.getElementById('character');

let topPosition = 0;
let leftPosition = 0;

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
})