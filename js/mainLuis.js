class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;

        this.domElement = null;
        this.createDomElement();
    }

    createDomElement() {
        // step1: create the element:
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveLeft() {
        this.positionX--
        this.domElement.style.left = this.positionX + "vw";
    }

    moveRight() {
        this.positionX++
        this.domElement.style.left = this.positionX + "vw";
    }
}

//////////////////////////


const player = new Player();

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        player.moveRight();
    } else if (event.key === "ArrowLeft") {
        player.moveLeft();
    }
});