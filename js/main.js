// import engineSound from "./assets/engine.mp3";
// import engineAccelerate from "./assets/engine_accelerate.mp3";

class Player {
    constructor() {
        this.width = 5;
        this.height = 8;
        this.x = 50 - (this.width / 2);
        this.y = 0;
        this.domElement = null;
        this.cannon = null;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.acceleration = 0
        this.speedLimit = -2;
        this.createDomElement();
        this.arrow = {
            up: false,
            down: false,
            left: false,
            right: false,
            canonLeft: false,
            canonRight: false
        };
        this.cannonRotation = 0;
        this.sound = {
            engine: new Audio({
                loop: true,
                volume: 1,
                src: ["./assets/moving.mp3"]
            }),


            engineAccelerate: new Audio("./assets/engine_accelerate.mp3")
        }

    }

    createDomElement() {

        this.domElement = document.createElement('div');
        this.domElement.id = "player";
        this.img = document.createElement('img');
        this.img.src = "./css/tank_body.png";
        this.domElement.appendChild(this.img);

        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.transformOrigin = "50% 80%";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";
        // this.rotation = -Math.round(this.angle * 180 / Math.PI)
        // this.domElement.style.transform = "rotate(" + this.rotation + "deg)";
        this.cannon = document.createElement('img');
        this.cannon.id = "cannon";
        this.cannon.src = "./css/tank_cannon.png";
        this.domElement.appendChild(this.cannon);
        //play engine sound


        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);


    }
    accelerate() {
        if (this.arrow.up) {
            this.acceleration = (this.arrow.left || this.arrow.right) ? this.acceleration += 0.005 : this.acceleration += 0.02

        }
        // play sound

        // this.sound.engineAccelerate.play();

    }
    decelerate() {
        if (this.arrow.down) {
            this.acceleration = (this.arrow.left || this.arrow.right) ? this.acceleration -= 0.005 : this.acceleration -= 0.02
        }
    }

    handleSpeed() {
        this.speed = this.arrow.up ? (-0.25 - this.acceleration) : this.arrow.down ? 0.3 : 0
        this.moveAngle = this.arrow.left ? 1 : this.arrow.right ? -1 : 0;


    }
    handleRotation() {
        const angle = (this.moveAngle * Math.PI) / 180;
        this.angle += angle;
        this.x += (this.speed) * Math.sin(this.angle);
        this.y -= (this.speed) * Math.cos(this.angle);
        this.rotation = -Math.round(this.angle * 180 / Math.PI)
        // this.domElement.style.transform = "rotate(" + angle + "deg)";
        this.domElement.style.transform = "rotate(" + this.rotation + "deg)";
    }

    move() {
        this.accelerate()
        this.handleSpeed();
        this.handleRotation();
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";

        console.log("speed: " + this.speed, "rotation: " + this.rotation)
    };

    rotateCannon() {
        this.cannon.style.transform = "rotate(" + this.cannonRotation + "deg)"


    }
    shot() {
        const bullet = new Bullet(this.x, this.y, this.cannonRotation, this.speed, this.angle)
    }

}

class Bullet {
    constructor(x, y, speed, range) {
        this.x = x;
        this.y = y;

        this.speed = speed;
        this.range = range;
        this.domElement = null;
        this.createDomElement();

    }

    createDomElement() {
        // create bullet
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";

        // move bullet 200 px from the tank in the direction of the cannon x axisđ
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";
        // this.domElement.style.transform = "rotate(" + this.rotation + "deg)";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);


    }


}






const player = new Player();


document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            player.arrow.up = false;
            player.acceleration = 0;
            player.decelerate();
            break;
        case 'ArrowDown':
            player.arrow.down = false;
            break;
        case 'ArrowLeft':
            player.arrow.left = false;
            break;
        case 'ArrowRight':
            player.arrow.right = false;
            break;
        case "w":
            player.arrow.canonLeft = false;
            break;
        case "q":
            player.arrow.canonRight = false;
            break;
    }
});


document.addEventListener('keydown', function (event) {
    player.moveAngle = 0;
    player.speed = 0;

    switch (event.key) {
        case "ArrowUp": player.arrow.up = true;
            break;
        case "ArrowDown": player.arrow.down = true;
            break;
        case "ArrowLeft": player.arrow.left = true
            break;
        case "ArrowRight": player.arrow.right = true
            break;
        case "w": player.cannonRotation += 3
            break;
        case "q": player.cannonRotation -= 3
            break;
        case " ": player.shot()
            console.log("shot")
            break

    }

    player.move()
    player.rotateCannon()
    // player.createDomElement();
});



class Obstacle {
    constructor(width, height, positionX, positionY) {
        this.width = width;
        this.height = width;
        this.positionX = positionX
        this.positionY = positionY

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
        this.domElement.style.backgroundColor = "yellow"

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }


}


const o1 = new Obstacle(12, 5, 677, 222)
const o2 = new Obstacle(5, 6, 212, 555)
const o3 = new Obstacle(8, 8, 500, 1200)
