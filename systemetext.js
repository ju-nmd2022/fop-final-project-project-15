// get hitbox items
const systemetDoor = document.querySelector('.systemet-door');
const systemetBuilding = document.querySelector('.systemet-building');
const systemetImage = document.querySelector('.systemet-image');

// place the player based on these values
let topPosition = 58;
let leftPosition = 80;
// get the position of the door and building
const doorPosition = systemetDoor.getBoundingClientRect();
const buildingPosition = systemetBuilding.getBoundingClientRect();

// check if the character can move up
function canMoveUp() {
    if (characterPosition.bottom > buildingPosition.bottom) {
        return true;
    }
    else {
        return false;
    }
}
function canMoveDown() {
    return true;
}
function canMoveLeft() {
    return true;
}
function canMoveRight() {
    return true;
}

function checkForScreenChange() {
    // left: characterposition.left + characterposition.width/2
    if (characterPosition.left + characterPosition.width/2 < 0) {
        alert('halla')
        // go to alcamo
    }
    // right: characterposition.right - characterposition.width/2
    if (characterPosition.right - characterPosition.width/2 > window.innerWidth) {
        window.location.href = 'bridge.html';
    }
    // top: characterposition.top + characterposition.height/2
    if (localStorage.alcoholTaskCompleted === 'true') {
        return;
    }
    if (characterPosition.top + characterPosition.height/3 < buildingPosition.bottom && characterPosition.left + characterPosition.width/3 > doorPosition.left && characterPosition.left + characterPosition.width/3 < doorPosition.right) {
        window.location.href = 'systemetint.html';
    }
}

