
const backdrop = document.getElementById('backdrop');

const characterInfo = JSON.parse(localStorage.character);

function spawnCharacter() {
    const newCharacter = document.createElement('div');
    newCharacter.classList.add('character');
    newCharacter.setAttribute('id','character');
    
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
    newTorso.style.backgroundColor = characterInfo.shirtColor;
    const newRightArm = document.createElement('div');
    newRightArm.classList.add('right-arm');
    newRightArm.setAttribute('id','rightArm')
    newRightArm.style.backgroundColor = characterInfo.shirtColor;
    const newLeftArm = document.createElement('div');
    newLeftArm.classList.add('left-arm');
    newLeftArm.setAttribute('id','leftArm')
    newLeftArm.style.backgroundColor = characterInfo.shirtColor;

    // legs of character
    const newLegs = document.createElement('div');
    newLegs.classList.add('legs');
    const newLeftLeg = document.createElement('div');
    newLeftLeg.classList.add('left-leg');
    newLeftLeg.style.backgroundColor = characterInfo.ovveColor;
    const newRightLeg = document.createElement('div');
    newRightLeg.classList.add('right-leg');
    newRightLeg.style.backgroundColor = characterInfo.ovveColor;

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

    backdrop.appendChild(newCharacter);
}

let armsAnimationState = false;

let topPosition = 0;
let leftPosition = 0;

function animateArms() {
    if (armsAnimationState === false) {
        document.getElementById('rightArm').style.transform = 'rotate(20deg)'
        document.getElementById('leftArm').style.transform = 'rotate(-20deg)'
        armsAnimationState = true;
    }
    else {
        document.getElementById('rightArm').style.transform = 'rotate(0deg)'
        document.getElementById('leftArm').style.transform = 'rotate(0deg)'
        armsAnimationState = false;
    }
}

function updateCharacterPosition() {
    character.style.top = topPosition + 'vh';
    character.style.left = leftPosition + 'vw';
}

function moveUp() {
    if (topPosition !== 0) {
        topPosition -= 1;
    }
    updateCharacterPosition();
}
function moveDown() {
    topPosition += 1;
    updateCharacterPosition();
}

function moveRight() {
    leftPosition += 1;
    updateCharacterPosition();
}
function moveLeft() {
    if (leftPosition !== 0) {
        leftPosition -= 1;
    }
    updateCharacterPosition();
}

document.addEventListener('keydown', () => {
    if (event.key === 'ArrowUp' || event.key === 'w') {
        moveUp();
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        moveDown();
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRight();
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveLeft();
    }
    animateArms();
})

spawnCharacter();