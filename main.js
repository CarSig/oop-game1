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
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }

    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}

class Obstacle {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 80;

        this.domElement = null;
        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element:
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.transformOrigin = "bottom";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }

}

//////////////////////////


const player = new Player();
const obstacles = []; //will hold instances of the class Obstacle


//Attach event listeners
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        player.moveRight();
    } else if (event.key === "ArrowLeft") {
        player.moveLeft();
    }
});


// Create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacles.push(newObstacle);
}, 3000);







//Move obstacles & detect collision
setInterval(() => {
    obstacles.forEach((obstacleInstance) => {

        //move current obstacle
        obstacleInstance.moveDown();
        if (obstacleInstance.positionY <= -obstacleInstance.height) {
            // destroy the obstacle
            console.log("destroy the obstacle");
            obstacleInstance.domElement.remove();
            obstacles.shift();

        }
        //detect if there's a collision between player and current obstacle
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.height + player.positionY > obstacleInstance.positionY
        ) {
            console.log("collision detected!!");
        }
    });
}, 50)

