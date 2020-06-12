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

let spawn = [
    {x: 100 - (player.length / 2), y: canvas.height - 100 - player.length},
    {x: 100 - (player.length / 2), y: canvas.height - 100 - player.length},
    {x: 50, y: 225},
    {x: 50, y: 225},
    {x: 50, y: 225},
    {x: 50, y: 225}
]

let terrain = [ // each array in the terrain array is a level
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 750, y: 0, width: 50, height: canvas.height},
        {x: 150, y: 250, width: 500, height: 150},
        {x: 0, y: 0, width: canvas.width, height: 50},
        {x: 0, y: 400, width: canvas.width, height: 50}
    ],
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 0, y: 200, width: canvas.width-40, height: 50}
    ],
    [
        {x: 0, y: 0, width: canvas.width, height: canvas.height/3},
        {x: 0, y: 300, width: canvas.width, height: canvas.height/3},
        {x: 0, y: 150, width: canvas.width/3, height: 30},
        {x: 300, y: 150, width: canvas.width, height: 30},
        {x: 0, y: 270, width: canvas.width/1.5, height: 30},
        {x: 565, y: 270, width: canvas.width/2, height: 30}
    ],
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 750, y: 0, width: 50, height: canvas.height},
        {x: 0, y: 0, width: 150, height: canvas.height/2.5},
        {x: 0, y: 270, width: 150, height: canvas.height/2.5},
        {x: 0, y: 0, width: canvas.width, height: canvas.height/6},
        {x: 0, y: 375, width: canvas.width, height: canvas.height/6},
        {x: canvas.width - 150, y: 0, width: canvas.width - 150, height: canvas.height/2.5},
        {x: canvas.width - 150, y: 270, width: canvas.width - 150, height: canvas.height/2.5},
    ],
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 750, y: 0, width: 50, height: canvas.height},
        {x: 0, y: 0, width: 75, height: canvas.height/2.5},
        {x: 0, y: 270, width: 75, height: canvas.height/2.5},
        {x: 0, y: 0, width: canvas.width, height: canvas.height/10},
        {x: 0, y: 405, width: canvas.width, height: canvas.height/10},
        {x: canvas.width - 75, y: 0, width: canvas.width - 75, height: canvas.height/2.5},
        {x: canvas.width - 75, y: 270, width: canvas.width - 75, height: canvas.height/2.5},
        {x: 225, y: 135, width: 100, height: canvas.height/2.5},
        {x: 475, y: 135, width: 100, height: canvas.height/2.5},
    ],
    [
        {x: 0, y: 0, width: 50, height: canvas.height},
        {x: 750, y: 0, width: 50, height: canvas.height},
        {x: 0, y: 0, width: canvas.width, height: canvas.height/4},
        {x: 0, y: 337.5, width: canvas.width, height: canvas.height/4},
        {x: 285, y: 0, width: 20, height: canvas.height/2.1},
        {x: 285, y: 253.75, width: 20, height: canvas.height},
        {x: 485, y: 0, width: 20, height: canvas.height/2.1},
        {x: 485, y: 253.75, width: 20, height: canvas.height},
        {x: 0, y: 0, width: 75, height: canvas.height/2.5},
        {x: 0, y: 270, width: 75, height: canvas.height/2.5},
        {x: canvas.width - 75, y: 0, width: canvas.width - 75, height: canvas.height/2.5},
        {x: canvas.width - 75, y: 270, width: canvas.width - 75, height: canvas.height/2.5},
    ]
];

