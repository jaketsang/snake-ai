class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(0, 0, 0);
        stroke(0, 0, 0);
        rect(this.x, this.y, gap, gap); 
    }
}