
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
    test() {
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
}

// kod bulleta stavi "type" u konstruktor i u createDomElement() dodaj "this.domElement.className = `${this.type}`;



class Bullet extends Item {
    constructor(x, y, speed, range, cannonRotation, angle, moveAngle, rotation) {
        super(width = 2, height = 2, x, y, type)
        this.x = x
        this.y = y
        this.speed = speed;
        this.range = range;
        this.cannonRotation = cannonRotation;
        this.angle = angle;
        this.moveAngle = moveAngle;
        this.rotation = rotation

        this.bothRotations = (this.rotation + this.cannonRotation) % 360
        this.bulletDirection = (this.bothRotations * Math.PI) / 180;
        this.domElement = null;
        this.createDomElement();
        this.moveStart();

    }

    createDomElement() {
        // create bullet
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
}












class Player {
    constructor() {
        this.width = 42;
        this.height = 75;
        this.x = 550;
        this.y = 250;
        this.domElement = null;
        this.turret = null;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.acceleration = 0
        this.speedLimit = -12;
        this.createDomElement();
        this.arrow = {
            up: false,
            down: false,
            left: false,
            right: false,
            canonLeft: false,
            canonRight: false,
            spaceBar: false
        };
        this.cannonRotation = 0;
        this.hasCollided = false;
        this.health = 4

    }

    createDomElement() {

        this.domElement = document.createElement('div');
        this.domElement.id = "player";

        // this.parentTank = document.createElement('div');

        this.img = document.createElement('img');
        this.img.src = "./css/tank_body1.png";
        this.img.id = "imgTank"

        // it is necessary to create a parent div to make sure the turret is always at the right place regardless of screen size
        this.parent = document.createElement('div');
        this.parent.id = "parentTank";
        this.parent.style.width = this.width + "px";
        this.parent.style.height = this.height + "px";
        this.domElement.appendChild(this.parent);
        this.parent.appendChild(this.img);



        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.transformOrigin = "50% 80%";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";

        this.turret = document.createElement('img');
        this.turret.id = "imgTurret";

        this.turret.src = "./css/tank_turret.png";
        this.parent.appendChild(this.turret);
        // this.turret.style.bottom = "-1vh";
        // this.turret.style.left = "0.2vw";
        // this.turret.style.width = "70%";
        // this.parent.appendChild(this.turret);

        /* left: 0.1rem;
          top: -4rem;
          width: 70%;*/

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");

        boardElm.appendChild(this.domElement);


    }