// import { createBricks } from "./createBricks.js"
// import { createChances, scoreElement, chanceElmt } from "./removeBricks.js"
// import { resetTime, timer } from "./timer.js"
// import { startGame } from "./startGame.js"
// import { randomPositionMonkey } from "./moveBall.js"
// let currentChanceNumber = 4
// let score = 0
// let verticalVelocity = 0, horizontalVelocity = 0
// const restartBtn = document.querySelector('.gameLost button')
// const lostGame = document.querySelector('.gameLost')
// const lostGameBtn = lostGame.querySelector('button')
// export const restartGame = () => {
//     console.log('clicked')
//     // console.log(2+3)
//     if(lostGameBtn.innerHTML == 'Restart') {
//         score = 0
//         currentChanceNumber = 4
//         scoreElement.innerHTML = `Score: <strong>${score}</strong>`
//         chanceElmt.innerHTML = ''
//         // fruitElemnt.innerHTML = ''
//         createChances()
//         createBricks()
//     }
//     // angle = 0;
//     // horizontalVelocity = 1; 
//     verticalVelocity = -verticalVelocity;
//     timer()
//     resetTime()
//     randomPositionMonkey()   
//     startGame()
//     lostGame.style.display = 'none'
    
// }
// restartBtn.addEventListener('click', restartGame)