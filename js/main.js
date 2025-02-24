import { moveBall } from "./ballMovement.js";
import { createBricks, createChances } from "./bricks.js";
import { moveTitle, timer } from "./gameProgress.js";
import { movePaddle } from "./movePaddle.js";
import './debounce.js'


export const gameState = {
    gameLost: false,
    chanceLost: false,
    pause : false,
    chanceNumber: 3,
    score : 0,
    lastTime : 0,
    seconds : 0,
    first : true
}


export function gameloop(time) {
    if(!gameState.gameLost && !gameState.chanceLost && !gameState.pause) {
        moveBall();
        movePaddle()
        timer(time)
    }
    moveTitle()
    requestAnimationFrame(gameloop)
}



export function start() {
    createBricks()
    createChances()
    requestAnimationFrame(gameloop)
}

start();