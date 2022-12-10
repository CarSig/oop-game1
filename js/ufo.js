
class UFO extends MovingItem {
    constructor(x, y, width = 45, height = 45, type = "ufo", moveAngle = 1, angle = 0, speed = 3, rotation = 0) {
        super(width, height, x, y, type, moveAngle, angle, speed, rotation)
        this.createDomElement();
    }


    move() {
        setInterval(() => {

            this.handleRotation()
            const random = Math.floor(Math.random() * 100)
            this.moveAngle = random < 99 ? this.moveAngle : -this.moveAngle
            this.domElement.style.left = this.x + "px";
            this.domElement.style.bottom = this.y + "px";

            //handle player collision 
            if (detectCollision(this, player)) {
                this.destroyAndCreateDummy()
                player.takeDamage()
            }
            //handle building collision
            buildings.forEach((obstacleInstance) => {
                if (detectCollision(this, obstacleInstance)) {
                    this.destroyAndCreateDummy()
                    obstacleInstance.takeDamage()
                }
            })
        }, 50)


    }

    handleRotation() {
        const angle = (this.moveAngle * Math.PI) / 180;
        this.angle += angle;
        this.x += (this.speed) * Math.sin(this.angle);
        this.y -= (this.speed) * Math.cos(this.angle);
        this.rotation = -Math.round(this.angle * 180 / Math.PI)
        // this.domElement.style.transform = "rotate(" + angle + "deg)";
        this.domElement.style.transform = "rotate(" + this.rotation + "deg)";
        handleScreenEdge(this)



    }


    createDummy(x, y, r) {
        this.dummy = document.createElement('div');
        this.dummy.className = "dummy";
        this.dummy.style.width = this.width + "px";
        this.dummy.style.height = this.height + "px";
        this.dummy.style.bottom = y + "px";
        this.dummy.style.left = x + "px";
        this.dummy.style.transform = "rotate(" + r + "deg)";
        this.dummy.style.filter = "drop-shadow(15px 15px 5px #d30a0a98)";
        this.dummy.className = `${this.type}`;
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.dummy);

        setTimeout(() => {
            this.dummy.remove()
        }, 500)


    }

    destroyAndCreateDummy(sound = "impact") {

        if (sound === "explosion") {
            explosion.play()
        }
        if (sound === "impact") {
            impact.play()
        }
        const { x, y, r } = this.getCurrentPosition()
        this.destroy()
        this.createDummy(+x, +y, +r)
    }

    getCurrentPosition() {
        const position = { x: "" + this.x, y: "" + this.y, r: "" + this.rotation }
        return position
    }

}
;