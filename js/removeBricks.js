import {bricksColor} from "./createBricks.js";
export const scoreElement = document.querySelector('.score')



export const chanceElmt = document.querySelector('.chance')
export const createChances = () => {
    const validBrickIndex = []
    for(let i = 0; i < 3; i++) {
        const brickIndex = Math.floor(Math.random() * bricksColor.length)
        if(!validBrickIndex.includes(brickIndex)){
            validBrickIndex.push(brickIndex)
            chanceElmt.innerHTML += `<div class="chanceDiv"></div>`
            document.querySelectorAll('.chanceDiv')[i].style.cssText = `background: ${bricksColor[brickIndex]}`
        } else {
            i--
        }
    }
}
