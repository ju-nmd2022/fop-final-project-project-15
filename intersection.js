// DOM consts
const middlePathway = document.getElementById('middlePathway');
const verticalPathway1 = document.getElementById('verticalPathway1');
const verticalPathway2 = document.getElementById('verticalPathway2');
const horizontalPathway1 = document.getElementById('horizontalPathway1');
const horizontalPathway2 = document.getElementById('horizontalPathway2');

let topPosition = 38;
let leftPosition = 80;
const verticalPathwayPosition = verticalPathway1.getBoundingClientRect();
const horizontalPathwayPosition = horizontalPathway1.getBoundingClientRect();
const railingWidth = horizontalPathwayPosition.height/5;

// since the position of the other paths are placed in relation to the middlepath, it is important that it has loaded properly
function reloadOnZeroWidth() {
    if (middlePathway.getBoundingClientRect().height === 0) {
        // location.reload();
        middlePathway.style.height = '13vw';
    }
}
reloadOnZeroWidth();

// align the pathways so they stay connected regardless of screen size
function alignPaths() {
    const middlePathwayPosition = middlePathway.getBoundingClientRect();

    verticalPathway1.style.bottom = middlePathwayPosition.bottom + 'px';
    verticalPathway2.style.top = middlePathwayPosition.bottom + 'px';

    horizontalPathway1.style.right = middlePathwayPosition.right + 'px';
    horizontalPathway2.style.left = middlePathwayPosition.right + 'px';
}

// align the signs to be close to the pathway regardless of screen size
function alignSigns() {
    const akaSign = document.getElementById('akaSign');
    const schoolSign = document.getElementById('schoolSign');
    const bridgeSign = document.getElementById('bridgeSign');
    const homeSign = document.getElementById('homeSign');

    akaSign.style.top = window.innerHeight/2 - horizontalPathwayPosition.height - 30 + 'px';
    schoolSign.style.bottom = window.innerHeight/2 - horizontalPathwayPosition.height + 30 + 'px';
    bridgeSign.style.left = window.innerWidth/2 + verticalPathwayPosition.width/2 - 15 + 'px';
    homeSign.style.right = window.innerWidth/2 + verticalPathwayPosition.width/2 - 15 + 'px';
}

// check if the character can move up
function canMoveUp() {
    if (characterPosition.bottom > horizontalPathwayPosition.top + railingWidth) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move down 
function canMoveDown() {
    if (characterPosition.bottom < horizontalPathwayPosition.bottom - railingWidth) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move left
function canMoveLeft() {
    if (characterPosition.left > verticalPathwayPosition.left + railingWidth/2) {
        return true;
    }
    else {
        return false;
    }
}
// check if the character can move right
function canMoveRight() {
    if (characterPosition.right < verticalPathwayPosition.right - railingWidth/2) {
        return true;
    }
    else {
        return false;
    }
}

function checkForScreenChange() {
    // top: characterposition.top + characterposition.height/2
    if (characterPosition.top + characterPosition.height/2 < 0) {
        window.location.href = 'bridge.html';
    }
    // bottom: characterposition.bottom - characterposition.height/2
    if (characterPosition.bottom - characterPosition.height/2 > window.innerHeight) {
        window.location.href = 'home.html';
    }
    // left: characterposition.left + characterposition.width/2
    if (characterPosition.left + characterPosition.width/2 < 0) {
        alert('halla')
    }
    // right: characterposition.right - characterposition.width/2
    if (characterPosition.right - characterPosition.width/2 > window.innerWidth) {
        window.location.href = 'school.html';
    }
}

// on launch
alignPaths();
alignSigns();

