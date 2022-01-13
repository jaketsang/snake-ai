class Game {
    constructor(x, y, width, height, cellSize, length) {
        
        // Game Position and Size
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;

        // Snake
        this.startLength = length;
        this.snakeLength = this.startLength;  
        this.alive = true;    
        this.tails = [];    
        
        // Map
        this.map = [];
        this.emptyID = 0;
        this.snakeID = 1;
        this.foodID = 2;
        this.tempID = 3;
        this.snakeX = 0;
        this.snakeY = 0;
        this.foodX = 0;
        this.foodY = 0;
        this.direction;

        // Style
        this.backgroundColour = '#232323';
        this.snakeColour = '#00AA00';
        this.foodColour = '#0055AA';
        this.deadSnakeColour = '#003400';

        // Initialise Map
        this.initMap();

        // Scoring
        this.score = 0;
        this.rewardFood = 50;
        this.rewardDead = -20;
        this.rewardCloser = 1;
        this.rewardAway = -2;

        // Snake brain
        //this.brain = new NeuralNetwork(12, 2, 4);   

    }

    // Create empty map
    initMap() {
        this.direction = createVector(0, -1);

        for (let i = 0; i < this.width; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.height; j++) {
                this.map[i][j] = this.emptyID;
            }
        }
        this.createSnake(this.startLength);
        this.spawnFood();
    }

    // Create snake
    createSnake(length) {
        this.snakeX = floor(random(0, this.width));
        this.snakeY = floor(random(0, this.height));

        // Make sure entire snake is visible
        while (this.snakeX - length < 0) {
            this.snakeX = floor(random(0, this.width));
            this.snakeY = floor(random(0, this.height));
        }

        // Set snake position on map
        for (let i = 0; i < length; i++) {
            this.map[this.snakeX - i][this.snakeY] = this.snakeID;
        }
    }

    // Spawn Food
    spawnFood() {
        this.foodX = floor(random(0, this.width));
        this.foodY = floor(random(0, this.height));

        // If food on snake, spawn again
        while (this.map[this.foodX][this.foodY] !== this.emptyID) {
            this.foodX = floor(random(0, this.width));
            this.foodY = floor(random(0, this.height));
        }

        // Set food position on map
        this.map[this.foodX][this.foodY] = this.foodID;
    }
    
    // Move snake
    moveSnake(xDir, yDir) {
        // new position
        let newX = this.snakeX + xDir;
        let newY = this.snakeY + yDir;
        

        // Check out-of-bounds
        if (newX >= this.width || newY >= this.height || newX < 0 || newY < 0) {
            this.alive = false;
            this.score += this.rewardDead;
            this.snakeColour = this.deadSnakeColour;
            return; 
        }
         

        // If on food
        if (this.map[newX][newY] == this.foodID) {
            this.tails.push(new Tail(this.snakeX, this.snakeY));
            this.moveBody();
            // this.map[this.snakeX][this.snakeY] = this.snakeID;
            this.snakeX = newX;
            this.snakeY = newY;
            this.map[newX][newY] = this.snakeID;                    
            this.spawnFood();
            this.snakeLength++;
            this.score += this.rewardFood;
            
            return;
        }

        // // If hit body
        for (let i = 0; i < this.tails.length; i++) {
            if (this.tails[i].x == newX && this.tails[i].y == newY) {
                this.alive = false;
                this.score += this.rewardDead;
                return;
            }
        }
        
        this.moveBody();    
        //this.map[this.snakeX][this.snakeY] = this.emptyID;
        
        this.snakeX += xDir;
        this.snakeY += yDir;

        this.map[this.snakeX][this.snakeY] = this.snakeID;

        let distOld = Math.abs(this.snakeX - this.foodX) + Math.abs(this.snakeY - this.foodY);
        let distNew = Math.abs(this.newX - this.foodX) + Math.abs(this.newY - this.foodY);

        if (distNew < distOld) {
            this.score += this.rewardCloser;
        } else {
            this.score += this.rewardAway;
        }
    }

    // move body
    moveBody() {
        // if (this.tails.length == 0) {
        //     this.map[this.snakeX][this.snakeY] = this.emptyID;
        //     return;
        // }
        this.map[this.snakeX][this.snakeY] = this.emptyID;
        // if (this.tails.length > 0) {
        //     let s = this.tails[this.tails.length-1];
        //     this.map[s.x][s.y] = this.emptyID;  
        // }

        for (var i = this.tails.length - 1; i >= 0; i--) {
            if (i == 0) {
                this.tails[i].x = this.snakeX;
                this.tails[i].y = this.snakeY;
            }
            else {
                this.tails[i].x = this.tails[i-1].x;
                this.tails[i].y = this.tails[i-1].y;
            }
        }
        //this.map[this.snakeX][this.snakeY] = this.emptyID;  
    }

    // Draw
    drawMap() {
        noStroke();
        fill(0, 0, 0);
        rect(this.x, this.y, this.width * this.cellSize, this.height * this.cellSize);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.map[i][j] == this.snakeID) {
                    fill(255, 255, 255);
                } else if (this.map[i][j] == this.foodID) {
                    fill(51, 255, 51);
                }
                if (this.map[i][j] !== this.emptyID) {
                    rect(this.x + i * this.cellSize, this.y + j * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }

        // body
        for (let i = 0; i < this.tails.length; i++) {
            fill(255,255,255);
            rect(this.x + this.tails[i].x * this.cellSize, this.y + this.tails[i].y * this.cellSize, this.cellSize, this.cellSize);
        }
    }

    // Update
    update(play, limit) {
        this.drawMap();

        if (this.score < limit && play){
            this.alive = false;
            this.snakeColor = this.deadSnakeColor;
        }
        // text colour
        fill('#FF66B2');
    
        if (this.alive && play) {
            fill('#aaaaaa');
            this.moveSnake(this.direction.x, this.direction.y);
            //this.think();
        }
    
        textFont('Ubuntu', 12);
        text(this.score, this.x + 4, this.y + 8);
    
    }
}