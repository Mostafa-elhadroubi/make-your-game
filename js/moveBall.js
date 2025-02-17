import { square, paddle, brickElement, createBricks} from "./createBricks.js";
import { createChances, scoreElement, chanceElmt } from "./removeBricks.js"
import {throttleFunction} from '../js/throttle.js'
export const ball = document.querySelector('.ball')
let widthSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('width'))
let horizontalVelocity = 1;  // Horizontal movement speed
let verticalVelocity = 1; 
let addScore = 10;
let minute = 0
let second  = 1;
let ballSpeed = 5;
let lastTime = 0
let isGameRunning = true;  // Flag for game running state
let isTimerRunning = true;
let isGameLoopRunning = false;
let isBallLost = false; // Add this flag to track ball collision
let animationFrameId;
export const moveBall = () => {
    let leftBall = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
    let topBall = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
    ball.style.left = (leftBall + (ballSpeed * horizontalVelocity)) + 'px';
    ball.style.top = (topBall - (ballSpeed * verticalVelocity)) + 'px';
}

export const changeDirection = () => {
    const rect = square.getBoundingClientRect()
    const rectBall = ball.getBoundingClientRect()
        if(rectBall.left <= rect.left || rectBall.right >= rect.right) {
            horizontalVelocity = -horizontalVelocity
        }
        if(rectBall.top  <= rect.top) {
            verticalVelocity = -verticalVelocity
        }
}

export const removeBrick = () => {
    const bricks = brickElement.querySelectorAll('.brick');
    bricks.forEach(brick => {
        const rectBall = ball.getBoundingClientRect();
        const rectBrick = brick.getBoundingClientRect();
        // Check if the ball and brick are overlapping
        if (!brick.classList.contains('remove') && 
            rectBall.right > rectBrick.left && 
            rectBall.left < rectBrick.right && // Ball is horizontally overlapping the brick
            rectBall.bottom > rectBrick.top && 
            rectBall.top < rectBrick.bottom) {
                const overlapTop = rectBall.bottom - rectBrick.top;
                const overlapBottom = rectBrick.bottom - rectBall.top;
                const overlapLeft = rectBall.right - rectBrick.left;
                const overlapRight = rectBrick.right - rectBall.left;
    
                // Determine the smallest overlap to identify the edge hit
                const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);
                if (minOverlap === overlapTop || minOverlap === overlapBottom) {
                    // If top or bottom collision, reverse vertical velocity
                    verticalVelocity = -verticalVelocity;
                } else if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    // If left or right collision, reverse horizontal velocity
                    horizontalVelocity = -horizontalVelocity;
                }
            brick.classList.add('remove');
            score += addScore;
            scoreElement.innerHTML = `Score: <strong>${score}</strong>`;
        }
        
    });
};

const widthPaddle = parseInt(getComputedStyle(paddle).getPropertyValue('width'))
const maxWidth = Math.floor(widthSquareBricks - widthPaddle)
const continueOrRestart = document.querySelector('.continueOrRestart')
const continueBtn = continueOrRestart.querySelector('button:nth-child(1)')
const btnRestart = continueOrRestart.querySelector('button:nth-child(2)')

export const movePaddle = () => {
    window.addEventListener('keydown', (event) => {
        if(event.key == 'ArrowRight' && paddle.offsetLeft < maxWidth) {
            paddle.style.left = `${paddle.offsetLeft + 15}px`
        }
        else if (event.key == 'ArrowLeft' && paddle.offsetLeft > 0) {
            paddle.style.left = `${paddle.offsetLeft - 15}px`
        } else if (event.key.toLowerCase() == 'p')    {
            if(!continueOrRestart.classList.contains('appear')) {
                continueOrRestart.classList.toggle('appear')
                isGameRunning = false
                stopTimer()
            } else {
                continueOrRestart.classList.toggle('appear')
                isGameRunning = true
                startGame()
                isTimerRunning = true; // Resume the timer
                requestAnimationFrame(timer);
            }
            continueBtn.addEventListener('click', () => {
                isGameRunning = true; // Resume the game
                startGame(); // Restart the game loop
                isTimerRunning = true; // Resume the timer
                requestAnimationFrame(timer); // Restart the timer loop
                continueOrRestart.classList.remove('appear'); // Hide the pause menu

            })
            btnRestart.addEventListener('click', () => {
                restartGame()
                resetTime()
                continueOrRestart.classList.remove('appear')
            })
        }
    })
}

export const extremeSquare = () => {
    const rectPaddle = paddle.getBoundingClientRect()
    const rectBall = ball.getBoundingClientRect()
    const rectsquare = square.getBoundingClientRect()
    //Check if the ball is within the bounds of the paddle (it could be hitting the top or side of the paddle)
    if (rectBall.bottom > rectPaddle.top && rectBall.top < rectPaddle.bottom &&
        rectBall.right > rectPaddle.left && rectBall.left < rectPaddle.right) {
        // Check if the ball hit the **top** of the paddle
        if (rectBall.bottom > rectPaddle.top && rectBall.top < rectPaddle.top) {
            // Ball hit the top of the paddle, only reverse vertical velocity
            verticalVelocity = -verticalVelocity;
        }
        // If the ball hit the **left or right** side of the paddle
        else {
            // Reverse both horizontal and vertical velocities
            horizontalVelocity = -horizontalVelocity;
            verticalVelocity = -verticalVelocity;
        }
    }
    if(rectBall.top > rectsquare.bottom) {
        isBallLost = true
        ball.style.opacity = '0'
        lostChance()
    }
}

