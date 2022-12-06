
// const detectCollision = (first, second) => {
//     if (
//         first.x < second.x + second.width &&
//         first.x + first.width > second.x &&
//         first.y < second.y + second.height &&
//         first.height + first.y > second.y
//     ) {
//         console.log("collision detected!!");
//     }
// }



















document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            player.arrow.up = false;
            player.acceleration = 0;
            player.decelerate();
            break;
        case 'ArrowDown':
            player.arrow.down = false;
            break;
        case 'ArrowLeft':
            player.arrow.left = false;
            break;
        case 'ArrowRight':
            player.arrow.right = false;
            break;
        case "w":
            player.arrow.canonLeft = false;
            break;
        case "q":
            player.arrow.canonRight = false;
            break;
    }
});


document.addEventListener('keydown', function (event) {
    player.moveAngle = 0;
    player.speed = 0;

    switch (event.key) {
        case "ArrowUp": player.arrow.up = true;
            break;
        case "ArrowDown": player.arrow.down = true;
            break;
        case "ArrowLeft": player.arrow.left = true
            break;
        case "ArrowRight": player.arrow.right = true
            break;
        case "w": player.cannonRotation += 3
            break;
        case "q": player.cannonRotation -= 3
            break;
        case " ": player.shot()
            console.log("shot")
            break

    }

    player.move()
    player.rotateCannon()
    // player.createDomElement();
});






const obstacles = [new Obstacle(10, 10, 55, 55, "#8f8"), new Obstacle(5, 8, 80, 10, "#88f")]
