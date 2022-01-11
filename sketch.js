let apple;
let gap = 20;
let snake;
let pLoc = {};
let highest = 0;

function setup() {
    createCanvas(300, 300);
    apple = new Fruit();
    snake = new Head();
    frameRate(10);
}

function draw() {
    background(250, 250, 250);

    // Grid
    noFill();
    strokeWeight(1);
    stroke(220, 220, 220);
    for (var i = 0; i < height; i += gap) {
        for (var j = 0; j < width; j += gap) {
            rect(j, i, gap, gap);
        }
    }

    apple.show();

    // Outline
    noFill();
    strokeWeight(4);
    stroke(0,0,0);
    rect(0, 0, 300, 300); 

    for (var i = snake.tails.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake.tails[i].x = snake.x;
            snake.tails[i].y = snake.y;
        }
        else {
            snake.tails[i].x = snake.tails[i-1].x;
            snake.tails[i].y = snake.tails[i-1].y;
        }
        snake.tails[i].show();
    }

    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    // Teleport to opposite side
    if (snake.border()) {
        snake.new();
    }

    // Eat apple
    if (snake.collision(apple)) {
        snake.score++;
        apple.eat();
        snake.tails.push(new Tail(pLoc.x, pLoc.y));
    }

    // Move into tail
    if (snake.crash()) {
        snake.reset();
        apple.eat();
    }

    if (snake.score > highest) { highest = snake.score; }

    

    text("Scores: " + int(snake.score));

    snake.show();

    
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && snake.dir != 'right') {
        snake.dir = 'left';
    } else if (keyCode == RIGHT_ARROW && snake.dir != 'left') {
        snake.dir = 'right';
    } else if (keyCode == UP_ARROW && snake.dir != 'down') {
        snake.dir = 'up';
    } else if (keyCode == DOWN_ARROW && snake.dir != 'up') {
        snake.dir = 'down';
    }
}