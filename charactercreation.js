// DOM consts
const chooseName = document.getElementById('chooseName'); // name field
const characterName = document.getElementById('characterName'); // name text
const chooseHairColor = document.getElementById('chooseHairColor'); // hair color field
const chooseShirtColor = document.getElementById('chooseShirtColor'); // shirt color field
const choosePantsColor = document.getElementById('choosePantsColor'); // pants color field
const chooseOvveColor = document.getElementById('chooseOvveColor'); // ovve color field
const characterScreen = document.getElementById('characterScreen'); //character window
const submitChangesButton = document.getElementById('submitChangesButton'); //submit button
const showOvve = document.getElementById('showOvve'); //show ovve checkbox
const patchListEntrys = Array.from(document.querySelectorAll('.patch-list > div'));
const patchEquippedText = Array.from(document.querySelectorAll('.patch-equipped'));
const patchUnlockedText = Array.from(document.querySelectorAll('.patch-unlocked'));
const patchTooltips = Array.from(document.querySelectorAll('.patch-tooltip'));
const patchButton = document.querySelector('.patch-button');
const patchList = document.querySelector('.patch-list');
const patchToolTip = document.querySelector('.patch-tooltip');
const presentationModeTooltip = document.querySelector('.presentation-mode-tooltip');

// icons displayed on submit click depending on ovve color
const jthIcon = document.getElementById('jthIcon'); //jth icon
const commIcon1 = document.getElementById('commIcon1'); //comm...
const commIcon2 = document.getElementById('commIcon2'); //icons
const teachIcon = document.getElementById('teachIcon'); //teacher icon
const healthIcon = document.getElementById('healthIcon'); //health icon
const jibsIcon = document.getElementById('jibsIcon'); //jibs icon
const qultIcon = document.getElementById('qultIcon'); //qult icon

// character parts
const hair = document.getElementById('hair'); //hair
const rightEye = document.getElementById('rightEye'); //right eye
const pupilAxisRight = document.getElementById('pupilAxisRight'); //pupil axis right
const leftEye = document.getElementById('leftEye'); //left eye
const pupilAxisLeft = document.getElementById('pupilAxisLeft'); //pupil axis left
const rightArm = document.getElementById('rightArm'); //right arm
const torso = document.getElementById('torso'); //torso
const leftArm = document.getElementById('leftArm'); //left arm
const rightLeg = document.getElementById('rightLeg'); //right leg
const leftLeg = document.getElementById('leftLeg'); //left leg
const playerOvve = document.getElementById('playerOvve'); //ovve image
const ovve = document.querySelector('.ovve'); //ovve container
const legs = document.querySelector('.legs'); //leg container

let patchListDisplayed = false;
const patches = ['winnerPatch','speedfreakPatch','hitechPatch','lokPatch','halsosektionenPatch','jsaPatch','qultPatch','westcoastPatch'];

let savedCharacter = JSON.parse(localStorage.character); //fetch the localStorage settings for character properties
let unlockedPatches = JSON.parse(localStorage.unlockedPatches); //fetch the localStorage settings for unlocked patches
let equippedPatches = JSON.parse(localStorage.equippedPatches);

patchList.addEventListener('mouseover', () => {
    for (let index in patchListEntrys) {
        patchListEntrys[index].addEventListener('mouseenter', () => {
            patchTooltips[index].style.display = 'block';
        });
        patchListEntrys[index].addEventListener('mouseleave', () => {
            patchTooltips[index].style.display = 'none';
        });
        patchListEntrys[index].addEventListener('click', () => { //to equip the patch
            if (unlockedPatches.includes(patches[index]) || localStorage.presentationMode === 'true') { //if the patch is unlocked or presentation mode is on
                if (equippedPatches.includes(patches[index])) {
                    equippedPatches.splice(equippedPatches.indexOf(patches[index]),1);
                    changeEquippedText();
                    hideOrShowPatches();
                    
                } else {                    
                    equippedPatches.push(patches[index]);
                    changeEquippedText();
                    hideOrShowPatches();
                }
                localStorage.removeItem(equippedPatches);
                localStorage.equippedPatches = JSON.stringify(equippedPatches);
            }   
        });
    }
});

patchButton.addEventListener('click', () => {
    if (patchListDisplayed) {
        patchList.style.display = 'none';
        presentationModeTooltip.style.display = 'none';
        patchListDisplayed = false;
    } else {
        patchList.style.display = 'grid';
        if (localStorage.presentationMode === 'true') {
            presentationModeTooltip.style.display = 'block';
        }
        patchListDisplayed = true;
    }
});

