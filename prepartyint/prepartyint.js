// |--------|  |--------|
// |        |  |
// |--------|  |--------
// |                    |
// |            --------

function setup() { 
    const canvas = createCanvas(windowWidth,windowHeight); //create a canvas the width and height of the window
    canvas.parent('screenContainer');
    canvas.style('display','block'); //display the canvas as block
    canvas.style('position','absolute'); //display the canvas as block
    canvas.style('top','0'); //display the canvas as block
    frameRate(30); //set fps to 30
    angleMode(DEGREES);
}

function windowResized() { //when window is resized...
    resizeCanvas(windowWidth,windowHeight); //...resize the canvas to fit the new size
} 

const redCupXs = [window.innerWidth/2-71,window.innerWidth/2,window.innerWidth/2+71,window.innerWidth/2-35.5,window.innerWidth/2+35.5,window.innerWidth/2];
const redCupYs = [window.innerHeight/2-175,window.innerHeight/2-175,window.innerHeight/2-175,window.innerHeight/2-140,window.innerHeight/2-140,window.innerHeight/2-105];
let ballX = window.innerWidth/2;
let ballY = window.innerHeight-100;
let ballRotation = 0;
let ballDirection = false;
let ballLaunced = false;
let ballRotatorVisible = true;
let cupsHit = 0;
let rotationInterval = setInterval(rotateBall,20);


function displayFirstPopup() {
    const firstPopup = new Popup('Beer Pong! My favorite','Start','/area1.html');
    firstPopup.createPopup();
}

function importCharacterColors() {
    const arm = document.querySelector('.arm');
    const hair = document.querySelector('.hair');
    const characterInfo = JSON.parse(localStorage.character);
    arm.style.backgroundColor = characterInfo.shirtColor;
    hair.style.backgroundColor = characterInfo.hairColor;
}

function pingPongTable() {
    push();
    translate(-125,-200);
    fill(66, 99, 49);
    rect(window.innerWidth/2,window.innerHeight/2+15,250,400);
    fill(105, 156, 78);
    rect(window.innerWidth/2,window.innerHeight/2,250,400);
    stroke(255,255,255);
    line(window.innerWidth/2+10,window.innerHeight/2+390,window.innerWidth/2+10,window.innerHeight/2+10);
    line(window.innerWidth/2+240,window.innerHeight/2+390,window.innerWidth/2+240,window.innerHeight/2+10);
    pop(); 
}
function redCup(x,y) {
    push();
    fill(255,0,0); 
    rect(x-12.5,y-5,25,35);
    fill(0,0,0);
    ellipse(x,y,25,25);
    pop();
}

function pingPongBall(ballX,ballY) { 
    push();
    fill(255,255,255);
    ellipse(ballX,ballY,20);
    pop();
}
function aim() {

}

function displayRotation(ballRotation) {
    if (ballRotatorVisible) {
        push();
        translate(ballX,ballY);
        rotate(ballRotation);
        fill(255,230,230);
        triangle(-10.5,-90,0,-10,10.5,-90); 
        pop();  
    }
}

function resetBallPosition() {
    clearInterval(ballInterval);
    rotationInterval = setInterval(rotateBall,20);
    ballLaunced = false;
    ballX = window.innerWidth/2;
    ballY = window.innerHeight-100;
    ballRotatorVisible = true;
}

let ballInterval;
function shootBall(ballRotation) {
    if (!ballLaunced) {
        ballLaunced = true;
        ballRotatorVisible = false;
        ballInterval = setInterval(() => {
        if (ballY > 100) {
            // following two lines taken from https://stackoverflow.com/questions/19355026/move-an-object-in-the-direction-its-facing-using-2d-html5canvas-and-ctx-rotate-f
            ballY -= 1 * Math.cos(ballRotation * Math.PI / 180);
            ballX += Math.sin(ballRotation * Math.PI / 180);
            testForHit();
        } else {
            resetBallPosition();
        }
        }, 1); 
    }
}   
 
function rotateLeft() {
    ballRotation -= 0.5;     
}   
function rotateRight() {
    ballRotation += 0.5;   
}
function rotateBall() {
    if (ballDirection) {
        rotateRight();
        if (ballRotation > 15) {
            ballDirection = false;
        }
    } else {
        rotateLeft();
        if (ballRotation < -15) {
            ballDirection = true;
        }
    }
}

function testForHit() {
    for (let index in redCupXs) {
        if (ballX > redCupXs[index] && ballX < redCupXs[index] + 25 && ballY > redCupYs[index] && ballY < redCupYs[index] + 25) {
            cupsHit ++;
            redCupXs[index] = 40 * cupsHit;
            redCupYs[index] = 110;
            resetBallPosition();
            testForWin();
        }  
    }
}

function draw() {
    background(156, 145, 98);
    pingPongTable();
    for (let index in redCupXs) {
        redCup(redCupXs[index],redCupYs[index]);
    }  
    pingPongBall(ballX,ballY);
    if (!gameIsPaused) {
    displayRotation(ballRotation);
        if (keyIsDown(32)) { //space bar
            clearInterval(rotationInterval);
            shootBall(ballRotation);
        } 
    }
}

function testForWin() {
    if (cupsHit === 6) {
        const winPopup = new Popup('Score! I/m totally in a party mode now!','','/area1.html');
        winPopup.createPopup();
        localStorage.prepartyTaskCompleted = 'true';
    }
}
function removePopupHandler() {
    unpauseGame();
}

// on launch
importCharacterColors();
displayFirstPopup();