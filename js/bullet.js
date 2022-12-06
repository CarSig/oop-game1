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

        // move bullet 200 px from the tank in the direction of the cannon x axisđ
        this.domElement.style.left = this.x + "vw";
        this.domElement.style.bottom = this.y + "vh";
        // this.domElement.style.transform = "rotate(" + this.rotation + "deg)";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
        this.move()

    }
    move() {
        const angle = (this.rotation * Math.PI) / 180;
        bulletInterval = setInterval(() => {

            this.x += (this.speed) * Math.sin(angle);
            this.y -= (this.speed) * Math.cos(angle);
            this.domElement.style.left = this.x + "vw";
            this.domElement.style.bottom = this.y + "vh";







            // this.y = this.y + this.speed;

            // this.domElement.style.bottom = this.y + "vh";
        }, this.range / this.speed)



        setTimeout(() => {
            this.domElement.remove()
        }, 1000)

    }


}