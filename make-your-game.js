const fruitElemnt = document.querySelector('.fruits');
const square = document.querySelector('.gameSquare')
const moneky = document.querySelector('.moneky')
const paddle = document.querySelector('.paddle')
let horizontalVelocity = 1;  // Horizontal movement speed
let verticalVelocity = 1; 
let angle = 0;
let chanceNumber = 4;
let currentChanceNumber = chanceNumber;
let restart = false;
let id;
let clockId;
let level = 1;
let delay = 100;
let widthSquareFruits = parseInt(getComputedStyle(fruitElemnt).getPropertyValue('width'))
let heightSquareFruits = parseInt(getComputedStyle(fruitElemnt).getPropertyValue('height'))
export const createFruits = () => {
    let counter = 1
    const widthFruit = 90;
    const heightFruit = 70
    const fruits = ['apple.png', 'apricot.png', 'banana.png', 'cherry.png',
                    'coconut.png', 'fig.png', 'grape.png', 'kiwi.png', 'lemon.png',
                    'orange.png', 'pear.png', 'strawberry.png', 'watermelon.png',
                    'avocado.png', 'lime.png', 'melon.png']
    let rowsFruit = Math.floor(heightSquareFruits / heightFruit);
    let columnFruit = Math.floor(widthSquareFruits / widthFruit);
    for (let i = 0; i < rowsFruit; i++) {
        for (let j = 0; j < columnFruit; j++) {
            const fruit = document.createElement('img')
            const fruitIndex = Math.floor(Math.random() * 16)
            fruit.classList.add('fruit')
            // fruit.id = `fruit-${counter}`
            counter++
            fruit.src = `./images/${fruits[fruitIndex]}`
            // fruit.style.background = fruits[randomIndex]
            fruit.style.left = `${j * widthFruit + 10}px`
            fruit.style.top = `${i * 70 + 10}px`
            fruitElemnt.appendChild(fruit)
        }
    }
}

export const moveMoneky = () => {
        let monkeyLeft = parseInt(window.getComputedStyle(moneky).getPropertyValue('left'))
        let monkeyTop = parseInt(window.getComputedStyle(moneky).getPropertyValue('top'))
        moneky.style.left = (monkeyLeft + (10 * horizontalVelocity)) + 'px';
        moneky.style.top = (monkeyTop - (10 * verticalVelocity)) + 'px';
}

export const changeDirection = () => {
    const rect = square.getBoundingClientRect()
    const rectMoneky = moneky.getBoundingClientRect()
        if(rectMoneky.left <= rect.left || rectMoneky.right >= rect.right) {
            horizontalVelocity = -horizontalVelocity
        }
        if(rectMoneky.top  <= rect.top  ) {
            verticalVelocity = -verticalVelocity
        }
}


