const btnNumbs = document.querySelectorAll('.btn--number')
const btnGroupOperators = document.querySelector('.btn--operators')

const showInsertNumb = document.querySelector('.show-insert')
const showCurrentNumb = document.querySelector('.show-current')
const showResult = document.querySelector('.show-result')
const operatorIcon = document.querySelector('#operatorIcon')

const btnNegativeNumb = document.querySelector('.isnegative')

const btnBackspace = document.querySelector('.del')
const btnPoint = document.querySelector('.point')
const btnEqual = document.querySelector('.equal')
const btnDelete = document.querySelector('.reset')

const empty = 'empty'
let isEndCalculator = false;


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
    if (b === 0) {
        alert('Cann\'t divide 0')
        resetData()
        return 0
    }
    return Number.isInteger(a / b) ? a / b : Number.parseFloat((a / b).toFixed(3))
}

function countResult(a, b, operator) {
    let result;
    switch (operator) {
        case 'divide':
            result = divide(a, b)
            break;
        case 'multiply':
            result = multiply(a, b)
            break;
        case 'subtract':
            result = subtract(a, b)
            break;
        case 'plus':
            result = plus(a, b)
            break;
        default:
            console.log('Something went wrong')
    }
    data.result = result
}

function styleNumber(str) {
    return str.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    })
}

function checkFloatDigit(str) {
    if (str.split(localDecimal)[1].length === 3) return true
}


function isIncludeDecimal(str) {
    return str.includes(localDecimal)
}

function changeTextContent(el, string) {
    if (string === 'empty') {
        el.innerText = ''
    } else {
        if (typeof string === 'number') {
            el.innerText = styleNumber(string)
        } else {
            el.innerText = el.innerText + string
        }
    }
}

function addIcon() {
    if (data.operate) {
        const icon = operators.find(e => e.name === data.operate).icon
        operatorIcon.classList.add(...icon)
    }
}

function removeIcon() {
    operatorIcon.removeAttribute('class')
}

function resetContent() {
    removeIcon()
    changeTextContent(showCurrentNumb, empty)
    changeTextContent(showInsertNumb, empty)
}

function resetData() {
    for (let key in emptyData) {
        data[key] = emptyData[key]
    }
    resetContent()
    isPoint = false;
    isEndCalculator = false;
    changeTextContent(showResult, data.result)

}
function actionNumb(key) {
    if (showResult.innerText === '0' && (key === '00' || key === '0')) {
        return
    }

    if (isEndCalculator) {
        resetContent()
        data.result = parseInt(key)
        isEndCalculator = false;
    } else if (isIncludeDecimal(showResult.innerText)) {
        if (checkFloatDigit(showResult.innerText)) {
            return
        }
        data.result = parseFloat(showResult.innerText.split(localDecimal).join('.') + key)
        if ((key === '00' || key === '0')) {
            showResult.innerText = showResult.innerText + key
            return
        }

    } else {
        data.result = parseFloat(data.result + key)
    }
    changeTextContent(showResult, data.result)
}
function actionOperator(operate) {
    removeIcon()
    if (isEndCalculator) {
        resetContent()
        isEndCalculator = false;
    }
    data.operate = operate
    data.numbCurrent = data.result
    data.result = 0
    changeTextContent(showCurrentNumb, data.numbCurrent)
    changeTextContent(showResult, empty)
    addIcon()
}
function actionEqual() {
    isEndCalculator = true;
    changeTextContent(showInsertNumb, data.result)
    countResult(data.numbCurrent, data.result, data.operate);
    changeTextContent(showResult, data.result)
    data.numbCurrent = data.result
}
function actionPoint() {
    if (isIncludeDecimal(showResult.innerText)) {
        return
    }
    if (isEndCalculator) {
        resetContent()
        isEndCalculator = false;
    }
    changeTextContent(showResult, localDecimal)
}
function actionBackspace() {
    if (isEndCalculator) {
        resetData()
        isEndCalculator = false;
    } else {
        if (isIncludeDecimal(showResult.innerText)) {
            if (data.result === 0) {
                showResult.innerText = showResult.innerText.replace(/.$/, '')
                return
            }
            if (data.result !== 0) {
                data.result = parseFloat(data.result.toString().replace(/.$/, ''))
                if (data.result === 0) {
                    showResult.innerText = showResult.innerText.replace(/.$/, '')
                    return
                }
            }
        } else if (showResult.innerText.length < 2) {
            data.result = 0
        } else {
            data.result = parseFloat(data.result.toString()
                .replace(/.$/, ''))
        }
    }
    changeTextContent(showResult, data.result)
}
function actionNegative() {
    if (data.result === 0) {
        if (showResult.innerText === '0') return
        showResult.innerText = `- ${showResult.innerText}`
        return
    }
    if (isEndCalculator) {
        resetContent()
        isEndCalculator = false;
    }
    data.result = data.result * -1;
    changeTextContent(showResult, data.result)
}
btnDelete.addEventListener('click', resetData)
btnNumbs.forEach(num => {
    num.addEventListener('click', (e) => {
        actionNumb(e.target.dataset.num)
    })
})

btnGroupOperators.addEventListener('click', (e) => {
    actionOperator(e.target.closest('.btn--operator').dataset.operator)
})
btnEqual.addEventListener('click', actionEqual)
btnNegativeNumb.addEventListener('click', actionNegative)
btnBackspace.addEventListener('click', actionBackspace)

btnPoint.addEventListener('click', actionPoint)


//Use keyup

const keyNumbList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const pointNumb = { name: 'point', key: '.' }
const keyEqual = [
    { name: 'equal', key: '=' },
    { name: 'equal', key: 'Enter' },
]
const operateKey = [
    { name: 'divide', key: '/' },
    { name: 'multiply', key: '*' },
    { name: 'subtract', key: '-' },
    { name: 'plus', key: '+' },
]
const backspace = { name: 'del', key: 'Backspace' }
const resetAc = { name: 'reset', key: 'Delete' }

function btnActive(btn) {
    btn.classList.add('active')
    btn.addEventListener('transitionend', () => {
        btn.classList.remove('active')
    })
}

document.addEventListener('keyup', (e) => {
    const keyUp = e.key
    if (keyNumbList.includes(keyUp)) {
        btnNumbs.forEach(num => {
            if (num.dataset.num === keyUp) {
                btnActive(num)
            }
        })
        actionNumb(keyUp)
        return
    }
    keyEqual.forEach(item => { checkKeyNotNumbOneItem(item.key, keyUp, actionEqual, btnEqual) })
    operateKey.forEach(item => {
        if (item.key === keyUp) {
            document.querySelectorAll('.btn--operator').forEach(operate => {
                if (operate.dataset.operator === item.name) {
                    btnActive(operate)
                }
            })
            actionOperator(item.name)
            return
        }
    })
    checkKeyNotNumbOneItem(backspace.key, keyUp, actionBackspace, btnBackspace)
    checkKeyNotNumbOneItem(resetAc.key, keyUp, resetData, btnDelete)
    checkKeyNotNumbOneItem(pointNumb.key, keyUp, actionPoint, btnPoint)
})
function checkKeyNotNumbOneItem(value, key, func, btn) {
    if (value === key) {
        func()
        btnActive(btn)
        return
    }
}