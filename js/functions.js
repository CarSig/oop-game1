// bullet

function createDomElement() {
    // create bullet
    this.domElement = document.createElement('div');
    this.domElement.className = "bullet";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.bottom = this.y + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
}