class Fruit {
    constructor() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;
    }

    eat() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;
        // while (this.invalid() == true) {
        //     this.x = floor(random(0, width) / gap) * gap;
        //     this.y = floor(random(0, height) / gap) * gap;
        // }
    }

    invalid() {
        if (this.x == snake.x || this.y == snake.y) {
            return true;
        }
        for (var i = 0; i < snake.tails.length; i++) {
            if (this.x == snake.tails[i].x || this.y == snake.tails[i].y) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill(10, 200, 40);
        noStroke();
        rect(this.x, this.y, gap, gap); // last vlue = rounding
    }
}