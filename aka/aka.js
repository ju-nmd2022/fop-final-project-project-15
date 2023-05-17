// DOM consts
const akaBuilding = document.getElementById('akaBuilding');
const akaDoor = document.getElementById('akaDoor');
const akaRailing = document.getElementById('akaRailing');

// get hitboxes
const akaBuildingPosition = akaBuilding.getBoundingClientRect();
const akaDoorPosition = akaDoor.getBoundingClientRect();
 
let topPosition = 50;
let leftPosition = 50;

function canMoveUp() {
    if (characterPosition.top > akaBuildingPosition.bottom - (characterPosition.height - characterPosition.height/4)) {
        return true;
    }
}
function canMoveDown() {
    if (characterPosition.bottom < window.innerHeight) {
        return true;
    }
}
function canMoveLeft() {
    if (characterPosition.left > 0) {
        return true;
    }
}
function canMoveRight() {
    return true;
}

function testForWin() {
    if (localStorage.alcoholTaskCompleted === 'true' && localStorage.kebabTaskCompleted === 'true' && localStorage.ovveTaskCompleted === 'true' && localStorage.prepartyTaskCompleted) {
        alert('win');
    } else {
        alert('no win!');
    }
}

function checkForScreenChange() {
    if (characterPosition.right < akaDoorPosition.right && characterPosition.left > akaDoorPosition.left && characterPosition.top < akaBuildingPosition.bottom - (characterPosition.height - characterPosition.height/4)) {
        testForWin();
    }
    if (characterPosition.right > window.innerWidth + characterPosition.width/2) {
        window.location.href = '/akaroad/akaroad.html'
    }
}

function reloadOnZeroWidth() {
    if (akaBuildingPosition.bottom < 50) {
        location.reload();
    }
}
    
reloadOnZeroWidth();