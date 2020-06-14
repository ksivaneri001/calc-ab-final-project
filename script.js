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

let questions = [1,2,3,4,5,6,7,8,9,10]

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
        {x: 285, y: 305.75, width: 20, height: canvas.height/4},
        {x: 285, y: 53.75, width: 20, height: canvas.height/2.1},
        {x: 485, y: 0, width: 20, height: canvas.height/3.1},
        {x: 485, y: 180.75, width: 20, height: canvas.height},
        {x: 0, y: 0, width: 75, height: canvas.height/2.5},
        {x: 0, y: 270, width: 75, height: canvas.height/2.5},
        {x: canvas.width - 75, y: 0, width: canvas.width - 75, height: canvas.height/2.5},
        {x: canvas.width - 75, y: 270, width: canvas.width - 75, height: canvas.height/2.5},
    ]
];

let enemies = [
    [
        {x: 640, y: 225, radius: 10, setPoint1: 100, setPoint2: 720, speedX: 3.5, type: "X"},
        {x: 460, y: 175, radius: 10, setPoint1: 100, setPoint2: 720, speedX: 3.5, type: "X"},
        {x: 280, y: 125, radius: 10, setPoint1: 100, setPoint2: 720, speedX: 3.5, type: "X"},
        {x: 100, y: 75, radius: 10, setPoint1: 100, setPoint2: 720, speedX: 3.5, type: "X"},
        {x: 200, y: 225, radius: 8, setPoint1: 75, setPoint2: 225, speedY: 2.5, type: "Y"},
        {x: 300, y: 225, radius: 8, setPoint1: 75, setPoint2: 225, speedY: 2.5, type: "Y"},
        {x: 400, y: 225, radius: 8, setPoint1: 75, setPoint2: 225, speedY: 2.5, type: "Y"},
        {x: 500, y: 225, radius: 8, setPoint1: 75, setPoint2: 225, speedY: 2.5, type: "Y"},
        {x: 600, y: 225, radius: 8, setPoint1: 75, setPoint2: 225, speedY: 2.5, type: "Y"},
    ],
    [
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
        {x: 600, y: 100, radius: 8, setPointTL: 550, setPointBL: 180, setPointBR: 750, setPointTR: 20, speedX: -2, speedY: 0, speedInit: 5, type: "CCW"},
        {x: 400, y: 100, radius: 8, setPointTL: 350, setPointBL: 180, setPointBR: 550, setPointTR: 20, speedX: -2, speedY: 0, speedInit: 5, type: "CCW"},
        {x: 200, y: 100, radius: 8, setPointTL: 150, setPointBL: 180, setPointBR: 350, setPointTR: 20, speedX: -2, speedY: 0, speedInit: 5, type: "CCW"},
    ],
    [
        {x: 100, y: 205, radius: 12, setPoint1: 100, setPoint2: 660, speedX: 4, type: "X"},
        {x: 660, y: 245, radius: 12, setPoint1: 100, setPoint2: 660, speedX: 4, type: "X"},
        {x: 440, y: 205, radius: 8, setPoint1: 200, setPoint2: 250, speedY: 1, type: "Y"},
        {x: 200, y: 205, radius: 8, setPoint1: 200, setPoint2: 250, speedY: 1, type: "Y"},
        {x: 680, y: 205, radius: 8, setPoint1: 200, setPoint2: 250, speedY: 1, type: "Y"},
    ],
    [
        {x: 600, y: 360, radius: 8, setPoint1: 90, setPoint2: 360, speedY: 4, type: "Y"},
        {x: 500, y: 360, radius: 8, setPoint1: 90, setPoint2: 360, speedY: 4, type: "Y"},
        {x: 400, y: 360, radius: 8, setPoint1: 90, setPoint2: 360, speedY: 4, type: "Y"},
        {x: 300, y: 360, radius: 8, setPoint1: 90, setPoint2: 360, speedY: 4, type: "Y"},
        {x: 200, y: 360, radius: 8, setPoint1: 90, setPoint2: 360, speedY: 4, type: "Y"},
        {x: 400, y: 360, radius: 8, setPointTR: 450, setPointBR: 360, setPointBL: 350, setPointTL: 100, speedX: -2.5, speedY: 0, speedInit: 2.5, type: "CW"},
        {x: 600, y: 100, radius: 8, setPointTL: 500, setPointBL: 360, setPointBR: 600, setPointTR: 100, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
        {x: 300, y: 100, radius: 8, setPointTL: 200, setPointBL: 360, setPointBR: 300, setPointTR: 100, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
    ],
    [
        {x: 400, y: 390, radius: 8, setPointTR: 450, setPointBR: 390, setPointBL: 350, setPointTL: 60, speedX: -4.5, speedY: 0, speedInit: 4.5, type: "CW"},
        {x: 650, y: 390, radius: 8, setPointTR: 700, setPointBR: 390, setPointBL: 600, setPointTL: 60, speedX: -4.5, speedY: 0, speedInit: 4.5, type: "CW"},
        {x: 150, y: 390, radius: 8, setPointTR: 200, setPointBR: 390, setPointBL: 100, setPointTL: 60, speedX: -4.5, speedY: 0, speedInit: 4.5, type: "CW"},
        {x: 700, y: 70, radius: 10, setPoint1: 100, setPoint2: 700, speedX: 4, type: "X"},
        {x: 100, y: 110, radius: 10, setPoint1: 100, setPoint2: 700, speedX: 4, type: "X"},
        {x: 700, y: 380, radius: 10, setPoint1: 100, setPoint2: 700, speedX: 4, type: "X"},
        {x: 100, y: 340, radius: 10, setPoint1: 100, setPoint2: 700, speedX: 4, type: "X"},
        {x: 450, y: 360, radius: 10, setPoint1: 60, setPoint2: 390, speedY: 4, type: "Y"},
        {x: 350, y: 360, radius: 10, setPoint1: 60, setPoint2: 390, speedY: 4, type: "Y"},
    ],
    [
        {x: 710, y: 130, radius: 8, setPointTL: 520, setPointBL: 325, setPointBR: 710, setPointTR: 130, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
        {x: 270, y: 130, radius: 8, setPointTL: 90, setPointBL: 325, setPointBR: 270, setPointTR: 130, speedX: -4, speedY: 0, speedInit: 4, type: "CCW"},
        {x: 320, y: 325, radius: 8, setPointTR: 470, setPointBR: 325, setPointBL: 320, setPointTL: 130, speedX: -4, speedY: 0, speedInit: 4, type: "CW"},
        {x: 135, y: 325, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 225, y: 130, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 567.5, y: 325, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 662.5, y: 130, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 357.5, y: 325, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 432.5, y: 130, radius: 10, setPoint1: 130, setPoint2: 325, speedY: 4, type: "Y"},
        {x: 320, y: 285, radius: 10, setPoint1: 320, setPoint2: 470, speedX: 2.5, type: "X"},
        {x: 470, y: 165, radius: 10, setPoint1: 320, setPoint2: 470, speedX: 2.5, type: "X"},
    ]
];

let winZones = [
    {x: 650, y: 325, width: 100, height: 75},
    {x: 50, y: 0, width: 80, height: 75},
    {x: 700, y: 175, width: 100, height: 200},
    {x: 700, y: 175, width: 100, height: 200},
    {x: 725, y: 175, width: 50, height: 200},
    {x: 725, y: 175, width: 50, height: 200}
];

let condition = false;
let index;
let level = 0;
let speed = 2;
let dx;
let dy;
let gameState = "off"; // either "off", "level", or "question" to denote where the player is in the game
let hardMode = false;

setInterval(game, 10);

window.onload = function() {
    init();
    game();
};

document.addEventListener("keydown", getKeydown);
document.addEventListener("keyup", getKeyup);

function init() {
    level = 0;
    player.x = spawn[level].x;
    player.y = spawn[level].y;
    hardMode = false;
    gameState = "level";
}

function game() { // basically a tick counter, each tick is 1/100 of a second
    ctx.fillStyle = (hardMode) ? "#ffca9e" : "#d1f3ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // console.log("x:" + player.x);
    // console.log("y:" + player.y);

    if (gameState === "level") {
        drawLevel(level);
        collisionDetection(level);
        hitDetection(level);
        move();
        enemyMovement(level);
    }
    else if (gameState === "question") {
        for(i = 0; i < questions.length; i++) {
          if(questions[i] != -1) {
            condition = false;
            break;
          }
          else {
            condition = true;
          }
        }
        if(condition = true) {
          condition = false;
          for(i = 0; i < questions.length; i++) {
            questions[i] = i+1;
          }
        }
        while(1 = 1) {
          index = (Math.random()*questions.length);
          Math.round(index);
          if(questions[index] != -1) {
            break;
          }
        }
        if(index == 1) {
          questions[index-1] = -1
          //put question 1 on canvas
        }
        if(index == 2) {
          questions[index-1] = -1
          //put question 2 on canvas
        }
        if(index == 3) {
          questions[index-1] = -1
          //put question 3 on canvas
        }
        if(index == 4) {
          questions[index-1] = -1
          //put question 4 on canvas
        }
        if(index == 5) {
          questions[index-1] = -1
          //put question 5 on canvas
        }
        if(index == 6) {
          questions[index-1] = -1
          //put question 6 on canvas
        }
        if(index == 7) {
          questions[index-1] = -1
          //put question 7 on canvas
        }
        if(index == 8) {
          questions[index-1] = -1
          //put question 8 on canvas
        }
        if(index == 9) {
          questions[index-1] = -1
          //put question 9 on canvas
        }
        if(index == 10) {
          questions[index-1] = -1
          //put question 10 on canvas
        }
    }
    else if (gameState === "respawn") {
        drawLevel(level);
        enemyMovement(level);
    }
}

function clearTest() {
    player.x = spawn[level + 1].x;
    player.y = spawn[level + 1].y;
    level++;
}

function drawLevel(a) {
    for (let i = 0; i < terrain[a].length; i++) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(winZones[a].x, winZones[a].y, winZones[a].width, winZones[a].height);
    }

    if (gameState === "level") {
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.length, player.length);
        ctx.strokeRect(player.x, player.y, player.length, player.length);
    }

    for (let i = 0; i < terrain[a].length; i++) {
        ctx.fillStyle = (hardMode) ? "#f08832" : "#5fb1cf";
        ctx.fillRect(terrain[a][i].x, terrain[a][i].y, terrain[a][i].width, terrain[a][i].height);
    }

    for (let i = 0; i < enemies[a].length; i++) {
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(enemies[a][i].x, enemies[a][i].y, enemies[a][i].radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.font = "24px Arial";
    let difficultyText = (hardMode) ? "Hard" : "Normal";
    ctx.fillText("Difficulty: " + difficultyText, canvas.width - 5, 25);

    if (gameState === "respawn") {
        ctx.textAlign = "center";
        ctx.font = "48px Arial";
        ctx.fillText("Respawning...", canvas.width / 2, canvas.height / 2);
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

function hitDetection(d) {
    for (let i = 0; i < enemies[d].length; i++) {
        if (Math.abs(enemies[d][i].x - (player.x + (player.length / 2))) < (player.length / 2) + enemies[d][i].radius && Math.abs(enemies[d][i].y - (player.y + (player.length / 2))) < (player.length / 2) + enemies[d][i].radius) {
            player.x = spawn[level].x;
            player.y = spawn[level].y;
            gameState = "respawn";
            setTimeout(function() { gameState = "level"; }, 1000);
        }
    }
}

function enemyMovement(c) {
    for (let i = 0; i < enemies[c].length; i++) {
        switch (enemies[c][i].type) {
            case "X":
                enemies[c][i].speedX = (enemies[c][i].x < enemies[c][i].setPoint1) ? Math.abs(enemies[c][i].speedX) : (enemies[c][i].x > enemies[c][i].setPoint2) ? Math.abs(enemies[c][i].speedX) * -1 : enemies[c][i].speedX;
                enemies[c][i].x += (!hardMode) ? enemies[c][i].speedX : (enemies[c][i].speedX < 0) ? enemies[c][i].speedX - 1 : enemies[c][i].speedX + 1;
                break;
            case "Y":
                enemies[c][i].speedY = (enemies[c][i].y < enemies[c][i].setPoint1) ? Math.abs(enemies[c][i].speedY) : (enemies[c][i].y > enemies[c][i].setPoint2) ? Math.abs(enemies[c][i].speedY) * -1 : enemies[c][i].speedY;
                enemies[c][i].y += (!hardMode) ? enemies[c][i].speedY : (enemies[c][i].speedY < 0) ? enemies[c][i].speedY - 1 : enemies[c][i].speedY + 1;
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
                enemies[c][i].x += (!hardMode || enemies[c][i].speedX == 0) ? enemies[c][i].speedX : (enemies[c][i].speedX < 0) ? enemies[c][i].speedX - 1 : enemies[c][i].speedX + 1;
                enemies[c][i].y += (!hardMode || enemies[c][i].speedY == 0) ? enemies[c][i].speedY : (enemies[c][i].speedY < 0) ? enemies[c][i].speedY - 1 : enemies[c][i].speedY + 1;
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
                enemies[c][i].x += (!hardMode || enemies[c][i].speedX == 0) ? enemies[c][i].speedX : (enemies[c][i].speedX < 0) ? enemies[c][i].speedX - 1 : enemies[c][i].speedX + 1;
                enemies[c][i].y += (!hardMode || enemies[c][i].speedY == 0) ? enemies[c][i].speedY : (enemies[c][i].speedY < 0) ? enemies[c][i].speedY - 1 : enemies[c][i].speedY + 1;
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
