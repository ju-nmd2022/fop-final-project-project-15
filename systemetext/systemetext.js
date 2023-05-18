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

// get the information about the player
const playerSchool = JSON.parse(localStorage.character);
const unlockedPatches = JSON.parse(localStorage.unlockedPatches);

let whatOldMan;
let whatSM;
let whatPatch;
let patchStorageName;
let patchImageSrc;
switch(playerSchool.school) {
    case 'JTH':
        whatOldMan = 'oldmanyellow.png'
        whatSM = 'X-LIFE'
        whatPatch = 'HI-TECH PATCH'
        patchStorageName = 'hiTechPatch';
        patchImageSrc = 'hitechpatch.png'
        break;
    case 'HLK (Blue)':
        whatOldMan = 'oldmanblue.png'
        whatSM = 'X-CREW'
        whatPatch = 'LOK PATCH'
        patchStorageName = 'lokPatch';
        patchImageSrc = 'lokpatch.png'
        break;
    case 'Hälso':
        whatOldMan = 'oldmanwhite.png'
        whatSM = 'X-CELL'
        whatPatch = 'HÄLSOSEKTIONEN PATCH'
        patchStorageName = 'halsosektionenPatch';
        patchImageSrc = 'halsopatch.png'
        break;
    case 'HLK (Red)':
        whatOldMan = 'oldmanred.png'
        whatSM = 'PED-X'
        whatPatch = 'LOK PATCH'
        patchStorageName = 'lokPatch';
        patchImageSrc = 'lokpatch.png'
        break;
    case 'JIBS':
        whatOldMan = 'oldmangreen.png'
        whatSM = 'XKREATION'
        whatPatch = 'JSA PATCH'
        patchStorageName = 'jsaPatch';
        patchImageSrc = 'jsapatch.png'
        break;
    case 'Qult':
        whatOldMan = 'oldmanblack.png'
        whatSM = 'QEX'
        whatPatch = 'QULT PATCH'
        patchStorageName = 'qultPatch';
        patchImageSrc = 'qultpatch.png'
        break;
}

function displayOldMan() {
    const oldManContainer = document.querySelector('.screen-container');
    const oldMan = document.createElement('img');
    oldMan.classList.add('old-man');
    oldMan.setAttribute('src',`/glyphs/systemetext/${whatOldMan}`);
    let oldManPosition = oldMan.getBoundingClientRect().height;
    console.log(oldManPosition)
    oldMan.style.top = buildingPosition.bottom - 190 + 'px';
    oldMan.style.right = buildingPosition.width + 'px';
    oldManContainer.appendChild(oldMan);
}

function makeOldManSpeak() {
    if (unlockedPatches.includes(patchStorageName)) {
        return;
    }
    const oldManSpeechBubble = new SpeechBubble('13','27','...','Hey!','Are you trying to get in to AKA?',`I am in ${whatSM}!`,'WHAT!',`You don't have the ${whatPatch}?`,'Here, I have an extra one');
    oldManSpeechBubble.createSpeechBubble();
}

function endOfBubbleHandler() {
    if (makeOldManSpeak()) {
    const newPatchUnlocked = new TaskCompletion(whatPatch,`/glyphs/patches/${patchImageSrc}`);
    newPatchUnlocked.createTaskCompletionPopup();
    unlockedPatches.push(patchStorageName);
    localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
    }
}

displayOldMan();


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
        window.location.href = '/bridge/bridge.html';
    }
    // make the old man speak when getting near him
    if (characterPosition.top < buildingPosition.bottom - characterPosition.height/2 && characterPosition.right < buildingPosition.left) {
        makeOldManSpeak();
    }
    // top: characterposition.top + characterposition.height/2
    if (localStorage.alcoholTaskCompleted === 'true') {
        return;
    }
    if (characterPosition.top + characterPosition.height/3 < buildingPosition.bottom && characterPosition.left + characterPosition.width/3 > doorPosition.left && characterPosition.left + characterPosition.width/3 < doorPosition.right) {
        window.location.href = '/systemetint/systemetint.html';
    }
}

function reloadOnZeroWidth() {
    if (buildingPosition.height < 100) {
        location.reload();
    }
}
reloadOnZeroWidth();