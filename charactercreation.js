const chooseName = document.getElementById('chooseName');
const characterName = document.getElementById('characterName');
const chooseHairColor = document.getElementById('chooseHairColor');
const chooseShirtColor = document.getElementById('chooseShirtColor');
const choosePantsColor = document.getElementById('choosePantsColor');
const chooseOvveColor = document.getElementById('chooseOvveColor');
const characterScreen = document.getElementById('characterScreen');
const submitChangesButton = document.getElementById('submitChangesButton');
const showOvve = document.getElementById('showOvve');

const jthIcon = document.getElementById('jthIcon');
const commIcon1 = document.getElementById('commIcon1');
const commIcon2 = document.getElementById('commIcon2');
const teachIcon = document.getElementById('teachIcon');
const healthIcon = document.getElementById('healthIcon');
const jibsIcon = document.getElementById('jibsIcon');
const qultIcon = document.getElementById('qultIcon');

const hair = document.getElementById('hair');
const rightEye = document.getElementById('rightEye');
const pupilAxisRight = document.getElementById('pupilAxisRight');
const leftEye = document.getElementById('leftEye');
const pupilAxisLeft = document.getElementById('pupilAxisLeft');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const rightOvveLeg = document.getElementById('rightOvveLeg');
const leftOvveLeg = document.getElementById('leftOvveLeg');
const ovve = document.querySelector('.ovve');
const legs = document.querySelector('.legs');

let savedCharacter; 
let unlockedPatches = ['winnerPatch'];
localStorage.unlockedPatches = JSON.stringify(unlockedPatches);

unlockedPatches.push(0);

if (localStorage.character !== undefined) {
    savedCharacter = JSON.parse(localStorage.character); 
}
else {
    savedCharacter = {
        name: 'akko',
        school: 'JTH',
        hairColor: 'yellow',
        shirtColor: 'red',
        pantsColor: 'blue',
        ovveColor: 'rgb(235, 212, 35)'
    };
    localStorage.character = JSON.stringify(savedCharacter);
}

if (localStorage.unlockedPatches !== undefined) {
    unlockedPatches = JSON.parse(localStorage.unlockedPatches);
}
else {
    unlockedPatches = ['none'];
    localStorage.unlockedPatches = JSON.stringify(unlockedPatches);
}

// for testing purposes


// import the unlocked patches
function importPatches() {
    const winnerPatch = document.querySelector('.winner-patch');
    if (unlockedPatches.includes('winnerPatch')) {
        console.log(winnerPatch)
        winnerPatch.style.display = 'block';
    }
}

let character = {
    name: savedCharacter.name,
    school: savedCharacter.school,
    hairColor: savedCharacter.hairColor,
    shirtColor: savedCharacter.shirtColor,
    pantsColor: savedCharacter.pantsColor,
    ovveColor: savedCharacter.ovveColor
};

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

submitChangesButton.addEventListener('click', () => {
    if (chooseOvveColor.value === 'Yellow (JTH)') {
        character.ovveColor = 'rgb(235, 212, 35)';
        character.school = 'JTH';
        jthIcon.style.display = 'block';
        jthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            jthIcon.style.display = 'none';
            jthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Blue (HLK)') {
        character.ovveColor = 'rgb(26, 46, 230)';
        character.school = 'HLK (Blue)';
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
        character.ovveColor = 'rgb(230, 26, 26)';
        character.school = 'HLK (Red)';
        teachIcon.style.display = 'block';
        teachIcon.classList.add('fade-animation');
        setTimeout(() => {
            teachIcon.style.display = 'none';
            teachIcon.classList.remove('fade-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'White (Hälso)') {
        character.ovveColor = 'rgb(255, 255, 255)';
        character.school = 'Hälso';
        healthIcon.style.display = 'block';
        healthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            healthIcon.style.display = 'none';
            healthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Green (JIBS)') {
        character.ovveColor = 'rgb(5, 111, 17)';
        character.school = 'JIBS';
        jibsIcon.style.display = 'block';
        jibsIcon.classList.add('jibs-animation');
        setTimeout(() => {
            jibsIcon.style.display = 'none';
            jibsIcon.classList.remove('jibs-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Black (Qult)') {
        character.ovveColor = 'rgb(0, 0, 0)';
        character.school = 'Qult';
        qultIcon.style.display = 'block';
        qultIcon.classList.add('qult-animation');
        setTimeout(() => {
            qultIcon.style.display = 'none';
            qultIcon.classList.remove('qult-animation');
        }, 2000);
    }

    character.name = chooseName.value;
    character.hairColor = chooseHairColor.value;
    character.shirtColor = chooseShirtColor.value;
    character.pantsColor = choosePantsColor.value;

    createCharacter();
    localStorage.removeItem(character);
    localStorage.character = JSON.stringify(character);
    savedCharacter = JSON.parse(localStorage.character);
})

function createCharacter() {
    characterName.innerText = character.name;
    hair.style.backgroundColor = character.hairColor;
    rightArm.style.backgroundColor = character.shirtColor;
    leftArm.style.backgroundColor = character.shirtColor;
    torso.style.backgroundColor = character.shirtColor;
    leftLeg.style.backgroundColor = character.pantsColor;
    rightLeg.style.backgroundColor = character.pantsColor;
    rightOvveLeg.style.backgroundColor = character.ovveColor;
    leftOvveLeg.style.backgroundColor = character.ovveColor;
}

function hideOrShowOvve() {
    if (showOvve.checked) {
        ovve.style.display = 'flex'
        legs.style.display = 'none'
    } else {
        ovve.style.display = 'none'
        legs.style.display = 'flex'
    }
}
showOvve.addEventListener('click', () => {
    hideOrShowOvve();
})

hideOrShowOvve();
createCharacter();
importPatches();