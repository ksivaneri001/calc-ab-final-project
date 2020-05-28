const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
    x: 0,
    y: 0,
    length: 20
};

setInterval(game, 10);

window.onload = function() {
    init();
    game();
};

function init() {
    
}

function game() {

}
