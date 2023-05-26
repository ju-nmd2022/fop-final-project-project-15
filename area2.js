let topPosition = -55;
let leftPosition = 113;

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
    const oldManContainer = document.querySelector('.backdrop');
    const oldMan = document.createElement('img');
    oldMan.classList.add('old-man');
    oldMan.setAttribute('src',`/glyphs/systemetext/${whatOldMan}`);
    oldManContainer.appendChild(oldMan);
}

function makeOldManSpeak() {
    if (unlockedPatches.includes(patchStorageName)) {
        return;
    }
    const oldManSpeechBubble = new SpeechBubble('35','95','...','Hey!','Are you trying to get in to AKA?',`I am in ${whatSM}!`,'WHAT!',`You don't have the ${whatPatch}?`,'Here, I have an extra one');
    oldManSpeechBubble.createSpeechBubble();
    return true;
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