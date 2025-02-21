import { ball, ballPosition, velocity } from "./ballMovement.js";
import { chanceDivs, restartCreateBricks, totalBricks } from "./bricks.js";
import { gameloop, gameState, start } from "./main.js";
import { paddle, paddlePosition } from "./movePaddle.js";

const lostGame = document.querySelector('.gameLost')
const btn = lostGame.querySelector('.gameLost button')
const clock = document.querySelector('.clock')
const title = document.querySelector('.title')
const continueOrRestart = document.querySelector('.continueOrRestart')
const continueBtn = continueOrRestart.querySelector('button:nth-child(1)')
const btnRestart = continueOrRestart.querySelector('button:nth-child(2)')


export const lostChance = () => {
    gameState.chanceNumber--
    chanceDivs[gameState.chanceNumber].classList.add('remove')
    if (gameState.chanceNumber == 0) {
        gameState.gameLost = true
        showGameOver()
    } else {
        gameState.chanceLost = true
        showAnotherChance()
    }
}

function showGameOver() {
    const description = lostGame.querySelector('.gameLost h3')
    const header = lostGame.querySelector('.gameLost h2')
    description.innerHTML = `You have lost!`
    header.innerHTML = `Game Over!`
    header.style.color = 'rgb(236, 21, 21)'
    btn.innerHTML = `Restart`
    lostGame.classList.remove('hidden')
}

export function checkWin() {
    if(totalBricks == 0) {
        const description = lostGame.querySelector('.gameLost h3')
        const header = lostGame.querySelector('.gameLost h2')

        description.innerHTML = `Win <img src="../icon/verified.png"/>`
        header.innerHTML = `Total Score: ${gameState.score}` 
        header.style.color = 'white'
        btn.innerHTML = `Restart`
        gameState.pause = true
        lostGame.classList.remove('hidden')
    }
    
}

function showAnotherChance() {
    const description = lostGame.querySelector('.gameLost h3')
    const header = lostGame.querySelector('.gameLost h2')
    description.innerHTML = `Lives remain: <strong>${gameState.chanceNumber}</strong>`
    header.innerHTML = `Try Again!`
    header.style.color = 'rgb(236, 21, 21)'
    btn.innerHTML = `Continue`
    lostGame.classList.remove('hidden')
}

function ContinueAfterLostChance() {
    ballPosition.x = 0
    ballPosition.y = 0
    ball.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`
    lostGame.classList.add('hidden')
    ball.style.opacity = '1'
    gameState.chanceLost = false
    velocity.horizontal = 1
    velocity.vertical = -1
    paddlePosition.x = 0
    paddlePosition.y = 0
    paddle.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`
}

function restartGame() {
    cancelAnimationFrame(gameState.ainationId)
    // document.querySelector('.bricks').innerHTML = ''
    // document.querySelector('.chance').innerHTML = ''
    document.querySelector('.score').innerHTML = 'Score: 0'
    document.querySelector('.clock').innerHTML = `Timer: 00:00`

    gameState.score = 0
    gameState.gameLost = false
    gameState.chanceLost = false
    gameState.pause = false

    ballPosition.x = 0
    ballPosition.y = 0
    ball.style.opacity = '1'
    ball.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`

    velocity.horizontal = 1
    velocity.vertical = -1
    gameState.chanceNumber = 3
    lostGame.classList.add('hidden')
    paddlePosition.x = 0
    paddlePosition.y = 0
    paddle.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`

    gameState.seconds = -1
    gameState.lastTime = 0
    restartCreateBricks()
    gameState.ainationId = requestAnimationFrame(gameloop)
}

export const timer = (timestamp) => {
    if (timestamp - gameState.lastTime >= 1000) {
        gameState.seconds++;
        gameState.lastTime = timestamp
        clock.innerHTML = `Timer: ${String(Math.floor(gameState.seconds / 60)).padStart(2, "0")}:${String(gameState.seconds % 60).padStart(2, "0")}`
    }
}

let direction = 0
export function moveTitle() {
    if(direction){
        title.style.transform = `translateX(0.1px)`
        direction = 0
    }else {
        title.style.transform = `translateX(-0.1px)`
        direction = 1
    }
}


btn.addEventListener('click', (e) => {
    if (e.target.textContent == 'Continue') {
        ContinueAfterLostChance()
    } else if (e.target.textContent == 'Restart') {
        restartGame()
    }
})

addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() == 'p') {
        if (!gameState.gameLost && !gameState.chanceLost) {
            gameState.pause = true
            continueOrRestart.classList.remove('hidden')
        }
    }
})

continueBtn.addEventListener('click', () => {
    gameState.pause = false
    continueOrRestart.classList.add('hidden')
})
btnRestart.addEventListener('click', () => {
    gameState.pause = false
    restartGame()
    continueOrRestart.classList.add('hidden')
})

