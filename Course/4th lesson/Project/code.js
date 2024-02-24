const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const TimeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000) //через каждный промежуток времени который мы заданим она будет выполнять функцию (1000 = 1 секунда)
    createRandomCircle()
    setTime(time)
}

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function decreaseTime() {
    if(time === 0) {
        finishGame()
    }else {
        let current = --time
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    TimeEl.innerHTML = `00:${value}`
}

function finishGame() {
    TimeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`

}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    board.append(circle)
}

function getRandomNumber(min, max) { 
    return Math.round(Math.random() * (max - min) + min)
}