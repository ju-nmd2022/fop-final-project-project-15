// every document that uses the standard character should use this document

const hair = document.getElementById('hair');
const rightArm = document.getElementById('rightArm');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightLeg = document.getElementById('rightLeg');
const leftLeg = document.getElementById('leftLeg');
const ovve = document.querySelector('.ovve');
const playerOvve = document.getElementById('playerOvve');
const legs = document.querySelector('.legs');
const characterOnScreen = document.getElementById('character');
const bag = document.querySelector('.bag');
const backdrop = document.querySelector('.backdrop');

// get the saved character info
const characterInfo = JSON.parse(localStorage.character);

let walkingDistance = 1.5;
let armsAnimationState = false;
let characterPosition = characterOnScreen.getBoundingClientRect();

let bagAnimationActive = false;
let bagRotation = 0;
let bagRotationDirection = false;

const boundaries = Array.from(document.querySelectorAll('.boundary'));
const pathways = Array.from(document.querySelectorAll('.door'));

function checkForEquippedPatches() {
    // current patches: winner patch, speedfreak patch, westcoast patch, hitech patch, lok patch, halsosektionen patch, jsa patch, qult patch
    const equippedPatches = JSON.parse(localStorage.equippedPatches);
    const winnerPatch = document.querySelector('.winner-patch');
    const speedfreakPatch = document.querySelector('.speedfreak-patch');
    const westcoastPatch = document.querySelector('.westcoast-patch');
    const hitechPatch = document.querySelector('.hitech-patch');
    const lokPatch = document.querySelector('.lok-patch');
    const halsosektionenPatch = document.querySelector('.halsosektionen-patch');
    const jsaPatch = document.querySelector('.jsa-patch');
    const qultPatch = document.querySelector('.qult-patch');
    for (let index in equippedPatches) {
        switch (equippedPatches[index]) {
            case 'winnerPatch':
                winnerPatch.style.display = 'block';
                break;
            case 'speedfreakPatch':
                speedfreakPatch.style.display = 'block';
                break;
            case 'westcoastPatch':
                westcoastPatch.style.display = 'block';
                break;
            case 'hitechPatch':
                hitechPatch.style.display = 'block';
                break;
            case 'lokPatch':
                lokPatch.style.display = 'block';
                break;
            case 'halsosektionenPatch':
                halsosektionenPatch.style.display = 'block';
                break;
            case 'jsaPatch':
                jsaPatch.style.display = 'block';
                break;
            case 'qultPatch':
                qultPatch.style.display = 'block';
                break;
        } 
    }
}

function showOrHideBag() {
    if (localStorage.alcoholTaskCompleted === 'true') {
        bag.style.display = 'block'
    } else {
        bag.style.display = 'none'
    }
}

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

function updateBackdropPosition() {
    backdrop.style.top = topPosition + 'rem';
    backdrop.style.right = leftPosition + 'rem';
    characterPosition = characterOnScreen.getBoundingClientRect();
}

function isOvveOn() {
    if (localStorage.ovveTaskCompleted === 'true') {
        legs.style.display = 'none';
        ovve.style.display = 'flex';
    } else {
        legs.style.display = 'flex';
        ovve.style.display = 'none';
    }
}

function generateSavedCharacter() {
    characterOnScreen.style.position = 'absolute';
    updateBackdropPosition();

    hair.style.backgroundColor = characterInfo.hairColor;
    rightArm.style.backgroundColor = characterInfo.shirtColor;
    leftArm.style.backgroundColor = characterInfo.shirtColor;
    torso.style.backgroundColor = characterInfo.shirtColor;
    rightLeg.style.backgroundColor = characterInfo.pantsColor;
    leftLeg.style.backgroundColor = characterInfo.pantsColor;
    playerOvve.setAttribute('src',`glyphs/ovve/${characterInfo.ovveColor}`);

    isOvveOn();
}

function bagAnimation() {
    if (!bagAnimationActive) {
        let numbersOfRotations = 0;
        bagAnimationActive = true;
        let bagInterval = setInterval(() => {
            if (bagRotationDirection) {
                bagRotation += 10;
                if (bagRotation > 0 && numbersOfRotations === 2) {
                    clearInterval(bagInterval);
                    bagAnimationActive = false;
                }
            } else {
                bagRotation -= 10;
                if (bagRotation < 0 && numbersOfRotations === 2) {
                    clearInterval(bagInterval);
                    bagAnimationActive = false;
                }
            }
            if (bagRotation > 45) {
                if (numbersOfRotations < 2) {
                    numbersOfRotations++;
                    bagRotationDirection = false;
                }
            }
            if (bagRotation < -45) {
                if (numbersOfRotations < 2) {
                    numbersOfRotations++;
                    bagRotationDirection = true;
                }
                
            }
            
            bag.style.transform = `rotate(${bagRotation}deg)`;
        }, 50);
    }
}

