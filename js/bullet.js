class Bullet {
    constructor(x, y, speed, range, cannonRotation, angle, moveAngle, rotation) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.range = range;
        this.cannonRotation = cannonRotation;
        this.angle = angle;
        this.moveAngle = moveAngle;
        this.rotation = rotation;


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
        const angle = (this.rotation * Math.PI) / 180;
        const move = () => {
            this.x += (this.speed) * Math.sin(angle);
            this.y -= (this.speed) * Math.cos(angle);
            this.domElement.style.left = this.x + "vw";
            this.domElement.style.bottom = this.y + "vh";

            console.log(this.rotation)
            setTimeout(() => {
                console.log("clear")
                clearInterval(bulletInterval)
                this.domElement.remove()
            }, 1000)


        }

        const bulletInterval = setInterval(() => { move() }, 100)




    }


}