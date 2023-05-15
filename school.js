const school = document.querySelector('.jthbuilding');
const fountain = document.querySelector('.fountain');

let topPosition = 38;
let leftPosition = 80;

const schoolPosition = school.getBoundingClientRect();
const fountainPosition = fountain.getBoundingClientRect();

// check if the character can move up
function canMoveUp() {
    console.log(schoolPosition.bottom)
    console.log(characterPosition.bottom)
    if (characterPosition.bottom > schoolPosition.bottom + 30) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move down 
function canMoveDown() {
    if (characterPosition.bottom < window.innerHeight) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move left
function canMoveLeft() {
    return true;
}
// check if the character can move right
function canMoveRight() {
    if (characterPosition.right < window.innerWidth) {
        return true;
    }
    else {
        return false;
    }
}

function checkForScreenChange() {
    console.log(characterPosition.left)
    // left
    if (characterPosition.left < 0) {
        window.location.href = 'intersection.html';
    }
}