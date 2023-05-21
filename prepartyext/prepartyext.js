// get hitbox items
const frejsHouse = document.querySelector('.frejs-house');
const frejsDoor = document.getElementById('frejsDoor');

// place the player based on these values
let topPosition = 68;
let leftPosition = 80;
// get the position of the door and building
const frejsHousePosition = frejsHouse.getBoundingClientRect();
const frejsDoorPosition = frejsDoor.getBoundingClientRect();

let errorPopupDisplayed = false;

if (!localStorage.prepartyTaskCompleted) {
    localStorage.prepartyTaskCompleted = 'false';
}
if (!localStorage.prepartyPopupDisplayed) {
    localStorage.prepartyPopupDisplayed = 'false';
}

if (localStorage.prepartyTaskCompleted === 'true' && localStorage.prepartyPopupDisplayed === 'false') {
    // display the "win" popup
    let whereToGo;
    if (localStorage.kebabTaskCompleted === 'true') {
        whereToGo = 'Time to get to AKA';
    } else {
        whereToGo = 'Only the kebab left now';
    }
    const winPopup = new Popup(`What a party! ${whereToGo}`,'Continue','');
    winPopup.createPopup();
}

function displayErrorPopup() {
    if (!errorPopupDisplayed) {
        const errorPopup = new Popup('Wait a minute! I don/t have my ovve or any alcohol, better grab those first','Continue','');
        errorPopup.createPopup();
        errorPopupDisplayed = true;
    } 
}

function removePopupHandler() {
    unpauseGame();
    if (localStorage.prepartyTaskCompleted === 'true') {
        const prepartyCompletion = new TaskCompletion('Go to the preparty','/glyphs/taskicons/prepartytask.png');
        prepartyCompletion.createTaskCompletionPopup();
        localStorage.prepartyPopupDisplayed = 'true';
    }
}

// check if the character can move up
function canMoveUp() {
    if (characterPosition.bottom + characterPosition.height/2 > frejsHousePosition.bottom) {
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
        window.location.href = '/intersection/intersection.html';
    }
    // right: characterposition.right - characterposition.width/2
    if (characterPosition.right - characterPosition.width/2 > window.innerWidth) {
        // go to alcamo
    }
    // top: characterposition.top + characterposition.height/2
    if (characterPosition.bottom + characterPosition.height/2 < frejsHousePosition.bottom && characterPosition.left + characterPosition.width/3 > frejsDoorPosition.left && characterPosition.left + characterPosition.width/3 < frejsDoorPosition.right) {
        if (localStorage.prepartyTaskCompleted === 'true') {return;}
        if (localStorage.ovveTaskCompleted === 'false' || localStorage.alcoholTaskCompleted === 'false') {displayErrorPopup(); return;}
        window.location.href = '/prepartyint/prepartyint.html';
    }
}

function reloadOnZeroWidth() {
    if (frejsHousePosition.height < 100) {
        location.reload();
    }
}
reloadOnZeroWidth();