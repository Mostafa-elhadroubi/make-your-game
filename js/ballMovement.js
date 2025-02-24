import { checkWin, lostChance } from "./gameProgress.js";
import { removeBrick } from "./bricks.js";

const ball = document.querySelector('.ball');
const paddle = document.querySelector('.paddle');
const squareRect = document.querySelector('.gameSquare').getBoundingClientRect();
const ballSpeed = 3;
const velocity = {
    horizontal: 1,
    vertical: -1
}


const borders = {
    top: squareRect.top,
    left: squareRect.left,
    bottom: squareRect.bottom,
    right: squareRect.right
}

const ballPosition = {
    x: 0,
    y: 0
}

const moveBall = () => {
    // Check for collisions with the game borders
    if (ball.getBoundingClientRect().left - ballSpeed <= borders.left || ball.getBoundingClientRect().right + ballSpeed >= borders.right) {
        velocity.horizontal *= -1; // Reverse horizontal direction
    }
    if (ball.getBoundingClientRect().top - ballSpeed <= borders.top) {
        velocity.vertical *= -1; // Reverse vertical direction
    }

    // Check for collisions with the paddle
    if (
        ball.getBoundingClientRect().bottom >= paddle.getBoundingClientRect().top && // Ball is at paddle height
        ball.getBoundingClientRect().left < paddle.getBoundingClientRect().right && // Ball is within paddle width
        ball.getBoundingClientRect().right > paddle.getBoundingClientRect().left
    ) {
        // Check if the ball hits the top of the paddle
        if (ball.getBoundingClientRect().bottom <= paddle.getBoundingClientRect().top + ballSpeed) {
            velocity.vertical *= -1; // Reverse vertical direction
        }

        // Check if the ball hits the left or right edge of the paddle
        if (
            ball.getBoundingClientRect().right >= paddle.getBoundingClientRect().left && // Ball hits left edge
            ball.getBoundingClientRect().left < paddle.getBoundingClientRect().left
        ) {
            velocity.horizontal *= -1; // Reverse horizontal direction
        }
        if (
            ball.getBoundingClientRect().left <= paddle.getBoundingClientRect().right && // Ball hits right edge
            ball.getBoundingClientRect().right > paddle.getBoundingClientRect().right
        ) {
            velocity.horizontal *= -1; // Reverse horizontal direction
        }
    }

    ballPosition.x += ballSpeed * velocity.horizontal
    ballPosition.y += ballSpeed * velocity.vertical
    ball.style.transform = `translate(${ballPosition.x}px, ${ballPosition.y}px)`

    removeBrick(ball);
    checkWin()

    if (ball.getBoundingClientRect().bottom + ballSpeed >= borders.bottom) {
        ball.style.opacity = '0'
        lostChance()
    }
}

export { moveBall, velocity, ballPosition, ball, borders }