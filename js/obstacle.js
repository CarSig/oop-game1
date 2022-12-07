

const detectCollision = (actor, target) => {
    const collision = actor.x < target.x + target.width &&
        actor.x + actor.width > target.x &&
        actor.y < target.y + target.height &&
        actor.height + actor.y > target.y


    if (
        collision
    ) {
        switch (actor.constructor) {
            case Bullet:
                console.log("bullet collision detected!!")
                actor.domElement.remove();
                return true;
                break;
            case Player:
                console.log("player collision detected!!")
                actor.speedLimit = 0
                console.log(actor.speedLimit)
                return true
                break;
            default: console.log("collision detected!!");
        }
    }
    return false
}


class Item {
    constructor(width, height, x, y, color, type) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        this.color = color;
        this.type = type;

        this.El = null;
        this.createDomElement();
    }
    createDomElement() {

        this.El = document.createElement('div');
        this.El.className = `${this.type}`;
        this.El.style.width = this.width + "px";
        this.El.style.height = this.height + "px";
        this.El.style.bottom = this.y + "px";
        this.El.style.left = this.x + "px";
        this.El.style.backgroundColor = this.color;
        this.El.className = `${this.type}`;
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.El);
    }


}

class Building extends Item {
    constructor(width, height, x, y, color, type, health) {
        super(width, height, x, y, color, type)
        this.health = health;
    }
}

class UFO extends Item {
    constructor(width, height, x, y, type, health) {
        super(width, height, x, y, type)
        this.health = health;
    }
}

const UFOarr = []

//create UFO
setInterval(() => {
    //get x position on random side of the board
    const x = Math.random() > 0.5 ? 0 : 1000;
    const y = Math.random() * 600;
    const newUFO = new UFO(50, 50, x, y, "ufo", 10);
    UFOarr.push(newUFO);
}, 3000);






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