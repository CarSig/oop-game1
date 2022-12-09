const bulletsArr = [];


//    console.log("screenwidth: " + window.innerWidth, "screenheight: " + window.innerHeight)
// detect window.innerWidth change

window.addEventListener("resize", function () {
    console.log("screenwidth: " + window.innerWidth, "screenheight: " + window.innerHeight)

    const boardElm = document.getElementById("board");
    boardElm.style.width = window.innerWidth + "px";
    boardElm.style.height = window.innerHeight + "px";
})

class Player {
    constructor() {
        this.width = 42;
        this.height = 75;
        this.x = 750;
        this.y = 200;
        this.score = 0;
        this.domElement = null;
        this.turret = null;
        this.scoreElm = null;
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

        this.shootingEnabled = true;
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
        // this.domElement.style.transformOrigin = "50% 80%";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";

        this.turret = document.createElement('img');
        this.turret.id = "imgTurret";

        this.turret.src = "./css/tank_turret.png";
        this.parent.appendChild(this.turret);

        const boardElm = document.getElementById("board");

        boardElm.appendChild(this.domElement);
        this.scoreElm = document.createElement('h2');
        // this.scoreElm = document.getElementById("score");
        this.scoreElm.innerHTML = "score: " + this.score;
        boardElm.appendChild(this.scoreElm);


    }
    accelerate() {
        if (this.arrow.up) {
            this.acceleration = (this.arrow.left || this.arrow.right) ? this.acceleration += 0.15 : this.acceleration += 0.4
        }

    }
    decelerate() {
        if (this.arrow.down) {
            this.acceleration = (this.arrow.left || this.arrow.right) ? this.acceleration -= 0.15 : this.acceleration -= 0.4
        }
    }

    handleSpeed() {
        if (this.arrow.up) {
            const speed = -7 - this.acceleration

            if (speed < this.speedLimit) {
                this.speed = this.speedLimit
            } else {
                this.speed = speed
            }
        }

        if (this.arrow.down) {

            this.speed = 4
        }

        console.log(this.speed)

        // this.speed = this.arrow.up ? (-0.25 - this.acceleration) : this.arrow.down ? 0.3 : 0
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

        // console.log(this.rotation)
        // console.log("x: " + this.x + " y: " + this.y)
    }

    move() {
        this.accelerate()
        this.handleSpeed();
        this.handleRotation();
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        const collidedObs = obstacles.filter(obstacle => detectCollision(this, obstacle))
        if (!this.hasCollided) {
            this.speedLimit = -13
        }

        if (collidedObs.length > 0) {
            this.speedLimit = 0
            this.hasCollided = true

        }
        else {
            this.speedLimit = -10
            this.hasCollided = false
        }

        this.stopMovingOnScreenEdge()

    };

    rotateCannon() {
        this.turret.style.transform = "rotate(" + this.cannonRotation + "deg)"



    }
    shot() {
        const angle = Math.abs(this.rotation % 360)
        console.log(angle)
        if (this.arrow.spaceBar && this.shootingEnabled) {
            // const doubleAngle = (angle + this.cannonRotation % 360) === 360 ? 0 : (angle + this.cannonRotation % 360)

            // const totalAngle = doubleAngle > 0 ? doubleAngle : 360 - Math.abs(doubleAngle)
            // console.log("total angle: " + totalAngle, " cannon angle: " + this.cannonRotation, " tank angle: " + angle)


            console.log("screenwidth: " + window.innerWidth, "screenheight: " + window.innerHeight)


            const bullet = new Bullet(this.x, this.y, 2, 100, this.cannonRotation, this.angle, this.moveAngle, this.rotation)
            bulletsArr.push(bullet)

            this.shootingEnabled = false
            setTimeout(() => {
                this.shootingEnabled = true
            }, 500)
        }


    }
    takeDamage() {
        this.health = this.health - 1
        this.img.className = this.health >= 0 ? `hp${this.health}` : "destroyed"
        // alert(this.health)
        console.log(this.img)

        if (this.health < 0) {

            //remove building
        }
    }

    stopMovingOnScreenEdge() {
        if (this.x < 0) {
            this.x = 0
            // alert("you hit the left side")
        }
        if (this.x > window.innerWidth - 2 * this.height) {
            this.x = window.innerWidth - 2 * this.height
            // alert("you hit the right side")
        }
        if (this.y < 42) {
            this.y = 42
            // alert("you hit the top side")
        }
        if (this.y > window.innerHeight - this.height) {
            this.y = window.innerHeight - this.height
            // alert("you hit the bottom side")
        }
    }
    scorePoints() {
        this.score = this.score + 10
        console.log(this.score)
        this.scoreElm.innerHTML = this.score
        if (this.score === 100) {
            alert("you win")
        }
    }

    createUI() {
        this.scoreElm = document.getElementById("score");
        this.scoreElm.innerHTML = this.score

    }
}




