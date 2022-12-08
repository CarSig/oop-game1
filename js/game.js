
class Game {
    constructor() {
        this.board = null;
        this.player = null;
        this.createBoard();
        this.createPlayer();
    }

    createBoard() {
        this.board = new Board();
    }

    createPlayer() {
        this.player = new Player();
    }




}










class Board {
    constructor() {
        this.width = 800;
        this.height = 800;
        this.domElement = null;
        this.createDomElement();
        console.log("here")
    }

    createDomElement() {
        this.domElement = document.createElement('div');

        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.border = "13px solid red";
        // const bodyElm = document.querySelector('body');
        // bodyElm.appendChild(this.domElement);
    }
}


const board = new Board();