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
        this.domElement.style.left = this.positionX + "px";
    }

    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "px";
    }
    moveTop() {
        this.positionY--;
        this.domElement.style.top = this.positionY + "px";
    }
    moveDown() {
        this.positionY++;
        this.domElement.style.top = this.positionY + "px";
    }
}






// class Obstacle {
//     constructor() {
//         this.width = 20;
//         this.height = 10;
//         this.positionX = 50 - (this.width / 2);
//         this.positionY = 80;

//         this.domElement = null;
//         this.createDomElement();
//     }
//     createDomElement() {
//         // step1: create the element:
//         this.domElement = document.createElement('div');

//         // step2: add content or modify (ex. innerHTML...)
//         this.domElement.className = "obstacle";
//         this.domElement.style.width = this.width + "vw";
//         this.domElement.style.height = this.height + "vh";
//         this.domElement.style.bottom = this.positionY + "vh";
//         this.domElement.style.left = this.positionX + "vw";

//         //step3: append to the dom: `parentElm.appendChild()`
//         const boardElm = document.getElementById("board");
//         boardElm.appendChild(this.domElement);
//     }
//     moveDown() {

//         this.positionY--;
//         this.domElement.style.bottom = this.positionY + "vh";



//     }
// }

//////////////////////////


const player = new Player();
const obsArr = [];


//Attach event listeners
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowRight":
            player.moveRight();
            break;
        case "ArrowLeft":
            player.moveLeft();
            break;
        case "ArrowUp":
            player.moveTop();
            break;
        case "ArrowDown":
            player.moveDown();
            break;
        default:
            break;
    }

});


//Create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obsArr.push(newObstacle);
}, 1000);

// get bottom of screen
const boardElm = document.getElementById("board");
const boardHeight = boardElm.clientHeight;

//Move obstacles and detec 
setInterval(() => {
    obstacles.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        if (obstacleInstance.positionY <= 0) {
            // destroy the obstacle
            console.log("destroy the obstacle");

        }
    });
}, 50)
