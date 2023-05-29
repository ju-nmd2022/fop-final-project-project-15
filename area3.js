let topPosition = -35;
let leftPosition = 150;

const exclamationPoint = document.getElementById('exclamationPoint');
const westcoastStudent = document.getElementById('westcoastStudent');

const unlockedPatches = JSON.parse(localStorage.unlockedPatches);

function westcoastAnimation() {
    pauseGame();
    exclamationPoint.classList.add('exclamation-animation');
    westcoastStudent.classList.add('westcoast-student-animation');
    westcoastStudent.style.top = `${-topPosition+10}rem`;
    const westcoastSpeech = new SpeechBubble(-topPosition+15,'65','Hey kid!','What are you doing back here?','I am in WESTCOAST!','The GREATEST','and only...','nation in Jönköping!','Anyways','I see you/re not wearing the WESTCOAST PATCH!','I might have an extra one lying around...');

    setTimeout(() => {
        westcoastSpeech.createSpeechBubble();    
    }, 4000);
}

function endOfBubbleHandler() {
    if (!unlockedPatches.includes('westcoastPatch')) {
        const newPatchUnlocked = new TaskCompletion('WESTCOAST PATCH','glyphs/patches/westcoastpatch.png');
        newPatchUnlocked.createTaskCompletionPopup();
        unlockedPatches.push('westcoastPatch');
        localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
    }
}

function testForWin() {
    if (localStorage.alcoholTaskCompleted === 'true' && localStorage.kebabTaskCompleted === 'true' && localStorage.ovveTaskCompleted === 'true' && localStorage.prepartyTaskCompleted) {
        const winPopup = new Popup('Congratulations! You/ve beat the game','Return to main menu','');
        winPopup.createPopup();
    } else {
        const failPopup = new Popup('Hmmm, looks like I still have some tasks to complete','Back','');
        failPopup.createPopup();
    }
}
function removePopupHandler() {
    if (localStorage.alcoholTaskCompleted === 'true' && localStorage.kebabTaskCompleted === 'true' && localStorage.ovveTaskCompleted === 'true' && localStorage.prepartyTaskCompleted) {
        let homeScreenTimer = 0;
        let patchPopupDelay = 0;
        if (!unlockedPatches.includes('winnerPatch')) {
            const winnerPatchUnlocked = new TaskCompletion('WINNER PATCH','glyphs/patches/winnerpatch.svg');
            winnerPatchUnlocked.createTaskCompletionPopup();
            unlockedPatches.push('winnerPatch');
            localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
            homeScreenTimer += 2500;
            patchPopupDelay += 2500;
        }
        if (localStorage.currentMinute < 31 && !unlockedPatches.includes('speedfreakPatch')) {
            homeScreenTimer += 2500;
            setTimeout(() => {
                const speedfreakPatchUnlocked = new TaskCompletion('SPEEDFREAK PATCH','glyphs/patches/speedfreakpatch.png');
                speedfreakPatchUnlocked.createTaskCompletionPopup();
                unlockedPatches.push('speedfreakPatch');
                localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
            }, patchPopupDelay);
        }
        setTimeout(() => {
            window.location.href = 'index.html';
        }, homeScreenTimer);
    }
}