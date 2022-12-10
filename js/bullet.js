
class Bullet extends MovingItem {

    constructor(width, height, x, y, type, moveAngle, angle, speed, rotation, cannonRotation) {
        super(width, height, x, y, type, moveAngle, angle, speed, rotation)
        this.x = x + 27;
        this.y = y + 55;
        this.cannonRotation = cannonRotation;
        this.speed = 2
        this.range = 100
        this.angle = angle;
        this.rotation = rotation
        this.moveAngle = moveAngle;
        this.bothRotations = (this.rotation + this.cannonRotation) % 360
        this.bulletDirection = (this.bothRotations * Math.PI) / 180;
        this.domElement = null;
        this.createDomElement();
        this.moveStart();

    }

    checkBuildingCollision() {
        buildings.forEach((obstacleInstance) => {
            const isCollision = detectCollision(this, obstacleInstance)
            if (isCollision) {
                // this.removeBullet(bulletInterval)wwwwwwwwww
                // clearInterval(bulletInterval)
                this.destroy()
            }
        }
        )
    }
    checkUFOCollision() {
        UFOarr.forEach((UFOinstance) => {
            const isCollision = detectCollision(this, UFOinstance)
            if (isCollision) {
                player.scorePoints()
                UFOinstance.destroyAndCreateDummy("explosion")
                this.destroy()
            }
        })
    }
    moveStart() {
        console.log(this)
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
            this.checkUFOCollision()
            this.checkBuildingCollision()
        }, 0)
    }
}