const bulletsArr = [];
window.addEventListener("resize", function () {
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
        this.img.src = "./assets/img/tank_body1.png";
        this.img.className = "imgTank"

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

        this.turret.src = "./assets/img/tank_turret.png";
        this.parent.appendChild(this.turret);

        const boardElm = document.getElementById("board");

        boardElm.appendChild(this.domElement);
        this.scoreElm = document.createElement('div');
        this.scoreElm.id = "score";
        // this.scoreElm = document.getElementById("score");
        this.scoreElm.innerHTML = "score: " + this.score;
        boardElm.appendChild(this.scoreElm);


    }

    handleSpeed() {
        const isTurning = this.arrow.left || this.arrow.right
        this.acceleration = this.arrow.up ? isTurning ? this.acceleration + 0.15 : this.acceleration + 0.4 : 0

        const speed = -7 - this.acceleration
        this.speed = this.arrow.down ? 4 : speed < this.speedLimit ? this.speedLimit : speed
    }

    handleRotation() {
        this.moveAngle = this.arrow.left ? 1 : this.arrow.right ? -1 : 0;
        const angle = (this.moveAngle * Math.PI) / 180;
        this.angle += angle;
        this.x += (this.speed) * Math.sin(this.angle);
        this.y -= (this.speed) * Math.cos(this.angle);

    }

    move() {

        this.handleSpeed();
        this.handleRotation();
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        this.rotation = -Math.round(this.angle * 180 / Math.PI)
        this.domElement.style.transform = "rotate(" + this.rotation + "deg)";
        const collidedObs = buildings.filter(obstacle => detectCollision(this, obstacle))
        this.speedLimit = collidedObs.length > 0 ? 0 : -13
        this.stopMovingOnScreenEdge()

    };

    rotateCannon() {
        if (this.arrow.canonLeft) {
            this.cannonRotation += 4
        }
        if (this.arrow.canonRight) {
            this.cannonRotation -= 4
        }
        this.turret.style.transform = "rotate(" + this.cannonRotation + "deg)"
    }
    shot() {
        // TODO : fix the angle of the bullet
        const angle = Math.abs(this.rotation % 360)

        if (this.arrow.spaceBar && this.shootingEnabled) {

            const bullet = new Bullet(this.x, this.y, 2, 100, this.cannonRotation, this.angle, this.moveAngle, this.rotation)
            bulletsArr.push(bullet)

            this.shootingEnabled = false
            setTimeout(() => {
                this.shootingEnabled = true
            }, 500)
        }


    }
    takeDamage() {
        this.health = this.health > 0 ? this.health - 1 : window.location.href = './game-over.html'
        this.img.className = `imgTank hp${this.health}`
    }

    stopMovingOnScreenEdge() {
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > window.innerWidth - 2 * this.height) {
            this.x = window.innerWidth - 2 * this.height
        }
        if (this.y < 42) {
            this.y = 42
        }
        if (this.y > window.innerHeight - this.height) {
            this.y = window.innerHeight - this.height
        }
    }
    scorePoints() {
        this.score = this.score + 10
        this.scoreElm.innerHTML = "score: " + this.score
        if (this.score === 100) {
            window.location.href = './victory.html';
        }
    }

    createUI() {
        this.scoreElm = document.getElementById("score");
        this.scoreElm.innerHTML = this.score

    }
}




