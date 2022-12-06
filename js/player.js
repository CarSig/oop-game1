
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

        this.cannon = document.createElement('img');
        this.cannon.id = "cannon";
        this.cannon.src = "./css/tank_cannon.png";
        this.domElement.appendChild(this.cannon);



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
        this.cannon.style.transform = "rotate(" + this.cannonRotation + "deg)"


    }
    shot() {
        const bullet = new Bullet(this.x, this.y, 2, 100, this.cannonRotation, this.angle, this.moveAngle, this.rotation)
    }



}


class Cannon extends Player {
    constructor(x, y) {
        super(x, y)
        this.cannonRotation = 0;
        this.rotation = 0;
        this.cannon = null;
        this.createDomElement();
        console.log("cannon created")
    }
    createDomElement() {
        this.cannon = document.createElement('img');
        this.cannon.id = "cannon";
        this.cannon.src = "./css/tank_cannon.png";
        this.domElement.appendChild(this.cannon);
        this.cannon.style.left = this.x + "vw";
        this.cannon.style.bottom = this.y + "vh";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
}





