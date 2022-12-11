
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', function (event) {
    // go to game page
    window.location.href = './game.html';

})
const soundtrack = new Audio("./assets/sounds/soundtrack.ogg")
soundtrack.play()
soundtrack.volume = 0.3