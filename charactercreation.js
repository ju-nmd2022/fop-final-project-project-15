import Character from "./character.js";

const chooseHairColor = document.getElementById('chooseHairColor');
const chooseShirtColor = document.getElementById('chooseShirtColor');
const chooseOvveColor = document.getElementById('chooseOvveColor');
const characterScreen = document.getElementById('characterScreen');
const submitChangesButton = document.getElementById('submitChangesButton');

const savedCharacter = JSON.parse(localStorage.character); 

let hairColor;
let shirtColor;
let ovveColor;

// import saved character, if one exists
if (savedCharacter.hairColor !== null) {
    hairColor = savedCharacter.hairColor;
}
else {
    hairColor = 'yellow';
}
if (savedCharacter.shirtColor !== null) {
    shirtColor = savedCharacter.shirtColor;
}
else {
    shirtColor = "red";
}
if (savedCharacter.ovveColor !== null) {
    ovveColor = savedCharacter.ovveColor;
}
else {
    ovveColor = "yellow";
}

// make the eyes follow the cursor 
document.addEventListener('mousemove', () => {
    const rotation = (event.pageY/window.innerHeight)*90;
    pupilAxisLeft.style.transform = 'rotate(-' + rotation + 'deg)';
    pupilAxisRight.style.transform = 'rotate(-' + rotation + 'deg)';
    leftEye.style.transform = 'rotate(-' + event.pageX/window.innerWidth*90 + 'deg)';
    rightEye.style.transform = 'rotate(-' + event.pageX/window.innerWidth*90 + 'deg)';
    
})

const character = new Character(shirtColor,ovveColor,hairColor);

submitChangesButton.addEventListener('click', () => {
    hairColor = chooseHairColor.value;
    shirtColor = chooseShirtColor.value;
    ovveColor = chooseOvveColor.value;
    
    character.hairColor = hairColor;
    character.shirtColor = shirtColor;
    character.ovveColor = ovveColor;
    removeCharacter();
    createCharacter();
    localStorage.removeItem(character);
    localStorage.character = JSON.stringify(character);
})

function removeCharacter() {
    const characterToRemove = characterScreen.lastChild;
    characterScreen.removeChild(characterToRemove);
}

function createCharacter() {
    const newCharacter = document.createElement('div');
    newCharacter.classList.add('character');
    newCharacter.setAttribute('id','newCharacter');
    
    //head of character
    const newHead = document.createElement('div');
    newHead.classList.add('head');
    const newHair = document.createElement('div');
    newHair.classList.add('hair');
    newHair.style.backgroundColor = character.hairColor;
    const newEyes = document.createElement('div');
    newEyes.classList.add('eyes');
    const newRightEye = document.createElement('div'); // right/left shouldnt really need to be done
    newRightEye.classList.add('right-eye');
    newRightEye.setAttribute('id','rightEye');
    const newLeftEye = document.createElement('div');
    newLeftEye.classList.add('left-eye');
    newLeftEye.setAttribute('id','leftEye');
    const newRightPupil = document.createElement('div');
    newRightPupil.classList.add('pupil');
    const newLeftPupil = document.createElement('div');
    newLeftPupil.classList.add('pupil');
    const newMouth = document.createElement('div');
    newMouth.classList.add('mouth');
    
    const pupilAxisRight = document.createElement('div');
    pupilAxisRight.classList.add('pupil-axis');
    pupilAxisRight.setAttribute('id','pupilAxisRight');
    const pupilAxisLeft = document.createElement('div');
    pupilAxisLeft.classList.add('pupil-axis');
    pupilAxisLeft.setAttribute('id','pupilAxisLeft');

    //body of character
    const newBody = document.createElement('div');
    newBody.classList.add('body');
    const newTorso = document.createElement('div');
    newTorso.classList.add('torso');
    newTorso.style.backgroundColor = character.shirtColor;
    const newRightArm = document.createElement('div');
    newRightArm.classList.add('right-arm');
    newRightArm.style.backgroundColor = character.shirtColor;
    const newLeftArm = document.createElement('div');
    newLeftArm.classList.add('left-arm');
    newLeftArm.style.backgroundColor = character.shirtColor;

    // legs of character
    const newLegs = document.createElement('div');
    newLegs.classList.add('legs');
    const newLeftLeg = document.createElement('div');
    newLeftLeg.classList.add('left-leg');
    newLeftLeg.style.backgroundColor = character.ovveColor;
    const newRightLeg = document.createElement('div');
    newRightLeg.classList.add('right-leg');
    newRightLeg.style.backgroundColor = character.ovveColor;

    // assembling
    //the head
    pupilAxisRight.appendChild(newRightPupil);
    pupilAxisLeft.appendChild(newLeftPupil);
    newRightEye.appendChild(pupilAxisRight);
    newLeftEye.appendChild(pupilAxisLeft);

    // newRightEye.appendChild(newRightPupil);
    // newLeftEye.appendChild(newLeftPupil);
    newEyes.appendChild(newRightEye);
    newEyes.appendChild(newLeftEye);
    newHead.appendChild(newHair);
    newHead.appendChild(newEyes);
    newHead.appendChild(newMouth);

    //the body 
    newBody.appendChild(newRightArm);
    newBody.appendChild(newTorso);
    newBody.appendChild(newLeftArm);

    //the legs
    newLegs.appendChild(newRightLeg);
    newLegs.appendChild(newLeftLeg);

    //the full body
    newCharacter.appendChild(newHead);
    newCharacter.appendChild(newBody);
    newCharacter.appendChild(newLegs);

    characterScreen.appendChild(newCharacter);
}

createCharacter();
