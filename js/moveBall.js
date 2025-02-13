import { square, paddle, brickElement, createBricks} from "./createBricks.js";
import { createChances, scoreElement, chanceElmt } from "./removeBricks.js"
export const ball = document.querySelector('.ball')
let widthSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('width'))
let heightSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('height'))
let horizontalVelocity = 1;  // Horizontal movement speed
let verticalVelocity = 1; 
let addScore = 10;
export const moveBall = () => {
    let leftBall = parseInt(window.getComputedStyle(ball).getPropertyValue('left'))
    let topBall = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
    ball.style.left = (leftBall + (10 * horizontalVelocity)) + 'px';
    ball.style.top = (topBall - (10 * verticalVelocity)) + 'px';
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
    
            // verticalVelocity = -verticalVelocity;
            brick.classList.add('remove');
            score += addScore;
            scoreElement.innerHTML = `Score: <strong>${score}</strong>`;
        }
        
    });
};





const widthPaddle = parseInt(getComputedStyle(paddle).getPropertyValue('width'))
const maxWidth = Math.floor(widthSquareBricks - widthPaddle)
const continueOrRestart = document.querySelector('.continueOrRestart')
export const movePaddle = () => {
    window.addEventListener('keydown', (event) => {
       console.log(event.key)
        // console.log(event)
        if(event.key == 'ArrowRight' && paddle.offsetLeft < maxWidth) {
            paddle.style.left = `${paddle.offsetLeft + 10}px`
        }
        else if (event.key == 'ArrowLeft' && paddle.offsetLeft > 0) {
            paddle.style.left = `${paddle.offsetLeft - 10}px`
        } else if (event.key.toLowerCase() == 'p')    {
            continueOrRestart.classList.toggle('appear')
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
        // console.log(currentChanceNumber)
        ball.style.opacity = '0'
        lostChance()
    }
}

export const randomPositionMonkey = () => {
    const rect = square.getBoundingClientRect()
    const rectBall = ball.getBoundingClientRect()
    // const rectPaddle = paddle.getBoundingClientRect()
    ball.style.opacity = '1'
    let topBall = parseInt(window.getComputedStyle(ball).getPropertyValue('top'))
    const randomLeft = Math.floor((Math.random() * (rect.right - rect.left - (2 * rectBall.width))) + rectBall.width)
    ball.style.left = `${randomLeft}px`
    ball.style.top = `${topBall - 150}px`
}



let minute = 0
let second  = 1;
export const timer = () => {
    const clock = document.querySelector('.clock')
    if (second == 60) {
        minute += 1
        second = 0
        clock.innerHTML = `Timer: <strong>${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}</strong>`
    } else {
        clock.innerHTML = `Timer: ${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
    }
    second++
}
export let time;
export const resetTime = () => {
    time = setInterval(timer,1000)
}


const resetBallPosition = () => {
    ball.style.top = 'calc(100% - 100px)'; // Or any value that sets the ball to its starting position
    ball.style.left = 'calc(100% - 200px)'; // Or any value that sets the ball to its starting position
}


let currentChanceNumber = 4
export let score = 0
const restartBtn = document.querySelector('.gameLost button')
const lostGame = document.querySelector('.gameLost')
const lostGameBtn = lostGame.querySelector('button')
const levelElement = lostGame.querySelector('p')
let level = 1
export const restartGame = () => {
    console.log('clicked')
    if(lostGameBtn.textContent.includes('Restart') || lostGameBtn.textContent.includes('Success')) {
        console.log(currentChanceNumber, "before")
        currentChanceNumber = 4
        console.log(currentChanceNumber, "after")
        score = 0
        minute = 0
        second = 0
        
        levelElement.innerHTML = `Level: <strong>${level}</strong>`
        scoreElement.innerHTML = `Score: <strong>${score}</strong>`
        chanceElmt.innerHTML = ''
        chanceElmt.innerHTML += 'Chances:'
        brickElement.innerHTML = ''
        createChances()
        createBricks()
    } 
    verticalVelocity = -verticalVelocity;
    timer()
    resetTime()
    randomPositionMonkey()   
    startGame()
    resetBallPosition();
    lostGame.style.display = 'none'
    
}
restartBtn.addEventListener('click', restartGame)

export const isWin = () => {
    const allBricks = [...brickElement.querySelectorAll('.brick')]
    return allBricks.every(brick => brick.classList.contains('remove'))
}



export const  lostChance = () => {
    const chance = document.querySelectorAll('.chance .chanceDiv')
    console.log(chance[currentChanceNumber-1], currentChanceNumber)
    if(chance[currentChanceNumber-1] && currentChanceNumber != 0 &&!chance[currentChanceNumber-1].classList.contains('disappear')){
        chance[currentChanceNumber-1].classList.add('disappear')
        currentChanceNumber--
        if(currentChanceNumber != 0) {
            gameLost(currentChanceNumber, "Try again")
        } else {
            gameLost(currentChanceNumber, "Restart")
        }
    }
    resetBallPosition(); 
}






// import {id} from './startGame.js'
export let id;
// import { time } from "./timer.js";
const gameLost = (currentChanceNumber, btn) => {
    const rectBody = document.querySelector('body').getBoundingClientRect()
    const widthLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('width'))
    const heightLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('height'))
    lostGame.style.top = `${rectBody.height / 2 - (heightLostGame / 2)}px`
    lostGame.style.left = `${rectBody.width / 2 - (widthLostGame.width / 2)}px`
    const chanceNumberRemain = lostGame.querySelector('h3')
    console.log("gamelost",currentChanceNumber == 0)
    if(isWin() == true) {
        chanceNumberRemain.innerHTML = `<img src="../icon/verified.png"/>`
        lostGame.querySelector('h2').innerHTML = ''
        lostGame.querySelector('h2').innerHTML = `Total Score: ${score}` 
        lostGameBtn.innerHTML = `${btn} <i class="fa-solid fa-arrow-right"></i>`
        lostGameBtn.style.background = '#48b02c'
        // level++
        
        // addScore += 5
    }
    if(currentChanceNumber == 0) {
        console.log('was read')
        chanceNumberRemain.innerHTML = `Game Over!!!!`
        chanceNumberRemain.style.color = 'red'
        lostGameBtn.innerHTML = `${btn}`
        lostGame.querySelector('h2').innerHTML = ''
        lostGame.querySelector('h2').innerHTML = `Total Score: ${score}`   
    } else if(currentChanceNumber != 0 && !isWin()) {
        chanceNumberRemain.style.color = 'white'
        lostGame.querySelector('h2').innerHTML = ''
        chanceNumberRemain.innerHTML = `Chance remains: <strong>${currentChanceNumber}</strong>`
        lostGameBtn.innerHTML = `${btn}`
    }
    lostGame.style.display = 'flex'
    clearInterval(id)
    clearInterval(time)
}   



export const startGame = () => {
    id = setInterval(() => {
        moveBall();
        changeDirection()
        extremeSquare()
        removeBrick()
        if(isWin() == true) {
            // clearInterval(id)
            console.log('is winner!!!!')
           gameLost(4, "Success")
        }
    }, 100)
}