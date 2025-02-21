import { borders } from "./ballMovement.js"

export const paddle = document.querySelector('.paddle')
export const paddlePosition = {
    x: 0,
    y: 0
}

const paddleSpeed = 8
const direction = []

export function movePaddle() {
    if (direction[0]) {
        if (direction[0] == 'Right' && paddle.getBoundingClientRect().right + paddleSpeed <= borders.right) {
            paddlePosition.x += paddleSpeed
        } else if (direction[0] == 'Left' && paddle.getBoundingClientRect().left - paddleSpeed >= borders.left) {
            paddlePosition.x -= paddleSpeed
        }
    }
    paddle.style.transform = `translate(${paddlePosition.x}px, 0px)`
}


window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        if (!direction.includes(e.key.slice(5))) {
            direction.unshift(e.key.slice(5))
        }
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
        direction.splice(direction.indexOf(e.key.slice(5)), 1)
    }
})
