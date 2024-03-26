// Seleccionar elementos del DOM
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector('.high-score');

// Variables del juego
let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;

// Mostrar la puntuación más alta en el DOM
highScoreElement.innerText = `High Score: ${highScore}`

// Función para cambiar la posición de la comida
const chageFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Función para manejar el final del juego
const handleGameOver = () => {
  alert("¡Game Over! Press OK to replay.");
};

// Función para cambiar la dirección del movimiento de la serpiente
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Función para inicializar el juego
const initGame = () => {
  let htmlMarkup = '';

  // Si el juego ha terminado, limpiar el intervalo y reiniciar el juego
  if (gameOver) {
    clearInterval(setIntervalId);
    handleGameOver();
    location.reload();
  }

  // Generar el markup HTML para la comida
  htmlMarkup += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Verificar si la serpiente ha comido la comida y actualizar la puntuación
  if (snakeX === foodX && snakeY === foodY) {
    chageFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    scoreElement.innerText = `Score: ${score}`;
  }

  // Mover la serpiente
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  // Verificar si la serpiente ha chocado con los límites del tablero o consigo misma
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
    }
  }

  // Actualizar el tablero de juego en el DOM
  playBoard.innerHTML = htmlMarkup;
};

// Generar la posición inicial de la comida y establecer el intervalo para inicializar el juego
chageFoodPosition();
setIntervalId = setInterval(initGame, 125);

// Agregar un evento para cambiar la dirección de la serpiente
document.addEventListener("keydown", changeDirection);