let enemies = [
    [
        // test enemies //
        {x: 150, y: 100, radius: 8, setPoint1: 100, setPoint2: 200, speedX: 2, type: "X"},
        {x: 200, y: 150, radius: 8, setPoint1: 100, setPoint2: 200, speedY: 3, type: "Y"},
        {x: 400, y: 200, radius: 8, setPointTR: 450, setPointBR: 200, setPointBL: 350, setPointTL: 100, speedX: -1.5, speedY: 0, speedInit: 1.5, type: "CW"},
        {x: 600, y: 100, radius: 8, setPointTL: 550, setPointBL: 200, setPointBR: 650, setPointTR: 100, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
        //////////////////

    ],
    [
      {x: 150, y: 100, radius: 8, setPoint1: 100, setPoint2: 200, speedX: 2, type: "X"},
      {x: 150, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 200, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 250, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 300, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 350, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 400, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 450, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 500, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 550, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 600, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 650, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 700, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 750, y: 300, radius: 8, setPoint1: 260, setPoint2: 444, speedY: 5, type: "Y"},
      {x: 400, y: 200, radius: 8, setPointTR: 450, setPointBR: 200, setPointBL: 350, setPointTL: 100, speedX: -1.5, speedY: 0, speedInit: 1.5, type: "CW"},
      {x: 600, y: 100, radius: 8, setPointTL: 550, setPointBL: 200, setPointBR: 650, setPointTR: 100, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
    ],
    [],
    [],
    [],
    []
];

let winZones = [
    {x: 650, y: 325, width: 100, height: 75},
    {x: 50, y: 0, width: 100, height: 75},
    {x: 700, y: 175, width: 100, height: 200},
    {x: 700, y: 175, width: 100, height: 200},
    {x: 725, y: 175, width: 50, height: 200},
    {x: 725, y: 175, width: 50, height: 200}
];

let level = 0;
let speed = 2;
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
    level = 1;
    player.x = spawn[level].x
    player.y = spawn[level].y
    hardMode = false;
    gameState = "level";
}

function game() { // basically a tick counter, each tick is 1/100 of a second
    ctx.fillStyle = "#d1f3ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("x:" + player.x)
    console.log("y:" + player.y)
    if (gameState === "level") {
        drawLevel(level);
        collisionDetection(level);
        move();
        enemyMovement(level);
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

    for (let i = 0; i < enemies[a].length; i++) {
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(enemies[a][i].x, enemies[a][i].y, enemies[a][i].radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
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

    if (player.x >= winZones[b].x && player.x + player.length <= winZones[b].x + winZones[b].width && player.y >= winZones[b].y && player.y + player.length <= winZones[b].y + winZones[b].height) {
        gameState = "question";
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

function enemyMovement(c) {
    for (let i = 0; i < enemies[c].length; i++) {
        switch (enemies[c][i].type) {
            case "X":
                enemies[c][i].speedX = (enemies[c][i].x < enemies[c][i].setPoint1) ? Math.abs(enemies[c][i].speedX) : (enemies[c][i].x > enemies[c][i].setPoint2) ? Math.abs(enemies[c][i].speedX) * -1 : enemies[c][i].speedX;
                enemies[c][i].x += enemies[c][i].speedX;
                break;
            case "Y":
                enemies[c][i].speedY = (enemies[c][i].y < enemies[c][i].setPoint1) ? Math.abs(enemies[c][i].speedY) : (enemies[c][i].y > enemies[c][i].setPoint2) ? Math.abs(enemies[c][i].speedY) * -1 : enemies[c][i].speedY;
                enemies[c][i].y += enemies[c][i].speedY;
                break;
            case "CW":
                if (enemies[c][i].speedX > 0 && enemies[c][i].speedY == 0 && enemies[c][i].x > enemies[c][i].setPointTR) {
                    enemies[c][i].speedX = 0;
                    enemies[c][i].speedY = enemies[c][i].speedInit;
                }
                else if (enemies[c][i].speedX == 0 && enemies[c][i].speedY > 0 && enemies[c][i].y > enemies[c][i].setPointBR) {
                    enemies[c][i].speedX = enemies[c][i].speedInit * -1;
                    enemies[c][i].speedY = 0;
                }
                else if (enemies[c][i].speedX < 0 && enemies[c][i].speedY == 0 && enemies[c][i].x < enemies[c][i].setPointBL) {
                    enemies[c][i].speedX = 0;
                    enemies[c][i].speedY = enemies[c][i].speedInit * -1;
                }
                else if (enemies[c][i].speedX == 0 && enemies[c][i].speedY < 0 && enemies[c][i].y < enemies[c][i].setPointTL) {
                    enemies[c][i].speedX = enemies[c][i].speedInit;
                    enemies[c][i].speedY = 0;
                }
                enemies[c][i].x += enemies[c][i].speedX;
                enemies[c][i].y += enemies[c][i].speedY;
                break;
            case "CCW":
                if (enemies[c][i].speedX < 0 && enemies[c][i].speedY == 0 && enemies[c][i].x < enemies[c][i].setPointTL) {
                    enemies[c][i].speedX = 0;
                    enemies[c][i].speedY = enemies[c][i].speedInit;
                }
                else if (enemies[c][i].speedX == 0 && enemies[c][i].speedY > 0 && enemies[c][i].y > enemies[c][i].setPointBL) {
                    enemies[c][i].speedX = enemies[c][i].speedInit;
                    enemies[c][i].speedY = 0;
                }
                else if (enemies[c][i].speedX > 0 && enemies[c][i].speedY == 0 && enemies[c][i].x > enemies[c][i].setPointBR) {
                    enemies[c][i].speedX = 0;
                    enemies[c][i].speedY = enemies[c][i].speedInit * -1;
                }
                else if (enemies[c][i].speedX == 0 && enemies[c][i].speedY < 0 && enemies[c][i].y < enemies[c][i].setPointTR) {
                    enemies[c][i].speedX = enemies[c][i].speedInit * -1;
                    enemies[c][i].speedY = 0;
                }
                enemies[c][i].x += enemies[c][i].speedX;
                enemies[c][i].y += enemies[c][i].speedY;
                break;
            default:
                break;
        }
    }
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
