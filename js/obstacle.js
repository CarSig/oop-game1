

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
                if (target.constructor === UFO) {
                    target.domElement.classList.add("destroyed")

                    setTimeout(() => {

                        target.domElement.remove();
                    }, 130)
                }
                actor.domElement.remove();
                return true;
                break;
            case Player:
                if (target.constructor === UFO) {
                    console.log("player collision with UFO!!")

                    return true
                }
                if (target.constructor === Building) {
                    console.log("player collision with building!!")
                    actor.speedLimit = 0
                    return true
                }

                break;

            case UFO:
                if (target.constructor === Building) {
                    actor.domElement.classList.add("destroyed")

                    setTimeout(() => {

                        actor.domElement.remove();
                    }, 130)
                    return true
                }

                if (target.constructor === Player) {
                    console.log("ufo collision with player!!")
                    return true
                }
            default: console.log("collision detected!!");
        }
    }
    return false
}


class Item {
    constructor(width, height, x, y, type) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        // this.color = color;
        this.type = type;

        this.domElement = null;
        this.createDomElement();
    }
    createDomElement() {

        this.domElement = document.createElement('div');
        this.domElement.className = `${this.type}`;
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.bottom = this.y + "px";
        this.domElement.style.left = this.x + "px";
        // this.domElement.style.backgroundColor = this.color;
        this.domElement.className = `${this.type}`;
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    read() {
        console.log(this.color)
    }


}

class Building extends Item {
    constructor(width, height, x, y, color, type, health,) {
        super(width, height, x, y, color, type)
        this.health = health;
        console.log(this)
    }
}

class UFO extends Item {
    constructor(width, height, x, y, type, health) {
        super(width, height, x, y, type)
        this.health = health;
        console.log("UFO created")
        this.moveAngle = 1
        this.angle = 0;
        this.speed = 3
    }
    move() {
        setInterval(() => {
            this.handleRotation()
            const random = Math.floor(Math.random() * 100)
            this.moveAngle = random < 99 ? this.moveAngle : -this.moveAngle
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";
            const playerCollision = detectCollision(this, player)


            obstacles.forEach((obstacleInstance) => {
                const collision = detectCollision(this, obstacleInstance)
                if (collision) {
                    this.domElement.classList.add("destroyed")

                    setTimeout(() => {

                        this.domElement.remove();
                        // obstacleInstance.domElement.remove();
                    }, 130)
                }
            })

            if (playerCollision) {

                this.domElement.classList.add("destroyed")

                setTimeout(() => {

                    this.domElement.remove();
                }, 130)
            }


        }, 50)


    }

    handleRotation() {
        const angle = (this.moveAngle * Math.PI) / 180;
        this.angle += angle;
        this.x += (this.speed) * Math.sin(this.angle);
        this.y -= (this.speed) * Math.cos(this.angle);
        this.rotation = -Math.round(this.angle * 180 / Math.PI)
        // this.domElement.style.transform = "rotate(" + angle + "deg)";
        this.domElement.style.transform = "rotate(" + this.rotation + "deg)";

        if (this.x > 800 || this.x < 0 || this.y > 800 || this.y < 0) {

            this.domElement.remove();
        }

    }
    // check if ufo is out of bounds


}

const UFOarr = []


setInterval(() => {
    //random number between 0 and
    const randomSide = Math.floor(Math.random() * 2) == 1 ? 0 : 800;
    const isXRandomSide = Math.floor(Math.random() * 2) === 1 ? true : false;
    const x = isXRandomSide ? randomSide : Math.floor(Math.random() * 800);
    const y = isXRandomSide ? Math.floor(Math.random() * 800) : randomSide;

    const newUFO = new UFO(45, 45, x, y, "ufo", 10);
    UFOarr.push(newUFO);
    newUFO.move();

    console.log(UFOarr);
}, 5000);



