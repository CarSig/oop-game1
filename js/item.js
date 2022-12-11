class Item {
    constructor(width, height, x, y, type) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        this.type = type;
        this.domElement = null;

    }
    createDomElement() {
        this.domElement = document.createElement('div');
        this.domElement.className = `${this.type}`;
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.bottom = this.y + "px";
        this.domElement.style.left = this.x + "px";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
}



class MovingItem extends Item {
    constructor(width, height, x, y, type, moveAngle, angle, speed, rotation) {
        super(width, height, x, y, type)
        this.moveAngle = moveAngle
        this.angle = angle;
        this.speed = speed
        this.rotation = rotation
    }
    destroy() {
        const removeLocation = this instanceof Rocket ? -100 : this instanceof UFO ? -200 : -300

        this.domElement.classList.add("destroyed")
        this.domElement.remove();
        this.x = removeLocation
        this.y = removeLocation
        this.speed = 0
    }
    handleScreenEdge() {
        if (this.x < 0 || this.x > window.innerWidth - 55 || this.y < 0 || this.y > window.innerHeight) {
            this.destroy()
        }
    }
}
