let apple;
let gap = 20;
let snake;
let pLoc = {};
let highest = 0;

let fps = 20;

// -- Snake --
let startLength = 1;
// -----------

// -- Game and App Size --s
let gameWidth = 40;
let gameHeight = 40;
let cellSize = 6;

let appWidth;
let appHeight;

let chartHeight = 80;
// -----------------------

// -- Grid of Games -- 
let gameCol = 4;
let gameRow = 2;
let padding = 2;
let games = [];
// -------------------

// -- Stats -- 
let generation = 0;
// -----------

// -- Colours --
let backgroundGameColour = '#FFFFFF';
let snakeColour  = '#000000';   // as the body gets longer,, the rgb values will increase by 10? 20?
let foodColour = '#41FF41';
let backgroundColour = '#C8C8C8';

// -- Canvas --
var cnv;
var button;
// ------------

// -- Controls --
var play = true;
var speed = fps;
var limit = -100;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);;
}

function setup() {
    frameRate(fps);
    appWidth = padding + padding*gameCol + gameCol*cellSize*gameWidth;
    appHeight = padding + padding*gameRow + gameRow*cellSize*gameHeight + 65 + chartHeight;

    cnv = createCanvas(appWidth, appHeight);
    centerCanvas();
    
    createGeneration();

}           

// Recentre canvas when window size updates
function windowResized() {
    centerCanvas();
}

function createGeneration() {
    generation += 1;

    for (var i = 0; i < gameCol; i++) {
        games[i] = [];
        for (var j = 0; j < gameRow; j++) {
            let x = padding+padding*i+i*cellSize*gameWidth;
            let y = padding+padding*j+j*cellSize*gameHeight;

            // for now create snake with default brain
            games[i][j] = new Game(x, y, gameWidth, gameHeight, cellSize, startLength);
            // can make customisable later
            games[i][j].backgroundColor = backgroundGameColour;
            games[i][j].snakeColor = snakeColour;
            games[i][j].foodColor = foodColour;
            games[i][j].startLength = startLength;
        }
    }

}

function draw() {
    background(backgroundColour);
    frameRate(speed);

    // Reset Button (Graphics)
    fill(backgroundColour);
    if ((mouseX > 10) && (mouseX < 70) && (mouseY > appHeight-34-chartHeight-20) && 
        (mouseY < appHeight-34-chartHeight+5) && (mouseIsPressed)) {
        fill(255);     
    }       
    stroke(0);
    rect(10, appHeight-34-chartHeight-20, 60, 25);

    // Pause Button (Graphics + Function)
    fill(backgroundColour);
    if ((mouseX > 70) && (mouseX < 130) && (mouseY > appHeight-34-chartHeight-20) && 
        (mouseY < appHeight-34-chartHeight+5) && (mouseIsPressed)) {
        fill(255);
        play = false;
    }
    stroke(0);
    rect(70, appHeight-34-chartHeight-20, 60, 25);

    // Play Button (Graphics + Function)
    fill(backgroundColour);
    if ((mouseX > 130) && (mouseX < 190) && (mouseY > appHeight-34-chartHeight-20) &&
        (mouseY < appHeight-34-chartHeight+5) && (mouseIsPressed)) {
        fill(255);
        play = true;
    }
    stroke(0);
    rect(130, appHeight-34-chartHeight-20, 60, 25);

    noStroke();
    fill('#000000');
    textFont('Ubuntu',21);
    text("Reset", 16, appHeight-34-chartHeight);
    text("Pause", 75, appHeight-34-chartHeight);
    text("Play", 142, appHeight-34-chartHeight);

    // Speed Adjustment
    fill('#282828');
    textFont('Ubuntu',21);
    text("Speed: ", 12, appHeight-chartHeight);

    fill('#282828');
    textFont('Ubuntu',21);
    text(speed, 100, appHeight-chartHeight);
    // Left Speed
    fill(backgroundColour);
    if ((mouseX > 75) && (mouseX < 90) && (mouseY > appHeight-chartHeight-15) && 
        (mouseY < appHeight-chartHeight) && (mouseIsPressed)) {
        fill(255);
    }
    stroke(0);
    rect(75, appHeight-chartHeight-15, 15, 15);
    strokeWeight(2);
    line(78, appHeight-chartHeight-7.5, 87, appHeight-chartHeight-7.5); 
    strokeWeight(1);
    // Right Speed
    fill(backgroundColour);
    if ((mouseX > 130) && (mouseX < 145) && (mouseY > appHeight-chartHeight-15) && 
        (mouseY < appHeight-chartHeight) && (mouseIsPressed)) {
        fill(255);
    }
    rect(130, appHeight-chartHeight-15, 15, 15);
    strokeWeight(2);
    line(133, appHeight-chartHeight-7.5, 142, appHeight-chartHeight-7.5); 
    line(137.7, appHeight-chartHeight-12, 137.7, appHeight-chartHeight-3); 
    strokeWeight(1);
    noStroke();

    // Score Limit Adjustment
    fill('#282828');
    textFont('Ubuntu',21);
    text("Score Limit: ", 12, appHeight-chartHeight+30);

    fill('#282828');
    textFont('Ubuntu',21);
    text(limit, 150, appHeight-chartHeight+30);

    // Left Score
    fill(backgroundColour);
    if ((mouseX > 125) && (mouseX < 140) && (mouseY > appHeight-chartHeight+16) && 
        (mouseY < appHeight-chartHeight+31) && (mouseIsPressed)) {
        fill(255);
    }
    stroke(0);
    rect(125, appHeight-chartHeight+16, 15, 15);
    strokeWeight(2);
    line(128, appHeight-chartHeight+23.5, 137, appHeight-chartHeight+23.5); 
    strokeWeight(1);
    // Right Score
    fill(backgroundColour);
    if ((mouseX > 200) && (mouseX < 215) && (mouseY > appHeight-chartHeight+16) && 
        (mouseY < appHeight-chartHeight+31) && (mouseIsPressed)) {
        fill(255);
    }
    stroke(0);
    rect(200, appHeight-chartHeight+16, 15, 15);
    strokeWeight(2);
    line(203, appHeight-chartHeight+23.5, 212, appHeight-chartHeight+23.5);
    line(207.7, appHeight-chartHeight+28, 207.7, appHeight-chartHeight+19); 
    strokeWeight(1);
    noStroke();

    fill('#ffffff');
    textFont('Ubuntu',21);
    text(speed, appWidth-90, appHeight-34-chartHeight);

    fill('#666666');
    textFont('Ubuntu',11);
    text('speed', appWidth-90, appHeight-18-chartHeight);


    // Update all
    for (var i = 0; i < gameCol; i++) {
        for (var j = 0; j < gameRow; j++) { 
            games[i][j].update(play, limit);
        }
    }
}

