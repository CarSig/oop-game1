
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
    destroy() {
        this.domElement.classList.add("destroyed")
        this.x = -300
        this.y = -300
        this.speed = 0
        this.domElement.remove()

        //? UFOarr.splice(UFOarr.indexOf(this), 1)

        //* before writing this code, I had a bug where the bullets and UFOs would start moving slower and slower.
        // I found out that the UFOs were not being removed from the UFOarr array, so I wrote this code to remove them.
        // However, when I did this, there was no collision between the UFOs and bullets.Also, all elements were removed from Array
        // collision with buildings and player still worked fine.

        // When I commented out the code above, everything worked fine again. I'm not sure why this is happening.
        // UFO s are not removed from the UFOarr array,but during the game maximum number in array is approx 50


        //*  UFO collision with bullets and player is handled from UFO class, and with bullets from bullet class
        // However, code seems fine there, copied bellow for reference
        //checkUFOCollision() {
        // UFOarr.forEach((UFOinstance) => {
        //     const isCollision = detectCollision(this,         UFOinstance)
        //     if (isCollision) {
        //         player.scorePoints()
        //         UFOinstance.destroyAndCreateDummy("explosion")
        //         this.destroy()
        //     }
        // }) 

        // the only difference us that destroyAndCreate dummy with bullets is called with "explosion" argument, and others are without, but there is default value for argument in the function("impact")") 

        // I'm not sure what is causing this bug, but I'm sure it's something to do with the way I'm removing the UFOs from the array.

        // it is also strange that when i remove with splice, all UFOs are removed


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