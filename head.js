class Head {
    constructor() {
        this.x = floor(width/(2 * gap)) * gap;
        this.y = floor(height/(2 * gap)) * gap;
        this.dir = 'up';
        this.score = 0;
        this.tails = [];
    }

    update() {
        if (this.dir == 'left') {
            this.x -= gap;
        } else if (this.dir == 'right') {
            this.x += gap;
        } else if (this.dir == 'up') {
            this.y -= gap;
        } else if (this.dir == 'down') {
            this.y += gap;
        }
    }

    reset() {
        this.x = floor(width/(2 * gap)) * gap;
        this.y = floor(height/(2 * gap)) * gap;
        this.dir = 'up';
        this.score = 0;
        this.tails = [];
    }

    collision(obj) {
        if (this.x == obj.x && this.y == obj.y) {
            return true;
        }
        return false;
    }

    border() {
        if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0) {
            return true;
        }
    }

    new() {
        if (this.x >= width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width;
        }

        if (this.y >= height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = height;
        }
    }

    crash() {
        for (var i = 0; i < this.tails.length; i++) {
            if (this.x == this.tails[i].x && this.y === this.tails[i].y) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill(0, 0, 0);
        stroke(0, 0, 0);
        rect(this.x, this.y, gap, gap);
        // if (this.dir == 'left') {
        //     rect(this.x, this.y, gap, gap, 20, 5, 5, 20); 
        // } else if (this.dir == 'right') {
        //     rect(this.x, this.y, gap, gap, 5, 20, 20, 5); 
        // } else if (this.dir == 'up') {
        //     rect(this.x, this.y, gap, gap, 20, 20, 5, 5); 
        // } else if (this.dir == 'down') {
        //     rect(this.x, this.y, gap, gap, 5, 5, 20, 20); 
        // }
        
    }
}