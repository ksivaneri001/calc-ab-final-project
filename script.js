const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

let player = {
    x: null,
    y: null,
    length: 16,
    left: false,
    right: false,
    up: false,
    down: false
};

let terrain = [ // each array in the terrain array is a level
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 750, y: 0, width: 50, height: canvas.height},
        {x: 150, y: 250, width: 500, height: 150},
        {x: 0, y: 0, width: canvas.width, height: 50},
        {x: 0, y: 400, width: canvas.width, height: 50}
    ],
    [],
    [],
    [],
    [],
    []
];

let enemies = [
    [

    ],
    [],
    [],
    [],
    [],
    []
];

let winZones = [
    {x: 650, y: 325, width: 100, height: 75}
];

let level = 0;
const speed = 2;
let dx;
let dy;
let gameState = "off"; // either "off", "level", or "question" to denote where the platyer is in the game
let hardMode = false;

setInterval(game, 10);

window.onload = function() {
    init();
    game();
};

document.addEventListener("keydown", getKeydown);
document.addEventListener("keyup", getKeyup);

function init() {
    player.x = 100 - (player.length / 2);
    player.y = canvas.height - 100 - player.length;
    level = 0;
    hardMode = false;
    gameState = "level";
}

function game() { // basically a tick counter, each tick is 1/100 of a second
    ctx.fillStyle = "#d1f3ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState === "level") {
        drawLevel(level);
        collisionDetection(level);
        move();
    }
    else if (gameState === "question") {
        // put stuff here
    }
}

function drawLevel(a) {
    for (let i = 0; i < terrain[a].length; i++) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(winZones[a].x, winZones[a].y, winZones[a].width, winZones[a].height);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.length, player.length);
    ctx.strokeRect(player.x, player.y, player.length, player.length);

    for (let i = 0; i < terrain[a].length; i++) {
        ctx.fillStyle = "#5fb1cf";
        ctx.fillRect(terrain[a][i].x, terrain[a][i].y, terrain[a][i].width, terrain[a][i].height);
    }
}

function collisionDetection(b) {
    for (let i = 0; i < terrain[b].length; i++) {
        if (player.x < terrain[b][i].x + terrain[b][i].width && player.x > terrain[b][i].x && player.y + player.length - (speed * 3) > terrain[b][i].y && player.y + (speed * 3) < terrain[b][i].y + terrain[b][i].height) {
            player.x = terrain[b][i].x + terrain[b][i].width;
        }
        else if (player.x + player.length > terrain[b][i].x && player.x + player.length < terrain[b][i].x + terrain[b][i].width && player.y + player.length - (speed * 3) > terrain[b][i].y && player.y + (speed * 3) < terrain[b][i].y + terrain[b][i].height) {
            player.x = terrain[b][i].x - player.length;
        }
        else if (player.y < terrain[b][i].y + terrain[b][i].height && player.y > terrain[b][i].y && player.x + player.length - (speed * 3) > terrain[b][i].x && player.x + (speed * 3) < terrain[b][i].x + terrain[b][i].width) {
            player.y = terrain[b][i].y + terrain[b][i].height;
        }
        else if (player.y + player.length > terrain[b][i].y && player.y + player.length < terrain[b][i].y + terrain[b][i].height && player.x + player.length - (speed * 3) > terrain[b][i].x && player.x + (speed * 3) < terrain[b][i].x + terrain[b][i].width) {
            player.y = terrain[b][i].y - player.length;
        }
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
