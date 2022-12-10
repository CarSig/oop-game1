
class Bullet {
    constructor(x, y, speed, range, cannonRotation, angle, moveAngle, rotation) {
        this.x = x + 27;
        this.y = y + 55;
        this.speed = speed;
        this.range = range;
        this.cannonRotation = cannonRotation;
        this.angle = angle;
        this.moveAngle = moveAngle;
        this.rotation = rotation
        this.height = 2;
        this.width = 2;
        this.bothRotations = (this.rotation + this.cannonRotation) % 360
        this.bulletDirection = (this.bothRotations * Math.PI) / 180;
        this.domElement = null;
        this.createDomElement();
        this.moveStart();

    }

    createDomElement() {
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.bottom = this.y + "px";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveStart() {
        const move = () => {
            this.x += Math.sin(this.bulletDirection) //* this.speed;
            this.y += Math.cos(this.bulletDirection) ///* this.speed;
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";
            handleScreenEdge(this)
            setTimeout(() => {
                clearInterval(bulletInterval)
                this.domElement.remove()
            }, 3000)
        }

        const bulletInterval = setInterval(() => {
            move()

            buildings.forEach((obstacleInstance) => {
                const isCollision = detectCollision(this, obstacleInstance)
                if (isCollision) {
                    // this.removeBullet(bulletInterval)
                    clearInterval(bulletInterval)
                    this.destroy()
                }

                UFOarr.forEach((UFOinstance) => {
                    const isCollision = detectCollision(this, UFOinstance)
                    if (isCollision) {
                        player.scorePoints()
                        UFOinstance.destroyAndCreateDummy("explosion")
                        this.destroy()
                    }
                })
            }, 50)
        })
    }

    destroy() {
        this.domElement.classList.add("destroyed")
        this.domElement.remove();
        this.x = -200
        this.y = -200
        this.speed = 0
    }
}