function changeEquippedText() {
    for (let index in patches) {
        if (equippedPatches.includes(patches[index])) {
            patchEquippedText[index].innerText = 'Equipped';
            patchEquippedText[index].style.color = 'green';
        } else {
            patchEquippedText[index].innerText = 'Not Equipped';
            patchEquippedText[index].style.color = 'red';
        }
    }
}
changeEquippedText();

function changePatchColorAndAmountIfUnlocked() {
    if (unlockedPatches.includes('winnerPatch')) {
        patchListEntrys[0].style.backgroundColor = 'green';
        patchUnlockedText[0].style.color = 'green';
        patchUnlockedText[0].innerText = 'Unlocked';
        patchEquippedText[0].style.display = 'block';
    }
    if (unlockedPatches.includes('speedfreakPatch')) {
        patchListEntrys[1].style.backgroundColor = 'green';
        patchUnlockedText[1].style.color = 'green';
        patchUnlockedText[1].innerText = 'Unlocked';
        patchEquippedText[1].style.display = 'block';
    }
    if (unlockedPatches.includes('hitechPatch')) {
        patchListEntrys[2].style.backgroundColor = 'green';
        patchUnlockedText[2].style.color = 'green';
        patchUnlockedText[2].innerText = 'Unlocked';
        patchEquippedText[2].style.display = 'block';
    }
    if (unlockedPatches.includes('lokPatch')) {
        patchListEntrys[3].style.backgroundColor = 'green';
        patchUnlockedText[3].style.color = 'green';
        patchUnlockedText[3].innerText = 'Unlocked';
        patchEquippedText[3].style.display = 'block';
    }
    if (unlockedPatches.includes('halsosektionenPatch')) {
        patchListEntrys[4].style.backgroundColor = 'green';
        patchUnlockedText[4].style.color = 'green';
        patchUnlockedText[4].innerText = 'Unlocked';
        patchEquippedText[4].style.display = 'block';
    }
    if (unlockedPatches.includes('jsaPatch')) {
        patchListEntrys[5].style.backgroundColor = 'green';
        patchUnlockedText[5].style.color = 'green';
        patchUnlockedText[5].innerText = 'Unlocked';
        patchEquippedText[5].style.display = 'block';
    }
    if (unlockedPatches.includes('qultPatch')) {
        patchListEntrys[6].style.backgroundColor = 'green';
        patchUnlockedText[6].style.color = 'green';
        patchUnlockedText[6].innerText = 'Unlocked';
        patchEquippedText[6].style.display = 'block';
    }
    if (unlockedPatches.includes('westcoastPatch')) {
        patchListEntrys[7].style.backgroundColor = 'green';
        patchUnlockedText[7].style.color = 'green';
        patchUnlockedText[7].innerText = 'Unlocked';
        patchEquippedText[7].style.display = 'block';
    }
    document.querySelector('.patch-button > p').innerText = `Patches (${unlockedPatches.length} of 8 unlocked)`
}

chooseOvveColor.addEventListener('click', () => {
    chooseOvveColor.value = '';
})

// make the eyes follow the cursor (kind of)
document.addEventListener('mousemove', (e) => {
    // const rotation = (event.pageY/window.innerHeight)*90;
    const rotationY = (e.clientY/window.innerHeight) * 90;
    const rotationX = (e.clientX/window.innerWidth) * 90;
    pupilAxisLeft.style.transform = 'rotate(-' + rotationY + 'deg)';
    pupilAxisRight.style.transform = 'rotate(-' + rotationY + 'deg)';
    leftEye.style.transform = 'rotate(-' + rotationX + 'deg)';
    rightEye.style.transform = 'rotate(-' + rotationX + 'deg)';
})

