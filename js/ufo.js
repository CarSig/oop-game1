class UFO extends MovingItem {
    constructor(x, y, width = 45, height = 45, type = "ufo", moveAngle = 1, angle = 0, speed = 3, rotation = 0) {
        super(width, height, x, y, type, moveAngle, angle, speed, rotation)
        this.createDomElement();
    }
    attractToCenter() {
        //TODO: refactor to relative units
        setInterval(() => {
            if ((this.x < 50 && this.x > 750) || (this.y < 50 && this.y > 750)) {
                this.x = this.x < 400 ? this.x + 1 : this.x - 1
                this.y = this.y < 400 ? this.y + 1 : this.y - 1
                this.domElement.style.left = this.x + "px";
                this.domElement.style.bottom = this.y + "px";
            }
        }, 50)
    }

    move() {
        setInterval(() => {
            this.attractToCenter()
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
    destroy() {
        this.domElement.classList.add("destroyed")
        this.x = -300
        this.y = -300
        this.speed = 0
        this.domElement.remove()
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
        let audio = new Audio('./assets/sounds/impact.mp3');
        if (sound === "explosion") {
            audio = new Audio('./assets/sounds/explosion.mp3');
        }
        audio.play();
        const { x, y, r } = this.getCurrentPosition()
        this.destroy()
        this.createDummy(+x, +y, +r)
    }

    getCurrentPosition() {
        const position = { x: "" + this.x, y: "" + this.y, r: "" + this.rotation }
        return position
    }

}