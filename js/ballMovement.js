import { checkWin, lostChance } from "./gameProgress.js";
import { removeBrick } from "./bricks.js";

const ball = document.querySelector('.ball');
const paddle = document.querySelector('.paddle');
const squareRect = document.querySelector('.gameSquare').getBoundingClientRect();
const ballSpeed = 7;
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
    if (ball.getBoundingClientRect().left - ballSpeed <= borders.left || ball.getBoundingClientRect().right + ballSpeed >= borders.right) {
        velocity.horizontal *= -1
    }
    if (ball.getBoundingClientRect().top - ballSpeed <= borders.top) {
        velocity.vertical *= -1
    }

    if (ball.getBoundingClientRect().bottom >= paddle.getBoundingClientRect().top 
    && ball.getBoundingClientRect().left > paddle.getBoundingClientRect().left 
    && ball.getBoundingClientRect().right < paddle.getBoundingClientRect().right) {
        velocity.vertical *= -1
    } else {
        if(ball.getBoundingClientRect().bottom >= paddle.getBoundingClientRect().top) {
            if((ball.getBoundingClientRect().right >= paddle.getBoundingClientRect().left
            && ball.getBoundingClientRect().right < paddle.getBoundingClientRect().right)
            || (ball.getBoundingClientRect().left <= paddle.getBoundingClientRect().right
            && ball.getBoundingClientRect().left > paddle.getBoundingClientRect().left)) {
                velocity.horizontal *= -1
                velocity.vertical *= -1
            }
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