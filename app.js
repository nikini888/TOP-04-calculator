const numbs = document.querySelectorAll('.btn--number')
const btnGroupOperators = document.querySelector('.btn--operators')
const btnEqual = document.querySelector('.equal')
const showInsertNumb = document.querySelector('.show-insert')
const showCurrentNumb = document.querySelector('.show-current')
const showResult = document.querySelector('.show-result')
const operatorIcon = document.querySelector('#operatorIcon')

const btnNegativeNumb = document.querySelector('.isnegative')
const btnDelete = document.querySelector('.del')
const btnPoint = document.querySelector('.point')
const empty = 'empty'
let isEndCalculator = false;
let isFloatNumb = false;
// document.addEventListener('keyup', (e) => {
//     console.log(e.key)
//     console.dir(e)
// })
function getLocalFormatDecimal() {
    const numb = 1.1;
    return numb.toLocaleString().slice(1, 2)
}
const localDecimal = getLocalFormatDecimal()
const data = {
    numbCurrent: 0,
    result: 0,
    operate: '',
}

console.log(data.numbCurrent)
const emptyData = {
    numbCurrent: 0,
    result: 0,
    operate: '',
}
const historyResults = [

]
const historyResult = { calculator: null, histResult: null, }
const operators = [
    {
        name: 'divide',
        icon: ['fa-solid', 'fa-divide'],
    },
    {
        name: 'multiply',
        icon: ['fa-solid', 'fa-xmark'],
    },
    {
        name: 'subtract',
        icon: ['fa-solid', 'fa-minus'],
    },
    {
        name: 'plus',
        icon: ['fa-solid', 'fa-plus'],
    },
];


//operator syntax
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

function countResult(a, b, operator) {
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


function changeTextContent(el, string) {
    if (data.operate) {
        const icon = operators.find(e => e.name === data.operate).icon
        operatorIcon.classList.add(...icon)
    }
    if (string === 'empty') {
        el.innerText = ''
    } else {
        if (typeof string === 'number') {
            el.innerText = Intl.NumberFormat().format(string)
        } else {
            el.innerText = el.innerText + string
        }
    }
}
function resetData() {
    for (let key in emptyData) {
        data[key] = emptyData[key]
    }
    operatorIcon.removeAttribute('class')
    changeTextContent(showCurrentNumb, empty)
    changeTextContent(showInsertNumb, empty)
    changeTextContent(showResult, data.result)
}
document.querySelector('.reset').addEventListener('click', resetData)
numbs.forEach(num => {
    num.addEventListener('click', (e) => {
        if (showResult.innerText === 0 && e.target.dataset.num === '00') return
        if (isEndCalculator) {
            resetData()
            isEndCalculator = false;
        }
        if (isFloatNumb) {
            if (e.target.dataset.num === '0' || e.target.dataset.num === '00') {
                changeTextContent(showResult, e.target.dataset.num)
                return
            } else {
                isFloatNumb = false
                if (data.result === 0) {
                    data.result = parseFloat(showResult.innerText.split(localDecimal).join('.') + e.target.dataset.num)
                } else {
                    data.result = data.result + parseFloat(`0.${e.target.dataset.num}`)
                }
            }
        } else {
            data.result = parseFloat(data.result + e.target.dataset.num)
        }
        changeTextContent(showResult, data.result)
    }
    )
})

btnGroupOperators.addEventListener('click', (e) => {
    if (isEndCalculator) {
        changeTextContent(showInsertNumb, '')
        isEndCalculator = false;
    }
    data.operate = e.target.closest('.btn--operator').dataset.operator
    data.numbCurrent = data.result;
    data.result = 0;
    console.log('Tinh', data)
    changeTextContent(showCurrentNumb, data.numbCurrent)
})
btnEqual.addEventListener('click', () => {
    isEndCalculator = true;
    changeTextContent(showInsertNumb, data.result)
    countResult(data.numbCurrent, data.result, data.operate);
    changeTextContent(showResult, data.result)
    data.numbCurrent = data.result
})
btnNegativeNumb.addEventListener('click', () => {
    data.result = data.result * -1;
    changeTextContent(showResult, data.result)
})
btnDelete.addEventListener('click', () => {
    if (data.set === 0) return
    data.result = parseFloat(data.result.toString().replace(/.$/, ''));
    changeTextContent(showResult, data.result)
})
btnPoint.addEventListener('click', () => {
    isFloatNumb = true;
    changeTextContent(showResult, localDecimal)
})
function deleteTheLastOneString(el) {
    el.innerText = el.innerText.replace(/.$/, '')
}
function addTheLastOneString(el, numb) {
    el.innerText = el.innerText + numb
}