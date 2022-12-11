const buildings = [new Building(150, 150, 420, 270), new Building(80, 80, 950, 355), new Building(80, 80, 385, 550)]
const player = new Player();
const UFOarr = []
const rocketsArr = [];
const audioShot = new Audio('./assets/sounds/tank-shot.mp3');


const isGameOver = () => {
    const buildingsAlive = buildings.some(building => building.health > 0)
    if (!buildingsAlive) {
        window.location.href = './game-over.html';
    }
}


const detectCollision = (actor, target) => {
    const collision = actor.x < target.x + target.width &&
        actor.x + actor.width > target.x &&
        actor.y < target.y + target.height &&
        actor.height + actor.y > target.y
    // isGameOver()
    return collision
}

const createUFO = () => {
    const { x, y } = getUFOstartPosition();
    let newUFO = new UFO(x, y);
    UFOarr.push(newUFO);
    newUFO.move();
}
let counterInterval = 1
let intSpeed = 2000
setInterval(() => {
    if (counterInterval % 5 === 0) {
        intSpeed = intSpeed > 1000 ? intSpeed - 100 : intSpeed
    }
    createUFO()
    counterInterval++
}, intSpeed);



const getUFOstartPosition = () => {
    const randomSide = Math.floor(Math.random() * 2) == 1 ? 0 : window.innerWidth * 0.8;
    const isXRandomSide = Math.floor(Math.random() * 2) === 1 ? true : false;
    const x = isXRandomSide ? randomSide : Math.floor(Math.random() * 1400);
    const y = isXRandomSide ? Math.floor(Math.random() * 760) : 750;
    return { x, y }
}

const handleScreenEdge = (element) => {
    if (element.x > window.innerWidth - 55 || element.x < -1 || element.y > window.innerHeight || element.y < 35) {
        element.destroy()
        return "destroyed"
    }
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
            break
        case "a":
            player.arrow.machineGun = false
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
        case "w": player.arrow.canonLeft = true;
            break;
        case "q": player.arrow.canonRight = true;
            break;
        case " ":
            if (player.shootingEnabled) { audioShot.play(); }
            player.arrow.spaceBar = true
            break
        case "a":
            player.arrow.machineGun = true
            break
    }

    player.move()
    player.rotateCannon()
    player.shot()
    player.machineGun()

});
document.addEventListener("resize", function () {
    const boardElm = document.getElementById("board");
    boardElm.style.width = window.innerWidth + "px";
    boardElm.style.height = window.innerHeight + "px";
})

//SOUNDS
const impact = new Audio('./assets/sounds/impact.mp3');
const explosion = new Audio('./assets/sounds/explosion.mp3')
const soundtrack = new Audio("./assets/sounds/soundtrack.ogg")
soundtrack.play()
soundtrack.volume = 0.5


const sliderMusic = document.getElementById("music-slider")
const sliderGameSounds = document.getElementById("game-sounds-slider")


sliderMusic.addEventListener("input", function () {
    soundtrack.volume = sliderMusic.value / 100
})
sliderGameSounds.addEventListener("input", function () {
    explosion.volume = sliderGameSounds.value / 100;
    impact.volume = sliderGameSounds.value / 100
    audioShot.volume = sliderGameSounds.value / 100
})

// document.onload = () => {
//     explosion.volume, impact.volume, audioShot.volume, soundtrack.volume = 1

// }
