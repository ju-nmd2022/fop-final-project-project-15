import Character from "./character.js";

const chooseShirtColor = document.getElementById('chooseShirtColor');
const chooseOvveColor = document.getElementById('chooseOvveColor');
const characterScreen = document.getElementById('characterScreen');
const createdCharacter = document.getElementById('newCharacter');
const submitChangesButton = document.getElementById('submitChangesButton');

let shirtColor = "red";
let ovveColor = "yellow";
const character = new Character(shirtColor,ovveColor);

submitChangesButton.addEventListener('keypress', () => {
    if (event.key === 'Enter') {
        shirtColor = chooseShirtColor.value;
        chooseShirtColor.value = '';
        ovveColor = chooseOvveColor.value;
        chooseOvveColor.value = '';
    
        character.shirtColor = shirtColor;
        character.ovveColor = ovveColor;
        removeCharacter();
        createCharacter();
    } 
})

function removeCharacter() {
    // fix this
}

function createCharacter() {
    const newCharacter = document.createElement('div');
    newCharacter.classList.add('character-test');
    newCharacter.setAttribute('id','newCharacter');
    
    //head of character
    const newHead = document.createElement('div');
    newHead.classList.add('head');
    const newHair = document.createElement('div');
    newHair.classList.add('hair');
    const newEyes = document.createElement('div');
    newEyes.classList.add('eyes');
    const newRightEye = document.createElement('div'); // right/left shouldnt really need to be done
    newRightEye.classList.add('right-eye');
    const newLeftEye = document.createElement('div');
    newLeftEye.classList.add('left-eye');
    const newRightPupil = document.createElement('div');
    newRightPupil.classList.add('pupil');
    const newLeftPupil = document.createElement('div');
    newLeftPupil.classList.add('pupil');
    const newMouth = document.createElement('div');
    newMouth.classList.add('mouth');

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
    newRightEye.appendChild(newRightPupil);
    newLeftEye.appendChild(newLeftPupil);
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
