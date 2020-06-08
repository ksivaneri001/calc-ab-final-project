const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
    x: 0,
    y: 0,
    length: 16,
    left: false,
    right: false,
    up: false,
    down: false
};

let dx;
let dy;
let gameState = "off"; // either "off", "level", or "question" to denote where the platyer is in the game

setInterval(game, 10);

window.onload = function() {
    init();
    game();
};

document.addEventListener("keydown", getKeydown);
document.addEventListener("keyup", getKeyup);

function init() {
    gameState = "level";
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();

    if (gameState === "level") {
        move();
    }
    else if (gameState === "question") {
        // put stuff here
    }
}

function draw() {
    ctx.strokeRect(player.x, player.y, player.length, player.length);
}

function move() {
    if (player.left) {
        dx = -3;
    }
    else if (player.right) {
        dx = 3;
    }
    else {
        dx = 0;
    }

    if (player.up) {
        dy = -3;
    }
    else if (player.down) {
        dy = 3;
    }
    else {
        dy = 0;
    }

    player.x += dx;
    player.y += dy;
}

function getKeydown(event) {
    if (event.keyCode == 37) {
        player.left = true;
        player.right = false;
    }
    if (event.keyCode == 38) {
        player.up = true;
        player.down = false;
    }
    else if (event.keyCode == 39) {
        player.right = true;
        player.left = false;
    }
    else if (event.keyCode == 40) {
        player.down = true;
        player.up = false;
    }
}

function getKeyup(event2) {
    if (event2.keyCode == 37) {
        player.left = false;
    }
    if (event2.keyCode == 38) {
        player.up = false;
    }
    else if (event2.keyCode == 39) {
        player.right = false;
    }
    else if (event2.keyCode == 40) {
        player.down = false;
    }
}
