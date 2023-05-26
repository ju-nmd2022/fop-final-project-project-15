let topPosition = -20;
let leftPosition = 190;

let ovveToDisplay;
const whatOvve = JSON.parse(localStorage.character);

switch (whatOvve.school) {
    case 'JTH':
        ovveToDisplay = '/glyphs/home/yellowovve.png';
        break;
    case 'HLK (Blue)':
        ovveToDisplay = '/glyphs/home/blueovve.png';
        break;
    case 'HLK (Red)':
        ovveToDisplay = '/glyphs/home/redovve.png';
        break;
    case 'Hälso':
        ovveToDisplay = '/glyphs/home/whiteovve.png';
        break;
    case 'JIBS':
        ovveToDisplay = '/glyphs/home/greenovve.png';
        break;
    case 'Qult':
        ovveToDisplay = '/glyphs/home/blackovve.png';
        break;
}

function updateOvveInWindow() {
    if (localStorage.ovveTaskCompleted === 'true') {
        playerHouseOvve.setAttribute('src', '/glyphs/home/emptywindow.png');    
    } else {
        playerHouseOvve.setAttribute('src', ovveToDisplay);
    }
}

if (localStorage.prepartyTaskCompleted === 'true' && localStorage.prepartyPopupDisplayed === 'false') {
    // display the "win" popup
    const winPopup = new Popup('What a party!','Continue','');
    winPopup.createPopup();
}

function displayErrorPopup() {
        const errorPopup = new Popup('Darn it! Frej won/t let me in yet','Continue','');
        errorPopup.createPopup();
        errorPopupDisplayed = true;
}

function removePopupHandler() {
    unpauseGame();
    if (localStorage.prepartyTaskCompleted === 'true' && localStorage.prepartyPopupDisplayed === 'false') {
        const prepartyCompletion = new TaskCompletion('Go to the preparty','/glyphs/taskicons/prepartytask.png');
        prepartyCompletion.createTaskCompletionPopup();
        localStorage.prepartyPopupDisplayed = 'true';
    } 
}

updateOvveInWindow();