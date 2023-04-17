import Character from "./character.js";

const chooseName = document.getElementById('chooseName');
const characterName = document.getElementById('characterName');
const chooseHairColor = document.getElementById('chooseHairColor');
const chooseShirtColor = document.getElementById('chooseShirtColor');
const chooseOvveColor = document.getElementById('chooseOvveColor');
const characterScreen = document.getElementById('characterScreen');
const submitChangesButton = document.getElementById('submitChangesButton');

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

let savedCharacter = JSON.parse(localStorage.character); 

let name;
let hairColor;
let shirtColor;
let ovveColor;

const character = new Character(name,shirtColor,ovveColor,hairColor);

// import saved character, if one exists
if (savedCharacter.name !== null) {
    name = savedCharacter.name;
    character.name = name;
}
else {
    name = 'New Character';
    character.name = name;
}
if (savedCharacter.hairColor !== null) {
    hairColor = savedCharacter.hairColor;
    character.hairColor = hairColor;
}
else {
    hairColor = 'yellow';
    character.hairColor = hairColor;
}
if (savedCharacter.shirtColor !== null) {
    shirtColor = savedCharacter.shirtColor;
    character.shirtColor = shirtColor;
}
else {
    shirtColor = "red";
    character.shirtColor = shirtColor;
}
if (savedCharacter.ovveColor !== null) {
    ovveColor = savedCharacter.ovveColor;
    character.ovveColor = ovveColor;
}
else {
    ovveColor = "yellow";
    character.ovveColor = ovveColor;
}

chooseOvveColor.addEventListener('click', () => {
    chooseOvveColor.value = '';
})

// make the eyes follow the cursor 
document.addEventListener('mousemove', () => {
    // const rotation = (event.pageY/window.innerHeight)*90;
    const rotationY = (event.pageY/window.innerHeight) * 90;
    const rotationX = (event.pageX/window.innerWidth) * 90;
    pupilAxisLeft.style.transform = 'rotate(-' + rotationY + 'deg)';
    pupilAxisRight.style.transform = 'rotate(-' + rotationY + 'deg)';
    leftEye.style.transform = 'rotate(-' + rotationX + 'deg)';
    rightEye.style.transform = 'rotate(-' + rotationX + 'deg)';
    
})

submitChangesButton.addEventListener('click', () => {
    if (chooseOvveColor.value === 'Yellow (JTH)') {
        ovveColor = 'rgb(235, 212, 35)';
        jthIcon.style.display = 'block';
        jthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            jthIcon.style.display = 'none';
            jthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Blue (HLK)') {
        ovveColor = 'rgb(26, 46, 230)';
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
        ovveColor = 'rgb(230, 26, 26)';
        teachIcon.style.display = 'block';
        teachIcon.classList.add('fade-animation');
        setTimeout(() => {
            teachIcon.style.display = 'none';
            teachIcon.classList.remove('fade-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'White (Hälso)') {
        ovveColor = 'rgb(255, 255, 255)';
        healthIcon.style.display = 'block';
        healthIcon.classList.add('rotate-animation');
        setTimeout(() => {
            healthIcon.style.display = 'none';
            healthIcon.classList.remove('rotate-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Green (JIBS)') {
        ovveColor = 'rgb(5, 111, 17)';
        jibsIcon.style.display = 'block';
        jibsIcon.classList.add('jibs-animation');
        setTimeout(() => {
            jibsIcon.style.display = 'none';
            jibsIcon.classList.remove('jibs-animation');
        }, 2000);
    }
    else if (chooseOvveColor.value === 'Black (Qult)') {
        ovveColor = 'rgb(0, 0, 0)';
        qultIcon.style.display = 'block';
        qultIcon.classList.add('qult-animation');
        setTimeout(() => {
            qultIcon.style.display = 'none';
            qultIcon.classList.remove('qult-animation');
        }, 2000);
    }

    name = chooseName.value;
    hairColor = chooseHairColor.value;
    shirtColor = chooseShirtColor.value;
    
    character.name = name;
    character.hairColor = hairColor;
    character.shirtColor = shirtColor;
    character.ovveColor = ovveColor;

    createCharacter();
    localStorage.removeItem(character);
    localStorage.character = JSON.stringify(character);
    savedCharacter = JSON.parse(localStorage.character);

    console.log(character);
    console.log(savedCharacter);
})

function createCharacter() {
    characterName.innerText = character.name;
    hair.style.backgroundColor = character.hairColor;
    rightArm.style.backgroundColor = character.shirtColor;
    leftArm.style.backgroundColor = character.shirtColor;
    torso.style.backgroundColor = character.shirtColor;
    rightLeg.style.backgroundColor = character.ovveColor;
    leftLeg.style.backgroundColor = character.ovveColor;
}

createCharacter();
