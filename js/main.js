const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
// size of 1 cell in px
const box = 32
const snake = []

const bg = new Image()
const donutScore = new Image()
const gameFood = new Image()

let direction
let lastTimestamp = 0

bg.src = 'img/background.png'
donutScore.src = 'img/donut.png'
gameFood.src = 'img/donut_16-16px.png'

snake[0] = {
  x: 9 * box,
  y: 10 * box
}

const food = {
  x: Math.floor(Math.random() * 19 ) * box ,
  y: Math.floor(Math.random() * 15 + 1) * box
}

document.addEventListener('keydown', (e) => {

  if (e.code === 'KeyW' && direction !== 'down') {
    direction = 'up'
  }else if (e.code === 'KeyA' && direction !== 'right') {
    direction = 'left'
  }else if (e.code === 'KeyS' && direction !== 'up') {
    direction = 'down'
  }else if (e.code === 'KeyD' && direction !== 'left') {
    direction = 'right'
  }
})

function loop(timestamp) {
  if (timestamp - lastTimestamp >= 100) {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(donutScore, 16,  16)
    ctx.drawImage(gameFood, food.x + 8, food.y + 8)
    
    ctx.fillStyle = '#ef233c'
  
    for (let i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, box, box) 
    }
  
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if (food.x === snake[0].x && food.y === snake[0].y) {
      food.x = Math.floor(Math.random() * 19) * box
      food.y = Math.floor(Math.random() * 15 + 1) * box
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

    snake.unshift(newHead)

    lastTimestamp = timestamp;
  }

  requestAnimationFrame(loop)
}

loop()