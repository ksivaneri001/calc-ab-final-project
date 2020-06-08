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

let terrain = [ // each array in the terrain array is a level
    [],
    [],
    [],
    [],
    [],
    []
]

let currentLevel = 1;
const speed = 2;
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

function game() { // basically a tick counter, each tick is 1/100 of a second
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();

    if (gameState === "level") {
        collisionDetection(currentLevel - 1);
        move();
    }
    else if (gameState === "question") {
        // put stuff here
    }
}

function draw() {
    ctx.strokeRect(player.x, player.y, player.length, player.length);
}

function collisionDetection(level) {
    for (let i = 0; i < terrain[level].length; i++) {

    }

    if (player.x < 0) {
        player.x = 0;
    }
    else if (player.x + player.length > canvas.width) {
        player.x = canvas.width - player.length;
    }

    if (player.y < 0) {
        player.y = 0;
    }
    else if (player.y + player.length > canvas.height) {
        player.y = canvas.height - player.length;
    }
}

function move() {
    if (player.left) {
        dx = -1 * speed;
    }
    else if (player.right) {
        dx = speed;
    }
    else {
        dx = 0;
    }

    if (player.up) {
        dy = -1 * speed;
    }
    else if (player.down) {
        dy = speed;
    }
    else {
        dy = 0;
    }

    player.x += dx;
    player.y += dy;
}

function createTerrain() {
    
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
