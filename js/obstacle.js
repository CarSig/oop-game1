

const detectCollision = (actor, target) => {
    const collision = actor.x < target.x + target.width &&
        actor.x + actor.width > target.x &&
        actor.y < target.y + target.height &&
        actor.height + actor.y > target.y

    if (collision) {
        switch (actor.constructor) {
            case Bullet:
                if (target.constructor === UFO) {
                    target.destroyAndCreateDummy()

                }


                break;
            case Player:

                if (target.constructor === Building) {

                    actor.speedLimit = 0

                }

                break;

            case UFO:

                // actor.destroyAndCreateDummy()
                target.takeDamage()


            default: console.log("collision detected!!", actor, target);
        }
    }
    return collision
}


class Item {
    constructor(width, height, x, y, type) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
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



}

class Building extends Item {
    constructor(width, height, x, y, type) {
        super(width, height, x, y, type)
        this.health = 3;

    }
    takeDamage() {
        this.domElement.className = `building ${this.health > 0 ? "building-hp" + this.health : " building-destroyed"}`

        this.health = this.health - 1
        if (this.health < 0) {
            this.x = -100
            this.y = -100

        }
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
        this.rotation = 0

    }
    moveToCenterOfBoard() {
        setInterval(() => {
            this.x = this.x < 400 ? this.x + 1 : this.x - 1
            this.y = this.y < 400 ? this.y + 1 : this.y - 1
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";
        }, 50)
    }



    move() {
        setInterval(() => {
            if ((this.x < 50 && this.x > 750) || (this.y < 50 && this.y > 750)) {
                this.moveToCenterOfBoard()
            }
            this.handleRotation()
            const random = Math.floor(Math.random() * 100)
            this.moveAngle = random < 99 ? this.moveAngle : -this.moveAngle
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";

            detectCollision(this, player) ? this.destroyAndCreateDummy() : null
            obstacles.forEach((obstacleInstance) => detectCollision(this, obstacleInstance) ? this.
                destroyAndCreateDummy() : null)
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

        handleScreenEdge(this)

    }
    destroy() {
        // this.createDummy()
        this.domElement.classList.add("destroyed")


        // const dummyPos = this.getCurrentPosition()

        this.x = -300
        this.y = -300


        this.speed = 0
        this.domElement.remove()




    }

    createDummy(x, y, r) {
        this.dummy = document.createElement('div');
        this.dummy.className = "dummy";
        this.dummy.style.width = this.width + "px";
        this.dummy.style.height = this.height + "px";
        this.dummy.style.bottom = y + "px";
        this.dummy.style.left = x + "px";
        this.dummy.style.transform = "rotate(" + r + "deg)";
        this.dummy.style.filter = "drop-shadow(15px 15px 5px #d30a0a98)";
        this.dummy.className = `${this.type}`;
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.dummy);
        // this.dummy.move()
        // remove dummy after 1 second
        setTimeout(() => {
            this.dummy.remove()
        }, 500)


    }

    destroyAndCreateDummy() {
        const { x, y, r } = this.getCurrentPosition()

        this.destroy()
        this.createDummy(+x, +y, +r)
    }

    getCurrentPosition() {
        const position = { x: "" + this.x, y: "" + this.y, r: "" + this.rotation }

        return position

    }

}

const UFOarr = []

let counterInterval = 1
let intSpeed = 2000
setInterval(() => {
    const { x, y } = getUFOstartPosition();
    if (counterInterval % 5 === 0) {
        intSpeed = intSpeed > 1000 ? intSpeed - 100 : intSpeed
    }
    let newUFO = new UFO(45, 45, x, y, "ufo", 10);
    UFOarr.push(newUFO);
    newUFO.move();

    counterInterval++
    console.log("intSpeed", intSpeed);

}, intSpeed);



const getUFOstartPosition = () => {
    const randomSide = Math.floor(Math.random() * 2) == 1 ? 0 : 760;
    const isXRandomSide = Math.floor(Math.random() * 2) === 1 ? true : false;
    const x = isXRandomSide ? randomSide : Math.floor(Math.random() * 1400);
    const y = isXRandomSide ? Math.floor(Math.random() * 760) : 750;
    return { x, y }
}


const handleScreenEdge = (element) => {
    if (element.x > 1600 || element.x < -1 || element.y > 800 || element.y < 30) {
        element.destroy()
    }
}


