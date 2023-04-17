// the following 7 lines of code were taken from https://www.youtube.com/watch?v=OIfEHD3KqCg
let canvas;

function setup() {
    canvas = createCanvas(window.innerWidth,window.innerHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1')
    frameRate(30);

}
function windowResized() {
    resizeCanvas(window.innerWidth,window.innerHeight);
}

function backdrop() {
    push();
    fill(110,200,80); //the grass
    rect(0,0,window.innerWidth,window.innerHeight);
    pop();
}

function horizontalPathway(x,y) {
    push();
    fill(120,120,120);
    translate(0,-125);
    rect(x,y,(window.innerWidth/2)-125,250);
    fill(200,60,40);
    rect(x,y,(window.innerWidth/2)-125,10);
    rect(x,y+240,(window.innerWidth/2)-125,10);
    pop();
}
function verticalPathway(x,y) {
    push();
    fill(120,120,120);
    translate(-125,0);
    rect(x,y,250,window.innerHeight/2-125);
    fill(200,60,40);
    rect(x,y,10,window.innerHeight/2-125);
    rect(x+240,y,10,window.innerHeight/2-125);
    pop();
}
function centerPiece() {
    push();
    fill(120,120,120);
    translate(-125,-125);
    rect(window.innerWidth/2,window.innerHeight/2,250,250)
    fill(200,60,40);
    rect(window.innerWidth/2,window.innerHeight/2,10,10)
    rect(window.innerWidth/2+240,window.innerHeight/2,10,10)
    rect(window.innerWidth/2,window.innerHeight/2+240,10,10)
    rect(window.innerWidth/2+240,window.innerHeight/2+240,10,10)
    rect()
    pop();
}

function draw() {
    backdrop();
    horizontalPathway(0,window.innerHeight/2);
    horizontalPathway((window.innerWidth/2)+125,window.innerHeight/2);
    verticalPathway(window.innerWidth/2,0);
    verticalPathway(window.innerWidth/2,window.innerHeight/2+125);
    centerPiece();
}