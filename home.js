// DOM consts
const playerHouse = document.getElementById('playerHouse');
const playerHouseDoor = document.getElementById('playerHouseDoor');
const playerHouseOvve = document.getElementById('playerHouseOvve');

// get hitboxes
const playerHousePosition = playerHouse.getBoundingClientRect();
const playerHouseDoorPosition = playerHouseDoor.getBoundingClientRect();

// get the school for ovvecolor
const ovveInformation = JSON.parse(localStorage.character);
let ovveToDisplay;

switch (ovveInformation.school) {
    case 'JTH':
        ovveToDisplay = 'glyphs/home/yellowovve.png';
        break;
    case 'HLK (Blue)':
        ovveToDisplay = 'glyphs/home/blueovve.png';
        break;
    case 'HLK (Red)':
        ovveToDisplay = 'glyphs/home/redovve.png';
        break;
    case 'Hälso':
        ovveToDisplay = 'glyphs/home/whiteovve.png';
        break;
    case 'JIBS':
        ovveToDisplay = 'glyphs/home/greenovve.png';
        break;
    case 'Qult':
        ovveToDisplay = 'glyphs/home/blackovve.png';
        break;
}

function updateOvveInWindow() {
    playerHouseOvve.setAttribute('src', ovveToDisplay);
}
    
 

let topPosition = 50;
let leftPosition = 50;

function canMoveUp() {
    if (characterPosition.top > playerHousePosition.bottom) {
        return true;
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
    if (characterPosition.bottom > window.innerHeight + characterPosition.height/2) {
        window.location.href = 'intersection.html';
    }

    if (localStorage.ovveTaskCompleted === 'true') {
        return;
    }
    if (characterPosition.top < playerHousePosition.bottom - (characterPosition.height - characterPosition.height/4) && characterPosition.left > playerHouseDoorPosition.left && characterPosition.right < playerHouseDoorPosition.right) {
        const ovveTaskCompletedPopup = new TaskCompletion('Get your ovve');
        ovveTaskCompletedPopup.createTaskCompletionPopup();
        localStorage.ovveTaskCompleted = 'true';
        upgradeTaskColors();
        isOvveOn();
    }
    }

function reloadOnZeroWidth() {
    if (playerHouseDoorPosition.bottom < 50) {
        location.reload();
    }
}
    
reloadOnZeroWidth();
updateOvveInWindow();