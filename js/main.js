const gameOverContainer = document.querySelector('.game-over-container')
const scoreHTML = document.querySelector('#score')
const restartBtn = document.querySelector('#resart')
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
// size of 1 cell in px
const box = 32
const snake = []

const bg = new Image()
const donutScore = new Image()
const gameFood = new Image()

const audio = new Audio()
audio.src = '../audio/coin-audio.mp3'
audio.volume = 0.2

let direction
let lastTimestamp = 0
let score = 0

bg.src = '../img/background.png'
donutScore.src = '../img/donut.png'
gameFood.src = '../img/donut_16-16px.png'

snake[0] = {
  x: 9 * box,
  y: 10 * box
}

const food = {
  x: Math.floor(Math.random() * 19) * box ,
  y: Math.floor(Math.random() * 17 + 2) * box
}

restartBtn.addEventListener('click', () => {
  gameOverContainer.style.display = 'none'
  canvas.classList.remove('blurry')
  document.addEventListener('keydown', move)
  snake.length = 0
  score = 0
  gameOverContainer.classList.remove('fade-in-out')

  snake[0] = {
    x: 9 * box,
    y: 10 * box
  }

  foodRandomPosition()
})




document.addEventListener('keydown', move)

function move(e) {
  if (e.code === 'KeyW' && direction !== 'down') {
    direction = 'up'
  }else if (e.code === 'KeyA' && direction !== 'right') {
    direction = 'left'
  }else if (e.code === 'KeyS' && direction !== 'up') {
    direction = 'down'
  }else if (e.code === 'KeyD' && direction !== 'left') {
    direction = 'right'
  }
}




function loop(timestamp) {
  if (timestamp - lastTimestamp >= 100) {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(donutScore, 16,  16)
    ctx.drawImage(gameFood, food.x + 8, food.y + 8)
    
    
    displayOnOtherSide(snake)

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? '#ef233c' : '#9d0208'
      ctx.fillRect(snake[i].x, snake[i].y, box, box) 
    }
  
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if (food.x === snake[0].x && food.y === snake[0].y) {
      audio.play()
      foodRandomPosition()
      foodInSnakeCheck(food, snake)
      score++
    } else {
     snake.pop() 
    }
  
    if (direction === 'up') snakeY -= box
    if (direction === 'left') snakeX -= box
    if (direction === 'down') snakeY += box
    if (direction === 'right') snakeX += box


    const newHead = {
      x: snakeX,
      y: snakeY
    }

    ctx.font = '35px Playpen Sans'
    ctx.fillStyle = '#fff'
    ctx.fillText(score, 60, 45)

    
    headAndTailCollision(newHead, snake)

    snake.unshift(newHead)

    lastTimestamp = timestamp;
  }

  requestAnimationFrame(loop)
}



function headAndTailCollision(snakeHead, array) {
  for (let i = 0; i < array.length; i++) {
    if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {

      canvas.classList.add('blurry')
      gameOverContainer.classList.add('fade-in-out')

      gameOverContainer.style.display = 'flex'
      scoreHTML.textContent = score
      direction = null
      document.removeEventListener('keydown', move)
    }
  }
}

function displayOnOtherSide(snake) {
  if (snake[0].x < 0) {
    snake[0].x = canvas.width - 32
  }else if (snake[0].x > canvas.width - 32) {
    snake[0].x = 0
  }else if (snake[0].y > canvas.height - 32) {
    snake[0].y = 64
  }else if (snake[0].y < 64) {
    snake[0].y = canvas.height
  }
}



function foodRandomPosition() {
  food.x = Math.floor(Math.random() * 19) * box ,
  food.y = Math.floor(Math.random() * 17 + 2) * box
}



function foodInSnakeCheck(food, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y ) {
      food.x = Math.floor(Math.random() * 19) * box ,
      food.y = Math.floor(Math.random() * 17 + 2) * box
    }
    
  }
}

loop()