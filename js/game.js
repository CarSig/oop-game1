class Board {
    constructor() {
        this.width = 800;
        this.height = 800;
        this.domElement = null;
        this.createDomElement();
        console.log("here");
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.border = "13px solid red";

    }
}