let score = 0
const removed = document.querySelector('.brickRemoved')
const scoreElement = document.querySelector('.score')
export const removeFruit = () => {
    const fruits = fruitElemnt.querySelectorAll('.fruit')
    fruits.forEach(brick => {
        const rectMoneky = moneky.getBoundingClientRect()
        const rectFruit = brick.getBoundingClientRect()
        if(!brick.classList.contains('remove') && rectMoneky.top <= rectFruit.bottom && rectMoneky.left >= rectFruit.left && rectFruit.right >= rectMoneky.right) {
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
    })
}



export const clock = () => {
    const clock = document.querySelector('.clock')
        clock.style.backgroundImage = `conic-gradient(rgba(26, 23, 194, 0.75) ${angle}deg, rgba(218, 207, 207, 0.94) ${angle}deg)`
    if(angle >= 310) {
        clock.style.backgroundImage = `conic-gradient(rgba(207, 25, 25, 0.78) ${angle}deg, rgba(218, 207, 207, 0.94) ${angle}deg)`
        clock.style.transform = `scale(1.05)`
        clock.style.transition = `transform 1s ease`
    }
    angle += 24
    if(angle > 360) {
        
        clearInterval(clockId)
        lostChance()
    }
}
clock()
const intervalClock = () => {
    clockId = setInterval(clock, 1000)
}
intervalClock()
const chanceElmt = document.querySelector('.chance')
export const createChances = () => {
    const fruits = ['apple.png', 'apricot.png', 'banana.png', 'cherry.png',
        'coconut.png', 'fig.png', 'grape.png', 'kiwi.png', 'lemon.png',
        'orange.png', 'pear.png', 'strawberry.png', 'watermelon.png',
        'avocado.png', 'lime.png', 'melon.png']
    const validFruitIndex = []
    for(let i = 0; i < chanceNumber; i++) {
        const chance = document.createElement('img')
        const fruitIndex = Math.floor(Math.random() * 16)
        if(!validFruitIndex.includes(fruitIndex)){
            validFruitIndex.push(fruitIndex)
            // console.log(validFruitIndex)
            chance.src = `./images/${fruits[fruitIndex]}`
            chanceElmt.appendChild(chance)
        } else {
            i--
        }
    }

}

const  lostChance = () => {
    const chance = document.querySelectorAll('.chance img')
    console.log(chance[currentChanceNumber-1], currentChanceNumber)
    if(chance[currentChanceNumber-1] && !chance[currentChanceNumber-1].classList.contains('disappear')){
        chance[currentChanceNumber-1].classList.add('disappear')
        --currentChanceNumber
        console.log(chance [currentChanceNumber-1],currentChanceNumber)
        if(currentChanceNumber != 0) {
            gameLost(currentChanceNumber, "Try again")
        } else {
            gameLost(currentChanceNumber, "Restart")
        }
    }
        
}

const randomPositionMonkey = () => {
    const rect = square.getBoundingClientRect()
    const rectMoneky = moneky.getBoundingClientRect()
    moneky.style.opacity = '1'
    
    const randomLeft = Math.floor((Math.random() * (rect.right - rect.left - (2 * rectMoneky.width))) + rectMoneky.width)
//    console.log("random", randomLeft, rect.bottom-300)
    moneky.style.left = `${randomLeft}px`
    moneky.style.top = `${rect.bottom - 300}px`
}
randomPositionMonkey()

const lostGame = document.querySelector('.gameLost')
const lostGameBtn = lostGame.querySelector('button')
const gameLost = (currentChanceNumber, btn) => {
    const rectBody = document.querySelector('body').getBoundingClientRect()
    const widthLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('width'))
    const heightLostGame = parseInt(getComputedStyle(lostGame).getPropertyValue('height'))
    lostGame.style.top = `${rectBody.height / 2 - (heightLostGame / 2)}px`
    lostGame.style.left = `${rectBody.width / 2 - (widthLostGame.width / 2)}px`
    const chanceNumberRemain = lostGame.querySelector('h3')
    console.log("gamelost",currentChanceNumber == 0)
    if(currentChanceNumber == 0) {
        console.log('was read')
        chanceNumberRemain.innerHTML = `Game Over!!!!`
        chanceNumberRemain.style.color = 'red'
        lostGameBtn.innerHTML = `${btn}`
        lostGame.querySelector('h1').innerHTML = `Total Score: ${score}`
        
    } else {
        chanceNumberRemain.innerHTML = `Number of chance remains: <strong>${currentChanceNumber}</strong>`
        lostGameBtn.innerHTML = `${btn}`
    }
    lostGame.style.display = 'flex'
    clearInterval(id)
    clearInterval(clockId)
}   

const infinitLoop = () => {
id = setInterval(() => {
        moveMoneky()
        changeDirection()
        removeFruit()
        extremeSquare()
    }, 100)
}
infinitLoop()

const restartBtn = document.querySelector('.gameLost button')
const restartGame = () => {
    if(lostGameBtn.innerHTML == 'Restart') {
        score = 0
        currentChanceNumber = chanceNumber
        scoreElement.innerHTML = `Score: <strong>${score}</strong>`
        chanceElmt.innerHTML = ''
        fruitElemnt.innerHTML = ''
        createChances(currentChanceNumber)
        createFruits()
    }
    angle = 0;
    horizontalVelocity = 1; 
    verticalVelocity = 1;
    clock()
    intervalClock()
    randomPositionMonkey()   
    infinitLoop()
    lostGame.style.display = 'none'
    
}
restartBtn.addEventListener('click', restartGame)
const extremeSquare = () => {
    const rectPaddle = paddle.getBoundingClientRect()
    const rectMoneky = moneky.getBoundingClientRect()
    const rectsquare = square.getBoundingClientRect()
    if(rectMoneky.bottom >= rectPaddle.top && rectPaddle.left <= rectMoneky.right && rectPaddle.right >= rectMoneky.left) {
        verticalVelocity = -verticalVelocity
    }
    if(rectMoneky.top >= rectsquare.bottom) {
        console.log(currentChanceNumber)
        moneky.style.opacity = '0'
        lostChance()
    }
}

