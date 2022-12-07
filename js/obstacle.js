

const detectCollision = (actor, target) => {
    const collision = actor.x < target.x + target.width &&
        actor.x + actor.width > target.x &&
        actor.y < target.y + target.height &&
        actor.height + actor.y > target.y


    if (
        collision
    ) {
        switch (actor.constructor) {
            case Bullet:
                console.log("bullet collision detected!!")
                actor.domElement.remove();
                return true;
                break;
            case Player:
                console.log("player collision detected!!")
                actor.speedLimit = 0
                console.log(actor.speedLimit)
                return true
                break;
            default: console.log("collision detected!!");
        }
    }
    return false
}


class Obstacle {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x
        this.y = y
        this.color = color;

        this.El = null;
        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element:
        this.El = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.El.className = "obstacle";
        this.El.style.width = this.width + "vw";
        this.El.style.height = this.height + "vh";
        this.El.style.bottom = this.y + "vh";
        this.El.style.left = this.x + "vw";
        // this.El.style.transformOrigin = "bottom";
        this.El.style.backgroundColor = this.color;

        this.El.className = "obstacle";
        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.El);
    }


}