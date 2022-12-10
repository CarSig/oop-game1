const buildings = [new Building(150, 150, 420, 270), new Building(80, 80, 950, 355), new Building(80, 80, 385, 550)]
const player = new Player();

const isGameOver = () => {
    const buildingsAlive = buildings.some(building => building.health > 0)
    if (!buildingsAlive) {
        window.location.href = './game-over.html';
    }
}

const soundtrack = new Audio("./assets/sounds/soundtrack.ogg")
soundtrack.play()

const detectCollision = (actor, target) => {
    const collision = actor.x < target.x + target.width &&
        actor.x + actor.width > target.x &&
        actor.y < target.y + target.height &&
        actor.height + actor.y > target.y
    isGameOver()
    return collision
}



// event listeners

document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            player.arrow.up = false;
            player.acceleration = 0;

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
        case " ":
            player.arrow.spaceBar = false
    }
});


document.addEventListener('keydown', function (event) {
    player.moveAngle = 0;
    player.speed = 0;

    const audioShot = new Audio('./assets/sounds/tank-shot.mp3');

    switch (event.key) {
        case "ArrowUp": player.arrow.up = true;
            break;
        case "ArrowDown": player.arrow.down = true;
            break;
        case "ArrowLeft": player.arrow.left = true

            break;
        case "ArrowRight": player.arrow.right = true

            break;
        case "w": player.arrow.canonLeft = true;

            break;
        case "q": player.arrow.canonRight = true;


            break;
        case " ":
            if (player.shootingEnabled) { audioShot.play(); }
            player.arrow.spaceBar = true
            break

    }

    player.move()
    player.rotateCannon()
    player.shot()

});





