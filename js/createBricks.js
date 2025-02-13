export const brickElement = document.querySelector('.bricks');
export const square = document.querySelector('.gameSquare')
export const paddle = document.querySelector('.paddle')
export const bricksColor = ["#990F02", "#3498db", "#2ecc71", "#f39c12", "#8e44ad", "#e74c3c", "#f39c12", "#9b59b6", "#34495e", "#1abc9c", "#16a085", "#d35400", "#2c3e50", "#e67e22"]
let widthSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('width'))
let heightSquareBricks = parseInt(getComputedStyle(brickElement).getPropertyValue('height'))
export const createBricks = () => {
    const brickWidth = 105;
    const brickHeight = 30;
    let bricksRow = Math.floor(heightSquareBricks / brickHeight);
    let bricksColumn = Math.floor(widthSquareBricks / brickWidth);
    for (let i = 0; i < bricksRow; i++) {
        for (let j = 0; j < bricksColumn; j++) {
            const brick = document.createElement('div')
            const brickIndex = Math.floor(Math.random() * bricksColor.length)
            brick.classList.add('brick')
            brick.style.background = bricksColor[brickIndex]
            brickElement.appendChild(brick)
        }
    }
}