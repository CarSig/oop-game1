class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.x = 50 - (this.width / 2);
        this.y = 0;

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
        this.domElement.style.bottom = this.y + "vh";
        this.domElement.style.left = this.x + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveLeft() {
        this.x--;
        this.domElement.style.left = this.x + "vw";
    }

    moveRight() {
        this.x++;
        this.domElement.style.left = this.x + "vw";
    }
}

class Obstacle {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.x = 50 - (this.width / 2);
        this.y = 80;

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
        this.domElement.style.bottom = this.y + "vh";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.transformOrigin = "bottom";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    moveDown() {
        this.y--;
        this.domElement.style.bottom = this.y + "vh";
    }
    sound() {
        console.log("Tank sound")
    }

}

//////////////////////////


const player = new Player();
const turret = new Turret();
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
        if (obstacleInstance.y <= -obstacleInstance.height) {
            // destroy the obstacle
            console.log("destroy the obstacle");
            obstacleInstance.domElement.remove();
            obstacles.shift();

        }
        //detect if there's a collision between player and current obstacle
        if (
            player.x < obstacleInstance.x + obstacleInstance.width &&
            player.x + player.width > obstacleInstance.x &&
            player.y < obstacleInstance.y + obstacleInstance.height &&
            player.height + player.y > obstacleInstance.y
        ) {
            console.log("collision detected!!");
        }
    });
}, 50)



