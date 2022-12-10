class Building extends Item {
    constructor(width, height, x, y, type = "building") {
        super(width, height, x, y, type)
        this.health = 3;
        this.createDomElement();
    }
    takeDamage() {
        this.domElement.className = `building ${this.health > 0 ? "building-hp" + this.health : " building-destroyed"}`
        this.health = this.health - 1
        if (this.health < 0) {
            this.x = -100
            this.y = -100
        }
    }
}



