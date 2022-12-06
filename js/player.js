
class Player {
    constructor() {
        this.width = 5;
        this.height = 8;
        this.x = 50 - (this.width / 2);
        this.y = 50;
        this.domElement = null;
        this.turret = null;
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


    }

    createDomElement() {

        this.domElement = document.createElement('div');
        this.domElement.id = "player";

        this.parentTank = document.createElement('div');

        this.img = document.createElement('img');
        this.img.src = "./css/tank_body.png";
        this.img.id = "imgTank"


        this.parent = document.createElement('div');
        this.parent.id = "parentTank";
        this.parent.style.width = this.width + "vw";
        this.parent.style.height = this.height + "vh";
        this.domElement.appendChild(this.parent);
        this.parent.appendChild(this.img);



        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.transformOrigin = "50% 80%";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";

        this.turret = document.createElement('img');
        this.turret.id = "imgTurret";

        this.turret.src = "./css/tank_cannon.png";
        this.parent.appendChild(this.turret);
        // this.turret.style.bottom = "-1vh";
        // this.turret.style.left = "0.2vw";
        // this.turret.style.width = "70%";
        this.domElement.appendChild(this.turret);

        /* left: 0.1rem;
          top: -4rem;
          width: 70%;*/

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);


    }
    accelerate() {
        if (this.arrow.up) {
            this.acceleration = (this.arrow.left || this.arrow.right) ? this.acceleration += 0.005 : this.acceleration += 0.02
        }

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
        this.turret.style.transform = "rotate(" + this.cannonRotation + "deg)"


    }
    shot() {
        const bullet = new Bullet(this.x, this.y, 2, 100, this.cannonRotation, this.angle, this.moveAngle, this.rotation)
    }



}


const player = new Player();


class Turret extends Player {

    constructor(x, y) {
        super(x, y)
        // this.x = x.bind(player)
        // this.y = y.bind(player)
        this.x = x
        this.y = y
        this.width = 5;
        this.height = 8;
        this.cannonRotation = 0;
        this.rotation = 0;
        this.turret = null;
        this.createDomElement();
        console.log("turret created")

    }
    createDomElement() {
        this.turret = document.createElement('img');
        this.turret.id = "turret1";
        this.turret.src = "./css/tank_cannon.png";
        this.turret.width = this.width;
        this.turret.height = this.height;
        console.log(this.x, this.y, this.turret.id)
        // this.domElement.appendChild(this.turret);
        this.turret.style.left = this.x + "vw";
        this.turret.style.bottom = this.y + 2 + "vh";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.turret);
    }



}



// const a = new Turret()

// console.log(a.width)