function keyPressed() {
    if (!playGame) {
        return;     
    }
    if (keyCode == LEFT_ARROW && games[0][0].direction.x != 1) {
        games[0][0].direction = createVector(-1,0);
    } else if (keyCode == RIGHT_ARROW && games[0][0].direction.x != -1) {
        games[0][0].direction = createVector(1,0);
    } else if (keyCode == UP_ARROW && games[0][0].direction.y != 1) {
        games[0][0].direction = createVector(0,-1);
    } else if (keyCode == DOWN_ARROW && games[0][0].direction.y != -1) {
        games[0][0].direction = createVector(0,1);
    }
}

function mouseClicked() {
    // RESET BUTTON
    if ((mouseX > 10) && (mouseX < 70) && (mouseY > appHeight-34-chartHeight-20) 
        && (mouseY < appHeight-34-chartHeight+5)) {
        createGeneration();   
    }
    // LEFT SPEED BUTTON
    if ((mouseX > 75) && (mouseX < 90) && (mouseY > appHeight-chartHeight-15) && 
        (mouseY < appHeight-chartHeight)) {
        minusSpeed();
    }
    // RIGHT SPEED BUTTON
    if ((mouseX > 130) && (mouseX < 145) && (mouseY > appHeight-chartHeight-15) && 
        (mouseY < appHeight-chartHeight)) {
        plusSpeed();
    }
    // LEFT SCORE 
    if ((mouseX > 125) && (mouseX < 140) && (mouseY > appHeight-chartHeight+16) && 
        (mouseY < appHeight-chartHeight+31)) {
        minusLimit();
    }
    // RIGHT SCORE
    if ((mouseX > 200) && (mouseX < 215) && (mouseY > appHeight-chartHeight+16) && 
        (mouseY < appHeight-chartHeight+31)) {
        plusLimit();
    }
}

function playGame() {
    playGame = !playGame;
}

// ---------------
// -  Modifiers  -
// ---------------
function minusSpeed() {
    if (speed > 5) {
        speed -= 5;
    }
}

function plusSpeed() {
    if (speed < 50) {
        speed += 5;
    }
}

function minusLimit() {
    if (limit > -300) {
        limit -= 20;
    }
}

function plusLimit() {
    if (limit < -100) {
        limit += 20;
    }
}