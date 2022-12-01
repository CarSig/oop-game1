class Player {
    constructor() {
        this.positionX = 50;
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 5;
        }
    }
    moveRight() {
        if (this.positionX < 100) {
            this.positionX += 5;
        }

    }

}

const player = new Player();




