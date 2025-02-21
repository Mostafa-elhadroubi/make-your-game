import { moveBall } from "./ballMovement.js";
import { createBricks, createChances } from "./bricks.js";
import { moveTitle, timer } from "./gameProgress.js";
import { movePaddle } from "./movePaddle.js";
import './throttle.js'


export const gameState = {
    gameLost: false,
    chanceLost: false,
    pause : false,
    ainationId : null,
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
   gameState.ainationId =  requestAnimationFrame(gameloop)
}



export function start() {
    createBricks()
    createChances()
    gameState.ainationId = requestAnimationFrame(gameloop)
}

start();