export const randomPositionBall = () => {
    const rect = square.getBoundingClientRect()
    const rectBall = ball.getBoundingClientRect()
    ball.style.opacity = '1'
    const randomLeft = Math.floor((Math.random() * (rect.right - rect.left - (2 * rectBall.width))) + rectBall.width)
    ball.style.left = `${randomLeft}px`
    ball.style.top = 'calc(100% - 300px)'
    isBallLost = false
}

export const timer = (timestamp) => {
    const clock = document.querySelector('.clock')
    if(!lastTime) lastTime = timestamp // Initialize lastTime on the first call
    const deltaTime = timestamp - lastTime// Calculate time difference
    if (deltaTime >= 1000) {// Update every second (1000ms)
        if (second == 60) {
            minute++
            second = 0
        } 
            clock.innerHTML = `Timer: ${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
            lastTime = timestamp // Reset lastTime after updating the timer
        second++
    }
    if(isTimerRunning) {
        requestAnimationFrame(timer)
    }
}

export const resetTime = () => {
    isTimerRunning = true
    lastTime = 0
    minute = 0
    second = 0
    const clock = document.querySelector('.clock');
    clock.innerHTML = `Timer: <strong>${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}</strong>`; // Update the timer display immediately
    requestAnimationFrame(timer)
}
export const stopTimer = () => {
    isTimerRunning = false;  // Stop the timer loop
}
let chanceNumber = 3
let score = 0
const restartBtn = document.querySelector('.gameLost button')
const lostGame = document.querySelector('.gameLost')
const lostGameBtn = lostGame.querySelector('button')
const levelElement = lostGame.querySelector('p')
let level = 1
export const restartGame = () => {
    if(lostGameBtn.textContent.includes('Restart') || lostGameBtn.textContent.includes('Success') || btnRestart.parentElement.classList.contains('appear')) {
        chanceNumber = 3
        score = 0
        minute = 0
        second = 0
        levelElement.innerHTML = `Level: <strong>${level}</strong>`
        scoreElement.innerHTML = `Score: <strong>${score}</strong>`
        chanceElmt.innerHTML = ''
        chanceElmt.innerHTML += 'Lives:'
        brickElement.innerHTML = ''
        createChances()
        createBricks()
    } 
    // Cancel the previous animation frame if it exists
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    verticalVelocity = -verticalVelocity;
    isGameRunning = true
    isGameLoopRunning = false
    if (chanceNumber === 0) {
        resetTime(); // Reset the timer only when all chances are lost
    } else {
        isTimerRunning = true; // Resume the timer if not all chances are lost
        requestAnimationFrame(timer);
    }
    startGame()
    randomPositionBall()   
    lostGame.style.display = 'none'
    
}
restartBtn.addEventListener('click', restartGame)

export const isWin = () => {
    const allBricks = [...brickElement.querySelectorAll('.brick')]
    return allBricks.every(brick => brick.classList.contains('remove'))
}



export const  lostChance = () => {
    const chance = document.querySelectorAll('.chance .chanceDiv')
    if(chance[chanceNumber-1] && chanceNumber != 0 &&!chance[chanceNumber-1].classList.contains('disappear')){
        chance[chanceNumber-1].classList.add('disappear')
        chanceNumber--
        if(chanceNumber != 0) {
            gameLost(chanceNumber, "Try again")
            stopTimer()
        } else {
            stopTimer()
            gameLost(chanceNumber, "Restart")
        }
    }
}

const gameLost = (chanceNumber, btn) => {
    const rectBody = document.querySelector('body').getBoundingClientRect()
    const widthLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('width'))
    const heightLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('height'))
    lostGame.style.top = `${rectBody.height / 2 - (heightLostGame / 2)}px`
    lostGame.style.left = `${rectBody.width / 2 - (widthLostGame.width / 2)}px`
    const chanceNumberRemain = lostGame.querySelector('h3')
    if(isWin()) {
        chanceNumberRemain.innerHTML = `<img src="../icon/verified.png"/>`
        lostGame.querySelector('h2').innerHTML = ''
        lostGame.querySelector('h2').innerHTML = `Total Score: ${score}` 
        lostGameBtn.innerHTML = `${btn}`
        // lostGameBtn.style.background = '#48b02c'
    }
    if(chanceNumber == 0) {
        chanceNumberRemain.innerHTML = `Game Over!!!!`
        chanceNumberRemain.style.color = 'red'
        lostGameBtn.innerHTML = `${btn}`
        lostGame.querySelector('h2').innerHTML = ''
        lostGame.querySelector('h2').innerHTML = `Total Score: ${score}`   
    } else if(chanceNumber != 0 && !isWin()) {
        chanceNumberRemain.style.color = 'white'
        lostGame.querySelector('h2').innerHTML = ''
        chanceNumberRemain.innerHTML = `Chance remains: <strong>${chanceNumber}</strong>`
        lostGameBtn.innerHTML = `${btn}`
    }
    lostGame.style.display = 'flex'
    isGameRunning = false
    
}   

export const startGame = () => {
    if(!isGameRunning || isGameLoopRunning) return
         // Cancel the previous animation frame if it exists
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
        isGameLoopRunning = true
    const gameLoop = (timestamp) => {
        if(!isGameRunning) {
            isGameLoopRunning = false
            return
        }
        moveBall();
        changeDirection()
        extremeSquare()
        removeBrick()
        if(isWin()) {
            isGameRunning = false
            isGameLoopRunning = false
           gameLost(3, "Success")
        }else {
                animationFrameId = requestAnimationFrame(gameLoop)
        }
    }
    animationFrameId = requestAnimationFrame(gameLoop)
}

export const init = () => {
    createBricks();
    startGame()
    movePaddle()
    createChances()
    resetTime()
    throttleFunction()
}
