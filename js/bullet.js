
class Rocket extends MovingItem {

    constructor(width, height, x, y, type, moveAngle, angle, speed, rotation, cannonRotation, range) {
        super(width, height, x, y, type, moveAngle, angle, speed, rotation)
        this.x = x + 27;
        this.y = y + 55;
        this.cannonRotation = cannonRotation;
        this.speed = 2
        this.range = range
        this.angle = angle;
        this.rotation = rotation
        this.moveAngle = moveAngle;
        this.bothRotations = (this.rotation + this.cannonRotation) % 360
        this.rocketDirection = (this.bothRotations * Math.PI) / 180;
        this.domElement = null;
        this.createDomElement();
        this.moveStart();

    }

    checkBuildingCollision() {
        buildings.forEach((obstacleInstance) => {
            const isCollision = detectCollision(this, obstacleInstance)
            if (isCollision) {
                // this.removerocket(rocketInterval)
                // clearInterval(rocketInterval)
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
        console.log(rocketsArr);
        console.log(UFOarr);
        const move = () => {
            this.x += Math.sin(this.rocketDirection) //* this.speed;
            this.y += Math.cos(this.rocketDirection) ///* this.speed;
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";
            handleScreenEdge(this)
            setTimeout(() => {
                clearInterval(rocketInterval)
                this.domElement.remove()
                rocketsArr.splice(rocketsArr.indexOf(this), 1)

            }, 3000)
        }

        const rocketInterval = setInterval(() => {
            move()
            this.checkUFOCollision()
            this.checkBuildingCollision()
        }, 1)
    }
}