function updateCharacterLook() {
    if (chooseOvveColor.value === 'Yellow (JTH)') {
        savedCharacter.ovveColor = 'yellowovve.png';//rgb(235, 212, 35)
        savedCharacter.school = 'JTH';
        jthIcon.style.display = 'block';
        jthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            jthIcon.style.display = 'none';
            jthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Blue (HLK)') {
        savedCharacter.ovveColor = 'blueovve.png'; //rgb(26, 46, 230)
        savedCharacter.school = 'HLK (Blue)';
        commIcon1.style.display = 'block';
        commIcon2.style.display = 'block';
        commIcon2.classList.add('fade-animation');
        setTimeout(() => {
            commIcon1.style.display = 'none';
            commIcon2.style.display = 'none';
            commIcon2.classList.remove('fade-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Red (HLK)') {
        savedCharacter.ovveColor = 'redovve.png'; //rgb(230, 26, 26)
        savedCharacter.school = 'HLK (Red)';
        teachIcon.style.display = 'block';
        teachIcon.classList.add('fade-animation');
        setTimeout(() => {
            teachIcon.style.display = 'none';
            teachIcon.classList.remove('fade-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'White (Hälso)') {
        savedCharacter.ovveColor = 'whiteovve.png';//rgb(255, 255, 255)
        savedCharacter.school = 'Hälso';
        healthIcon.style.display = 'block';
        healthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            healthIcon.style.display = 'none';
            healthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Green (JIBS)') {
        savedCharacter.ovveColor = 'greenovve.png';//rgb(5, 111, 17)
        savedCharacter.school = 'JIBS';
        jibsIcon.style.display = 'block';
        jibsIcon.classList.add('jibs-animation');
        setTimeout(() => {
            jibsIcon.style.display = 'none';
            jibsIcon.classList.remove('jibs-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Black (Qult)') {
        savedCharacter.ovveColor = 'blackovve.png';//rgb(0, 0, 0)
        savedCharacter.school = 'Qult';
        qultIcon.style.display = 'block';
        qultIcon.classList.add('qult-animation');
        setTimeout(() => {
            qultIcon.style.display = 'none';
            qultIcon.classList.remove('qult-animation');
        }, 2000);
    }

    savedCharacter.name = chooseName.value;
    savedCharacter.hairColor = chooseHairColor.value;
    savedCharacter.shirtColor = chooseShirtColor.value;
    savedCharacter.pantsColor = choosePantsColor.value;

    createCharacter();
    localStorage.removeItem(character);
    localStorage.character = JSON.stringify(savedCharacter);
    savedCharacter = JSON.parse(localStorage.character);
}

function createCharacter() {
    characterName.innerText = savedCharacter.name;
    hair.style.backgroundColor = savedCharacter.hairColor;
    rightArm.style.backgroundColor = savedCharacter.shirtColor;
    leftArm.style.backgroundColor = savedCharacter.shirtColor;
    torso.style.backgroundColor = savedCharacter.shirtColor;
    leftLeg.style.backgroundColor = savedCharacter.pantsColor;
    rightLeg.style.backgroundColor = savedCharacter.pantsColor;
    playerOvve.setAttribute('src',`glyphs/ovve/${savedCharacter.ovveColor}`);
}

// const chooseName = document.getElementById('chooseName'); // name field
// const characterName = document.getElementById('characterName'); // name text
// const chooseHairColor = document.getElementById('chooseHairColor'); // hair color field
// const chooseShirtColor = document.getElementById('chooseShirtColor'); // shirt color field
// const choosePantsColor = document.getElementById('choosePantsColor'); // pants color field
// const chooseOvveColor = document.getElementById('chooseOvveColor'); // ovve color field

submitChangesButton.addEventListener('click', () => {
    updateCharacterLook();
})
chooseName.addEventListener('change',()=> {
    updateCharacterLook();
});
chooseHairColor.addEventListener('change',()=> {
    updateCharacterLook();
});
chooseShirtColor.addEventListener('change',()=> {
    updateCharacterLook();
});
choosePantsColor.addEventListener('change',()=> {
    updateCharacterLook();
});
chooseOvveColor.addEventListener('change',()=> {
    updateCharacterLook();
});

function hideOrShowOvve() {
    if (showOvve.checked) {
        ovve.style.display = 'flex'
        legs.style.display = 'none'
    } else {
        ovve.style.display = 'none'
        legs.style.display = 'flex'
    }
}
function hideOrShowPatches() {
    // patches
    const patchesInDom = Array.from(document.querySelectorAll('.patch')) 

    for (let index in patches) {
        if (equippedPatches.includes(patches[index])) {
            patchesInDom[index].style.display = 'block';
        } else {
            patchesInDom[index].style.display = 'none';
        }
    }
}

showOvve.addEventListener('click', () => {
    hideOrShowOvve();
})

hideOrShowOvve();
hideOrShowPatches();
createCharacter();
changePatchColorAndAmountIfUnlocked();