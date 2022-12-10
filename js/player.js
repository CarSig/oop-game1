



class Player extends MovingItem {
    constructor(width, height, x, y, type, moveAngle, angle, speed, rotation) {
        super(width = 42, height = 75, x = 750, y = 200, type = "player", moveAngle = 0, angle = 0, speed = 0, rotation = 0)
        this.score = 0;
        this.domElement = null;
        this.turret = null;
        this.scoreElm = null;
        this.acceleration = 0
        this.speedLimit = -9;
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
        this.health = 4
        this.shootingEnabled = true;
        this.createDOM();
    }

    createTankDOM() {
        this.parent = document.createElement('div');
        this.parent.id = "parentTank";
        this.parent.style.width = this.width + "px";
        this.parent.style.height = this.height + "px";
        this.domElement.appendChild(this.parent);

        this.img = document.createElement('img');
        this.img.src = "./assets/img/tank_body1.png";
        this.img.className = "imgTank"

        this.parent.appendChild(this.img);
        this.turret = document.createElement('img');
        this.turret.id = "imgTurret";
        this.turret.src = "./assets/img/tank_turret.png";
        this.parent.appendChild(this.turret);
    }

    createBoardDOM() {
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
        this.scoreElm = document.createElement('div');
        this.scoreElm.id = "score";
        this.scoreElm.innerHTML = "score: " + this.score;
        boardElm.appendChild(this.scoreElm);
    }

    createDOM() {
        this.createDomElement()
        this.createTankDOM();
        this.createBoardDOM();
    }

    handleSpeed() {
        const isTurning = this.arrow.left || this.arrow.right
        this.acceleration = this.arrow.up ? isTurning ? this.acceleration + 0.1 : this.acceleration + 0.25 : 0
        this.acceleration = this.acceleration > 3 && isTurning ? 1.5 : this.acceleration
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
        this.speedLimit = -9
        if (this.arrow.up || this.arrow.down || this.arrow.left || this.arrow.right) {
            this.handleSpeed();
            this.handleRotation();
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";
            this.rotation = -Math.round(this.angle * 180 / Math.PI)
            this.domElement.style.transform = "rotate(" + this.rotation + "deg)";
            const collidedObs = buildings.filter(obstacle => detectCollision(this, obstacle))
            this.speedLimit = collidedObs.length > 0 ? 0 : -9
            this.stopMovingOnScreenEdge()
        }
    };

    rotateCannon() {
        this.cannonRotation = this.arrow.canonLeft ? this.cannonRotation + 4 : this.arrow.canonRight ? this.cannonRotation - 4 : this.cannonRotation
        this.turret.style.transform = "rotate(" + this.cannonRotation + "deg)"

    }

    shot() {
        // TODO : fix the angle of the bullet
        //const angle = Math.abs(this.rotation % 360)

        const isShooting = this.arrow.spaceBar && this.shootingEnabled
        if (isShooting) {
            const bullet = new Bullet(4, 4, this.x, this.y, "bullet", this.moveAngle, this.angle, 2, this.rotation, this.cannonRotation)

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
        if (this.health === 0) {
            isGameOver()
        }
    }

    stopMovingOnScreenEdge() {

        if (this.x < 0) {
            this.x = 0
            this.speedLimit = -3
        } else if (this.x > window.innerWidth - 2 * this.height) {
            this.x = window.innerWidth - 2 * this.height
            this.speedLimit = -3
        }
        if (this.y < 42) {
            this.y = 42
            this.speedLimit = -3
        } else if (this.y > window.innerHeight - this.height) {
            this.y = window.innerHeight - this.height
            this.speedLimit = -3
        }



    }

    scorePoints() {
        this.score = this.score + 10
        this.scoreElm.innerHTML = "score: " + this.score
        if (this.score === 100) {
            window.location.href = './victory.html';
        }
    }
}




