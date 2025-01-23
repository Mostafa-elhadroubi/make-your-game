const fruitElemnt = document.querySelector('.fruits');
const square = document.querySelector('.gameSquare')
const moneky = document.querySelector('.moneky')
const paddle = document.querySelector('.paddle')
let horizontalVelocity = 1;  // Horizontal movement speed
let verticalVelocity = 1; 
let angle = 0;
let chanceNumber = 4;
let widthSquareFruits = parseInt(getComputedStyle(fruitElemnt).getPropertyValue('width'))
let heightSquareFruits = parseInt(getComputedStyle(fruitElemnt).getPropertyValue('height'))
export const createBricks = () => {
    console.log(heightSquareFruits)
    let counter = 1
    const widthFruit = 90;
    const heightFruit = 70
    const fruits = ['apple.png', 'apricot.png', 'banana.png', 'cherry.png',
                    'coconut.png', 'fig.png', 'grape.png', 'kiwi.png', 'lemon.png',
                    'orange.png', 'pear.png', 'strawberry.png', 'watermelon.png',
                    'avocado.png', 'lime.png']
    let rowsFruit = Math.floor(heightSquareFruits / heightFruit);
    let columnFruit = Math.floor(widthSquareFruits / widthFruit);
    for (let i = 0; i < rowsFruit; i++) {
        for (let j = 0; j < columnFruit; j++) {
            const brick = document.createElement('img')
            const fruitIndex = Math.floor(Math.random() * 15)
            brick.classList.add('fruit')
            // brick.id = `brick-${counter}`
            counter++
            brick.src = `./images/${fruits[fruitIndex]}`
            // brick.style.background = fruits[randomIndex]
            brick.style.left = `${j * widthFruit + 10}px`
            brick.style.top = `${i * 70 + 10}px`
            fruitElemnt.appendChild(brick)
        }
    }
    // console.log(fruitElemnt.querySelectorAll('.brick'))
}

export const moveBall = () => {

        let ballLeft = parseInt(window.getComputedStyle(moneky).getPropertyValue('left'))
        let ballTop = parseInt(window.getComputedStyle(moneky).getPropertyValue('top'))
        
        moneky.style.left = (ballLeft + (10 * horizontalVelocity)) + 'px';
        moneky.style.top = (ballTop - (10 * verticalVelocity)) + 'px';
}

export const changeDirection = () => {
    const rect = square.getBoundingClientRect()
    const rectBall = moneky.getBoundingClientRect()
        if(rectBall.left <= rect.left || rectBall.right >= rect.right) {
            horizontalVelocity = -horizontalVelocity
        }
        if(rectBall.top  <= rect.top  ) {
            verticalVelocity = -verticalVelocity
        }
}


let score = 0
const removed = document.querySelector('.brickRemoved')
export const removeBrick = () => {
    const bricks = fruitElemnt.querySelectorAll('.fruit')
    const scoreElement = document.querySelector('.score')
    bricks.forEach(brick => {
        const rectMoneky = moneky.getBoundingClientRect()
        const brickObj = brick.getBoundingClientRect()
        if(!brick.classList.contains('remove') && rectMoneky.top <= brickObj.bottom && rectMoneky.left >= brickObj.left && brickObj.right >= rectMoneky.right) {
            brick.classList.add('remove')
            score += 10
            scoreElement.innerHTML = `Score: <strong>${score}</strong>`
            verticalVelocity = -verticalVelocity
        }
        
    })
}
const widthPaddle = parseInt(getComputedStyle(paddle).getPropertyValue('width'))
const maxWidth = Math.floor(widthSquareFruits - widthPaddle)
export const movePaddle = () => {
    window.addEventListener('keydown', (event) => {
       
        // console.log(event)
        if(event.key == 'ArrowRight' && paddle.offsetLeft < maxWidth) {
            paddle.style.left = `${paddle.offsetLeft + 10}px`
        }
        else if (event.key == 'ArrowLeft' && paddle.offsetLeft > 0) {
            paddle.style.left = `${paddle.offsetLeft - 10}px`
        }
        // console.log(rectMoneky, rectPaddle)
        
    })
}



export const clock = () => {
    const clock = document.querySelector('.clock')
    // if(angle < 310) {
        clock.style.backgroundImage = `conic-gradient(rgb(226, 226, 226) ${angle}deg, white ${angle}deg)`
        clock.style.transform = `scale(0.95)`
    // } else 
    if(angle >= 310) {
        clock.style.backgroundImage = `conic-gradient(rgb(56, 56, 56) ${angle}deg, white ${angle}deg)`
        clock.style.transform = `scale(1.05)`
        clock.style.transition = `transform 1s ease`
    }
    angle += 24
    if(angle > 360) {
        angle = 0
    }
}
const chanceElmt = document.querySelector('.chance')
export const createChances = () => {
    const fruits = ['apple.png', 'apricot.png', 'banana.png', 'cherry.png',
        'coconut.png', 'fig.png', 'grape.png', 'kiwi.png', 'lemon.png',
        'orange.png', 'pear.png', 'strawberry.png', 'watermelon.png',
        'avocado.png', 'lime.png']
    const validFruitIndex = []
    for(let i = 0; i < chanceNumber; i++) {
        const chance = document.createElement('img')
        const fruitIndex = Math.floor(Math.random() * 15)
        if(!validFruitIndex.includes(fruitIndex)){
            validFruitIndex.push(fruitIndex)
            console.log(validFruitIndex)
            chance.src = `./images/${fruits[fruitIndex]}`
            chanceElmt.appendChild(chance)
        } else {
            i--
        }
    }

}

let id = setInterval(() => {
    moveBall()
    changeDirection()
    removeBrick()
}, 100)

let id2 = setInterval(() => {
    const rectPaddle = paddle.getBoundingClientRect()
    const rectBall = moneky.getBoundingClientRect()
    const rectsquare = square.getBoundingClientRect()
    if(rectBall.bottom >= rectPaddle.top && rectPaddle.left <= rectBall.right && rectPaddle.right >= rectBall.left) {
        console.log("yes")
        verticalVelocity = -verticalVelocity
    }
    if(rectBall.top >= rectsquare.bottom) {
        moneky.style.opacity = '0'
        const chance = document.querySelectorAll('.chance img')
        if(!chance[chanceNumber-1].classList.contains('disappear')){
            chance[chanceNumber-1].classList.add('disappear')
            chanceNumber--
        }
        if(chanceNumber == 0) {
            console.log("lost the game")
        }
        // for (let i = chanceNumber-1; i >= 0; i--) {
        //     if(!chance[i].classList.contains('disappear')) {
        //         chance[i].classList.add('disappear')
        //         break
        //     } else {
        //         console.log("lost the game")
        //     }
        // }
        console.log(chance)
        clearInterval(id)
        clearInterval(id2)
    }
}, 100)

