import { velocity } from "./ballMovement.js";
import { gameState } from "./main.js";


const brickElement = document.querySelector('.bricks');
const chanceElmt = document.querySelector('.chance')
const bricksColor = ["#990F02", "#3498db", "#2ecc71", "#f39c12", "#8e44ad", "#e74c3c", "#f39c12", "#9b59b6", "#34495e", "#1abc9c", "#16a085", "#d35400", "#2c3e50", "#e67e22"]
const widthSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('width'))
const heightSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('height'))
const scoreElement = document.querySelector(".score")
let bricks ;
const scoreChange = 15;
let chanceDivs
let totalBricks = 0
const createBricks = () => {
    const brickWidth = 105;
    const brickHeight = 30;
    let bricksRow = Math.floor(heightSquareBricks / brickHeight);
    let bricksColumn = Math.floor(widthSquareBricks / brickWidth);
    totalBricks = bricksRow * bricksColumn;
    for (let i = 0; i < bricksRow; i++) {
        for (let j = 0; j < bricksColumn; j++) {
            const brick = document.createElement('div')
            const brickIndex = Math.floor(Math.random() * bricksColor.length)
            brick.classList.add('brick')
            brick.style.background = bricksColor[brickIndex]
            brickElement.appendChild(brick)
        }
    }
    bricks = brickElement.querySelectorAll('.brick')
}

const createChances = () => {
    const validBrickIndex = []
    chanceElmt.innerHTML += `Lives: `
    for (let i = 0; i < 3; i++) {
        const brickIndex = Math.floor(Math.random() * bricksColor.length)
        if (!validBrickIndex.includes(brickIndex)) {
            validBrickIndex.push(brickIndex)
            chanceElmt.innerHTML += `<div class="chanceDiv"></div>`
            document.querySelectorAll('.chanceDiv')[i].style.cssText = `background: ${bricksColor[brickIndex]}`
        } else {
            i--
        }
    }
    chanceDivs = document.querySelectorAll('.chanceDiv')
}

const removeBrick = (ball) => {
   
    bricks.forEach(brick => {
        const rectBall = ball.getBoundingClientRect();
        const rectBrick = brick.getBoundingClientRect();
        // Check if the ball and brick are overlapping
        if (!brick.classList.contains('remove') &&
            rectBall.right > rectBrick.left &&
            rectBall.left < rectBrick.right &&
            rectBall.bottom > rectBrick.top &&
            rectBall.top < rectBrick.bottom) {
            const overlapTop = rectBall.bottom - rectBrick.top; //if the distance between bottom of the ball and the top of the brick is the smallest one. 
            // means that the ball hits the brick top
            const overlapBottom = rectBrick.bottom - rectBall.top;
            const overlapLeft = rectBall.right - rectBrick.left;
            const overlapRight = rectBrick.right - rectBall.left;

            // Determine the smallest overlap to identify the edge hit
            const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);
            if (minOverlap === overlapTop || minOverlap === overlapBottom) {
                // If top or bottom collision, reverse vertical velocity
                velocity.vertical *= -1;
            } else {
                // If left or right collision, reverse horizontal velocity
                velocity.horizontal *= -1;
            }
            brick.classList.add('remove');
            totalBricks--
            gameState.score += scoreChange;
            scoreElement.innerHTML = `Score: <strong>${gameState.score}</strong>`;
        }

    });
};



function restartCreateBricks() {
    console.log(bricks);
    console.log(brickElement)
    bricks.forEach(brick => {
        if(brick.classList.contains("remove")) totalBricks++
        brick.classList.remove("remove")
    })
    chanceDivs.forEach(brick => {
        brick.classList.remove("remove")
    })
    console.log(brickElement)
    console.log(bricks, "afterp");
    console.log(totalBricks, "yesp")
}
 

export { createBricks, createChances, removeBrick, restartCreateBricks, totalBricks, chanceDivs}