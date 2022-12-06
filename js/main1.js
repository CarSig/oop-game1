class Player {
    constructor() {
        this.width = 1;
        this.height = 2;
        this.positionX = 50 - (this.width / 2);
        this.positionY = 0;

        this.speed = 0;
        this.domElement = null;
        this.directionEl = document.createElement('h3')
        this.createDomElement();

        this.direction = 32;

        this.angle = 0;
        this.moveAngle = 0;


    }

    newPos() {

        // 0 ravno, 2 ostro na stranu desno, 3 malo
        this.positionX += this.speed * Math.sin(3.5);
        this.positionY -= this.speed * Math.cos(3.5);
        this.angle += this.moveAngle * Math.PI / 180;

        console.log("x: " + this.positionX + " y: " + this.positionY, "angle: " + this.angle, "speed: " + this.speed, "moveAngle: " + this.moveAngle);
    }











    moveForward() {
        this.positionX += this.speed * Math.cos(angle * Math.PI / 180);
        this.positionY += this.speed * Math.sin(angle * Math.PI / 180);
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
    }

    createDomElement() {




        // destroy old     element
        if (this.domElement) {
            this.domElement.remove();

        }
        // step1: create the element:
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);

        this.directionEl.style.width = '10vw';
        this.directionEl.style.height = '10vh';
        this.directionEl.style.backgroundColor = 'white';
        this.directionEl.style.position = 'absolute';
        this.directionEl.id = 'direction';
        this.directionEl.innerHTML = this.direction;
        boardElm.appendChild(this.directionEl);
    }

    // moveLeft() {
    //     this.positionX = this.positionX - (5 + this.speed);
    //     this.domElement.style.left = this.positionX + "px";
    // }

    // moveRight() {
    //     this.positionX = this.positionX + (5 + this.speed);
    //     this.domElement.style.left = this.positionX + "px";
    // }


    // moveForward() {

    //     this.positionY = this.positionY + (5 + this.speed)
    //     this.domElement.style.top = this.positionY + 'px';
    // }


    // moveBackward() {
    //     this.positionY = this.positionY - (5 + this.speed)
    //     this.domElement.style.top = this.positionY + 'px';
    // }
    moveLeft() {
        this.direction = this.direction - 5;
        this.directionEl.innerHTML = this.direction;
    }

    moveRight() {
        this.direction = this.direction + 5;
        this.directionEl.innerHTML = this.direction;
    }






    accelerate() {

        this.speed += 1;

    }
    displaySpeed() {
        console.log(this.speed);
    }
    turnLeft() {
        this.direction = this.direction + 10;
        this.domElement.style.transform = 'rotate(90deg)';






        console.log(this.direction);
    }
    turnRight() {
        this.domElement.style.transform = 'rotate(-90deg)';
    }
}

//////////////////////////



const player = new Player();

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        player.moveRight();
    } else if (event.key === "ArrowLeft") {
        player.moveLeft();
    }
});




document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowLeft":
            player.moveAngle = -1
            break;
        case "ArrowRight":
            player.moveAngle = 1
            break;
        case "ArrowUp":
            player.speed = 1;
            console.log("dsd")
            break;
        case "ArrowDown":
            player.speed = -1;
            break;
        case "a":



    }
    player.newPos();
    player.createDomElement()
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case "ArrowUp" || "ArrowDown" || "ArrowLeft" || "ArrowRight":
            player.speed = 0;

            break;
    }
    player.displaySpeed()
});












function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {
        myGamePiece.moveAngle = -1;
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.moveAngle = 1;
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speed = 1;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speed = -1;
    }
    myGamePiece.newPos();
    myGamePiece.update();

}


