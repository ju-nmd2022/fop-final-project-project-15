// DOM consts
const westcoastAka = document.getElementById('westcoastAka');
const exclamationPoint = document.getElementById('exclamationPoint');
const westcoastStudent = document.getElementById('westcoastStudent');

// get hitboxes
const westcoastAkaPosition = westcoastAka.getBoundingClientRect();
 
let topPosition = 62;
let leftPosition = 80;

let unlockedPatches = JSON.parse(localStorage.unlockedPatches);

function canMoveUp() {
    if (characterPosition.top > westcoastAkaPosition.bottom - (characterPosition.height - characterPosition.height/4)) {
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

function checkForScreenChange() {
    if (characterPosition.right > window.innerWidth + characterPosition.width/2) {
        window.location.href = '/aka/aka.html'
    }
}

function westcoastAnimation() {
    pauseGame();
    exclamationPoint.classList.add('exclamation-animation');
    westcoastStudent.classList.add('westcoast-student-animation');
    const westcoastSpeech = new SpeechBubble(52,130,'Hey kid!','What are you doing back here?','I am in WESTCOAST!','The GREATEST','and only...','nation in Jönköping!','Anyways','I see you/re not wearing the WESTCOAST PATCH!','I might have an extra one lying around...');

    setTimeout(() => {
        westcoastSpeech.createSpeechBubble();    
    }, 4000);
}

function endOfBubbleHandler() {
    const newPatchUnlocked = new TaskCompletion('WESTCOAST PATCH','/glyphs/patches/westcoastpatch.png');
    newPatchUnlocked.createTaskCompletionPopup();
    unlockedPatches.push('westcoastPatch');
    localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
}

function reloadOnZeroWidth() {
    if (westcoastAkaPosition.bottom < 50) {
        location.reload();
    }
}

if (!unlockedPatches.includes('westcoastPatch')) {
    westcoastAnimation();
}
reloadOnZeroWidth();