function boundaryDetected(direction) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        const boundaryPosition = boundary.getBoundingClientRect();
    
        if (direction === 'up') {
          if (characterPosition.top < boundaryPosition.y + boundaryPosition.height + 40 &&
              characterPosition.bottom > boundaryPosition.y &&
              characterPosition.left > boundaryPosition.x &&
              characterPosition.right < boundaryPosition.x + boundaryPosition.width) {
            return true;
          }
        } else if (direction === 'down') {
          if (characterPosition.bottom > boundaryPosition.y - 40 &&
              characterPosition.top < boundaryPosition.y + boundaryPosition.height &&
              characterPosition.left > boundaryPosition.x &&
              characterPosition.right < boundaryPosition.x + boundaryPosition.width) {
            return true;
          }
        } else if (direction === 'left') {
          if (characterPosition.left < boundaryPosition.x + boundaryPosition.width + 40 &&
              characterPosition.right > boundaryPosition.x &&
              characterPosition.bottom > boundaryPosition.y &&
              characterPosition.top < boundaryPosition.y + boundaryPosition.height) {
            return true;
          }
        } else if (direction === 'right') {
          if (characterPosition.right > boundaryPosition.x - 40 &&
              characterPosition.left < boundaryPosition.x + boundaryPosition.width && 
              characterPosition.bottom > boundaryPosition.y &&
              characterPosition.top < boundaryPosition.y + boundaryPosition.height) {
            return true;
          }
        }
      }
    
      return false;
}

function detectPathway(direction) {
    for (let i = 0; i < pathways.length; i++) {
        const pathway = pathways[i];
        const pathwayPosition = pathway.getBoundingClientRect();

        const goToDestination = () => {
            switch (pathway.id) {
                case 'frejsDoor':
                    if (localStorage.prepartyTaskCompleted === 'true') {break;}
                    if (localStorage.ovveTaskCompleted === 'false' || localStorage.alcoholTaskCompleted === 'false') {displayErrorPopup(); break;}
                    window.location.href = 'prepartyint.html';
                    break;
                case 'playerDoor':
                    if (localStorage.ovveTaskCompleted !== 'true') {
                        const ovveTaskCompletedPopup = new TaskCompletion('Get your ovve','glyphs/taskicons/ovvetask.png');
                        ovveTaskCompletedPopup.createTaskCompletionPopup();
                        localStorage.ovveTaskCompleted = 'true';
                        upgradeTaskColors();
                        updateOvveInWindow();
                        isOvveOn();
                    }
                    break;
                case 'bridgeTunnel':
                    window.location.href = 'bridge.html';
                    break;
                case 'akaTunnel':
                    window.location.href = 'akaroad.html';
                    break;
                case 'systemetDoor':
                    if (localStorage.alcoholTaskCompleted !== 'true') {
                        window.location.href = 'systemetint.html'
                    }
                    break;
                case 'alcamoDoor':
                    if (localStorage.kebabTaskCompleted !== 'true') {
                        const kebabTaskCompletion = new TaskCompletion('Eat a kebab','glyphs/taskicons/kebabtask.png');
                        kebabTaskCompletion.createTaskCompletionPopup();
                        localStorage.kebabTaskCompleted = 'true';
                        upgradeTaskColors();
                    }
                    break;
                case 'oldManDetector':
                    makeOldManSpeak();
                    break;
                case 'akaDoor':
                    testForWin();
                    break;
                case 'westcoastTrigger':
                    const unlockedPatches = JSON.parse(localStorage.unlockedPatches);
                    if (!unlockedPatches.includes('westcoastPatch')) {
                        westcoastAnimation();
                    }
            }
        }    

        if (direction === 'up') {
            if (characterPosition.top > pathwayPosition.y &&
                characterPosition.top < pathwayPosition.y + pathwayPosition.height &&
                characterPosition.left > pathwayPosition.x &&
                characterPosition.left < pathwayPosition.x + pathwayPosition.width) {  
                    goToDestination();
                }
        } else if (direction === 'down') {
            if (characterPosition.bottom > pathwayPosition.y &&
                characterPosition.bottom < pathwayPosition.y + pathwayPosition.height &&
                characterPosition.left > pathwayPosition.x &&
                characterPosition.left < pathwayPosition.x + pathwayPosition.width) {  
                    goToDestination();
                }
        } else if (direction === 'left') {
            if (characterPosition.left > pathwayPosition.x &&
                characterPosition.left < pathwayPosition.x + pathwayPosition.width &&
                characterPosition.top > pathwayPosition.y &&
                characterPosition.top < pathwayPosition.y + pathwayPosition.height) {  
                    goToDestination();
                }
        } else if (direction === 'right') {
            if (characterPosition.right > pathwayPosition.x &&
                characterPosition.right < pathwayPosition.x + pathwayPosition.width &&
                characterPosition.top > pathwayPosition.y &&
                characterPosition.top < pathwayPosition.y + pathwayPosition.height) { 
                    goToDestination(); 
                }
        } 
        
}
}

function moveUp() {
    if (!boundaryDetected('up')) {
        topPosition += walkingDistance;
        detectPathway('up');
    }
}
function moveDown() {
    if (!boundaryDetected('down')) {
        topPosition -= walkingDistance;
        detectPathway('down');
    }
}
function moveLeft() {
    if (!boundaryDetected('left')) {
        leftPosition -= walkingDistance;
        detectPathway('left');
    }
}
function moveRight() {
    if (!boundaryDetected('right')) {
        leftPosition += walkingDistance;
        detectPathway('right');
    }
}

// raise the sprintMultiplier on shift press
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Shift') {
//         sprintMultiplier = 1.5;
//     }
// })
// revert the sprintMultiplier to starting value on shift release
// document.addEventListener('keyup', (e) => {
//     if (e.key === 'Shift') {
//         sprintMultiplier = 1;
//     }
// })

document.addEventListener('keydown', (e) => {
    if (!gameIsPaused) {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        moveUp();
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        moveDown();
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    }
    animateArms();
    bagAnimation();
    updateBackdropPosition();
    }
})

showOrHideBag();
generateSavedCharacter();
checkForEquippedPatches();