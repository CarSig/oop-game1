

class Bullet {
    constructor(x, y, speed, range, cannonRotation, angle, moveAngle, rotation) {
        this.x = x + 2;
        this.y = y;
        this.speed = speed;
        this.range = range;
        this.cannonRotation = cannonRotation;
        this.angle = angle;
        this.moveAngle = moveAngle;
        this.rotation = rotation
        this.height = 0.1;
        this.width = 0.1;

        this.domElement = null;
        this.createDomElement();

    }

    createDomElement() {
        // create bullet
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
        this.move()

    }
    move() {

        const bothRotations = (this.rotation + this.cannonRotation) % 360
        const angle = (bothRotations * Math.PI) / 180;
        // const angle = (this.cannonRotation * Math.PI) / 180;

        console.log("angle: " + angle);
        console.log("moveAngle: " + this.moveAngle);
        console.log("rotation: " + this.rotation)
        console.log("cannonRotation: " + this.cannonRotation)
        console.log("bothRotations: " + bothRotations)

        const move = () => {

            this.x += Math.sin(angle) //* this.speed;
            this.y += Math.cos(angle) ///* this.speed;
            this.domElement.style.left = this.x + "vw";
            this.domElement.style.bottom = this.y + "vh";


            setTimeout(() => {

                clearInterval(bulletInterval)
                this.domElement.remove()
            }, 2000)
        }

        const bulletInterval = setInterval(() => {
            move()
            obstacles.forEach((obstacleInstance) => {
                detectCollision(this, obstacleInstance)
                if (detectCollision(this, obstacleInstance)) {
                    clearInterval(bulletInterval)
                    this.domElement.remove()
                    console.log("bullet removed")
                }
            }, 150)
        })




    }
}