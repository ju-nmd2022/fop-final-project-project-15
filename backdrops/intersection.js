
//copy over these two lines to the script.js document (export doesn't work for some reason)
const unitY = window.innerHeight/100;
const pathwayWidth = unitY*25; 

// the following 6 lines of code were taken from https://www.youtube.com/watch?v=OIfEHD3KqCg
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
    translate(0,-pathwayWidth/2);
    rect(x,y,(window.innerWidth/2)-pathwayWidth/2,pathwayWidth);
    fill(200,60,40);
    rect(x,y,(window.innerWidth/2)-pathwayWidth/2,pathwayWidth/15);
    rect(x,y+pathwayWidth-pathwayWidth/15,(window.innerWidth/2)-pathwayWidth/2,pathwayWidth/15);
    pop();
}
function verticalPathway(x,y) {
    push();
    fill(120,120,120);
    translate(-pathwayWidth/2,0);
    rect(x,y,pathwayWidth,window.innerHeight/2-pathwayWidth/2);
    fill(200,60,40);
    rect(x,y,pathwayWidth/15,window.innerHeight/2-pathwayWidth/2);
    rect(x+pathwayWidth-pathwayWidth/15,y,pathwayWidth/15,window.innerHeight/2-pathwayWidth/2);
    pop();
}
function centerPiece() {
    push();
    fill(120,120,120);
    translate(-pathwayWidth/2,-pathwayWidth/2);
    rect(window.innerWidth/2,window.innerHeight/2,pathwayWidth,pathwayWidth)
    fill(200,60,40);
    rect(window.innerWidth/2,window.innerHeight/2,pathwayWidth/15,pathwayWidth/15)
    rect(window.innerWidth/2+pathwayWidth-pathwayWidth/15,window.innerHeight/2,pathwayWidth/15,pathwayWidth/15)
    rect(window.innerWidth/2,window.innerHeight/2+pathwayWidth-pathwayWidth/15,pathwayWidth/15,pathwayWidth/15)
    rect(window.innerWidth/2+pathwayWidth-pathwayWidth/15,window.innerHeight/2+pathwayWidth-pathwayWidth/15,pathwayWidth/15,pathwayWidth/15)
    rect()
    pop();
}

function draw() {
    backdrop();
    // horizontalPathway(0,window.innerHeight/2);
    // horizontalPathway((window.innerWidth/2)+pathwayWidth/2,window.innerHeight/2);
    // verticalPathway(window.innerWidth/2,0);
    // verticalPathway(window.innerWidth/2,window.innerHeight/2+pathwayWidth/2);
    // centerPiece();
}