const newGamePopup = document.getElementById("new-game-container");
const resultText = document.getElementById("result-text");

var cellSize = 25;
var rows = 20;
var cells = 20;
var board;
var ctx;

var snakeX = cellSize * 5;
var snakeY = cellSize * 5;

var speedX = 0;
var speedY = 0;

var foodX;
var foodY;

var snakeBody = [];

var gameOver = false;

function startNewGame() {
    resultText.innerHTML = "";
    snakeX = cellSize * 5;
    snakeY = cellSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    placeFood();
    gameOver = false;
    newGamePopup.classList.add("hide");
}


function placeFood() {
    foodX = Math.floor(Math.random() * cells) * cellSize;
    foodY = Math.floor(Math.random() * rows) * cellSize;
}

window.onload = function() {
    board = document.getElementById("gameBoard");
    board.height = rows * cellSize;
    board.width = cells * cellSize;
    ctx = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", snakeMovement);
    setInterval(drawEverything, 1000/10);
}

function setResultText(result) {
    resultText.innerHTML = `<p>${result}</p>`;
}

function colorRect(topX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(topX, topY, width, height);
}

function eatFood() {
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
}

function moveSnakeBody() {
    for (let i = snakeBody.length - 1; i > 0; --i) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
}

function drawSnakeBody() {
    for (let i = 0; i < snakeBody.length; ++i) {
        colorRect(snakeBody[i][0], snakeBody[i][1], cellSize, cellSize, 'lime');
    }
}

function checkGameOver() {
    if (snakeX < 0 || snakeX > cells * cellSize || snakeY < 0 || snakeY > rows * cellSize) {
        setEndGame();
    }

    for (let i = 0; i < snakeBody.length; ++i) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            setEndGame();
        }
    }
}

function setEndGame() {
    gameOver = true;
    newGamePopup.classList.remove("hide");
    setResultText("YOU LOST!!!");
}

function drawEverything() {
    if (gameOver) {
        return;
    }

    colorRect(0, 0, board.width, board.height, 'black');
    colorRect(foodX, foodY, cellSize, cellSize, 'red');
    eatFood();

    moveSnakeBody();

    snakeX += speedX * cellSize;
    snakeY += speedY * cellSize;
    colorRect(snakeX, snakeY, cellSize, cellSize, 'lime');

    drawSnakeBody();
    checkGameOver();
}

function snakeMovement(event) {
    if (event.code === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (event.code === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (event.code === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (event.code === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}