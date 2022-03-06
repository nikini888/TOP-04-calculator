const numbs = document.querySelectorAll('.btn--number')
const groupOperators = document.querySelector('.btn--operators')
const equal = document.querySelector('.equal')
const showCurrentNumb = document.querySelector('.show-current')
const showInsertNumb = document.querySelector('.show-insert')
const showResult = document.querySelector('.show-result')
let isCalculator = false;
// document.addEventListener('keyup', (e) => {
//     console.log(e.key)
//     console.dir(e)
// })
const data = {
    numbCurrent: null,
    numbStore: null,
    result: 0,
    operate: null,
}
const resetData = {
    numbCurrent: null,
    numbStore: null,
    result: 0,
    operate: null,
}
const operators = [
    {
        name: 'divide',
        icon: 'fa-solid fa-xmark',
    }
]
function addIconClass(el, iconClass) {
    icon.classList.add(iconClass)
}
function textContent(el, string, operator) {
    if (operator) {
        showCurrentNumb.nextElementSibling.classList.add(operators.find(e => e.name === data.operate).icon)

    }
    el.innerText = string
}
document.querySelector('.reset').addEventListener('click', () => {
    for (let key in resetData) {
        data[key] = resetData[key]
    }
    showCurrentNumb.textContent = data.numbCurrent
})
numbs.forEach(num => {
    num.addEventListener('click', (e) => {
        if (data.numbCurrent === null || isCalculator) {
            data.numbCurrent = parseInt(e.target.dataset.num)
        } else {
            data.numbCurrent = parseInt(data.numbCurrent + e.target.dataset.num)
        }
        showCurrentNumb.textContent = data.numbCurrent
    })

})
groupOperators.addEventListener('click', (e) => {
    isCalculator = true;
    data.operate = e.target.closest('.btn--operator').dataset.operator
    data.numbStore = data.numbCurrent;
})
equal.addEventListener('click', (e) => {
    operate(data.numbStore, data.numbCurrent, data.operate);
    textContent(showResult, data.result)
    data.numbCurrent = data.result
})
function plus(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return Number.isInteger(a / b) ? a / b : Number.parseFloat((a / b).toFixed(3))
}

function operate(a, b, operator) {
    switch (operator) {
        case 'divide':
            data.result = divide(a, b)
            break;
        case 'multiply':
            data.result = multiply(a, b)
            break;
        case 'subtract':
            data.result = subtract(a, b)
            break;
        case 'plus':
            data.result = plus(a, b)
            break;
        default:
            console.log('Something went wrong')
    }
}