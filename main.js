const all = document.querySelectorAll('*')
const body = document.querySelector('body')
const calcBody = document.getElementById('calc-body')
const calcDisplay = document.getElementById('calc-display')
const allBackgrounds = document.querySelectorAll('.background')
const allButtons = document.querySelectorAll('.all-button')
const allDisplay = document.querySelectorAll('.all-display')
const mainDisplay = document.getElementById('main-display')
const subDisplay = document.getElementById('sub-display')
const numberAndOperatorButtons = document.querySelectorAll('.row .button')
const operands = document.querySelectorAll('.button-mains')
const operators = document.querySelectorAll('.button-operator')
const specialButtons = document.querySelectorAll('.button-specials')
const equalButton = document.querySelector('.button-equal')
const operatorsArray = ['+', '-', '*', '/', 'operators']
const operandsArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'operands']
const specialButtonsArray = ['CE (Space)', 'C (Backspace)', 'specialButtons']
const equalArray = ['=', 'equal']
const buttonCategories = [operatorsArray, operandsArray, specialButtonsArray, equalArray]
const branding = document.querySelector('.branding')
const instruction = document.querySelector('.instruction')
const colorModeButton = document.querySelector('.colormode-change')
const colors = {
    light: {
        base: 'rgb(255, 206, 206)',
        operators: '#9465df',
        operands: '#f7fa5e',
        specialButtons: '#fdb044',
        equal: '#ff7be9',
        display: '#ffefd9',
        background: 'white',
        feedback: 'red'
    },
    dark: {
        base: '#03001C',
        operators: '#152A38',
        operands: '#5B8FB9',
        specialButtons: '#29435C',
        equal: '#B6EADA',
        display: '#301E67',
        background: '#1B262C',
        feedback: '#0ff'
    }
}

let colorMode = 'light'
let userInput = '';

addUserFeedback()
simulateKeyPress()

equalButton.addEventListener('click', () => {
    mainDisplay.innerHTML = subDisplay.innerHTML
    userInput = subDisplay.innerHTML
    subDisplay.innerHTML = '0'
})

colorModeButton.addEventListener('click', () => {
    colorMode == 'light' ? colorMode = 'dark' : colorMode = 'light'
    updateColorMode()
    if (colorMode == 'dark') {
        colorModeButton.style.backgroundColor = '#0ff'
        branding.style.color = '#0ff'
        instruction.style.color = '#0ff' 
    } else if (colorMode == 'light') {
        colorModeButton.style.backgroundColor = '#ffefd9'
        branding.style.color = '#c62c73 '
        instruction.style.color = '#c62c73'
    }
})

for (let button of specialButtons) {
    button.addEventListener('click', (event) => {
        if (event.target.innerHTML == 'C (Backspace)') {
            userInput.charAt(userInput.length -1) == ' ' ? userInput = userInput.slice(0, -3) : userInput = userInput.slice(0, -1)
            updateDisplay()
        } else if (event.target.innerHTML == 'CE (Space)') {
            userInput = ''
            mainDisplay.innerHTML = ''
            subDisplay.innerHTML = ''
        }
    })
}

for (let button of numberAndOperatorButtons) {
    button.addEventListener('click', (event) => {
        operatorsArray.includes(event.target.innerHTML) ? userInput += ` ${event.target.innerHTML} ` : userInput += `${event.target.innerHTML}`
        updateDisplay()
    })
}

function updateDisplay() {
    try {
        userInput == '' ? mainDisplay.innerHTML = '0' : mainDisplay.innerHTML = formatEquation(userInput)
        eval(userInput) == undefined ? subDisplay.innerHTML = 0 : subDisplay.innerHTML = parseInt(eval(userInput)).toLocaleString()
        if (subDisplay.innerHTML == Infinity) {
            subDisplay.innerHTML = "Error"
        }
      } catch (error) {
        /* TeeHee, you found me, i literally dont have to do anything here, 
        i just need to catch the unexpected end of line error on updating the subDisplay because the eval freaks out
        when it has to evaluate something that ends with an operator... until you add the following operands, that is.
        Anyway here we are, i wrote this at 22:32, Oct 16th 2023 on a Monday, still working on my skills before i
        try applying to some internships, i think after this project i'll feel confident enough with my HTML, CSS
        and Vanilla JS Skills to apply on some internships, but... just in case that's not enough (most likely),
        im going to jump into Responsive Web Design and some React after this, welp... we've head out on a tangent,
        going back to work now, bye ~  */
      }
}

function formatEquation(equation) {
    equationSplit = equation.split(' ')
    let finalResult = ''
    for ( variable of equationSplit) {
        if (!isNaN(variable) && !isNaN(parseFloat(variable))) {
            let nf = new Intl.NumberFormat('en-US');
            finalResult += `${nf.format(variable)} `
        } else {
            finalResult += `${variable} `
        }
    }
    return finalResult
}

function addUserFeedback() {
    for (let button of allButtons) {
        button.addEventListener('click', (event) => {
            event.target.style.backgroundColor = colors[colorMode]['feedback']
            setTimeout(function() {
                for (let category of buttonCategories) {
                    if (category.includes(event.target.innerHTML)) {
                        event.target.style.backgroundColor = colors[colorMode][category[category.length - 1]]
                    }
                }
            }, 200);
        })
    }
}

function updateColorMode() {
    body.style.backgroundColor = colors[colorMode]['base']
    equalButton.style.backgroundColor = colors [colorMode]['equal']
    for (bg of allBackgrounds) {
        bg.style.backgroundColor = colors[colorMode]['background']
    }
    for (let button of specialButtons) {
        button.style.backgroundColor = colors[colorMode]['specialButtons']
    }
    for (let button of operands) {
        button.style.backgroundColor = colors[colorMode]['operands']
    }
    for(let button of operators) {
        button.style.backgroundColor = colors[colorMode]['operators']
    }
    for (let part of allDisplay) {
        part.style.backgroundColor = colors[colorMode]['display']
    }

    if (colorMode == 'light') {
        calcBody.style.boxShadow = '1px 1px 0px #bd6e6e, 2px 2px 0px #bd6e6e, 3px 3px 0px #bd6e6e, 4px 4px 0px #bd6e6e, 5px 5px 0px #bd6e6e, 6px 6px 0px #bd6e6e, 7px 7px 0px #bd6e6e, 8px 8px 0px #bd6e6e, 9px 9px 0px #bd6e6e, 10px 10px 0px #bd6e6e, 11px 11px 0px #bd6e6e, 12px 12px 0px #bd6e6e';
        calcBody.style.border = '3px solid #874592'
        calcDisplay.style.border = '3px solid #874592'
        mainDisplay.style.color = '#c62c73'
        subDisplay.style.color = '#c62c73'
    } else if (colorMode == 'dark') {
        calcBody.style.boxShadow = '0px 0px 10px 2px #0ff'
        calcBody.style.border = '3px solid #0ff'
        calcDisplay.style.border = '3px solid #0ff'
        mainDisplay.style.color = '#0ff'
        subDisplay.style.color = '#0ff'
    }
}

function simulateKeyPress() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '0':
                document.querySelector('.button-0').click()
                break;
            case '1':
                document.querySelector('.button-1').click()
                break;
            case '2':
                document.querySelector('.button-2').click()
                break;
            case '3':
                document.querySelector('.button-3').click()
                break;
            case '4':
                document.querySelector('.button-4').click()
                break;
            case '5':
                document.querySelector('.button-5').click()
                break;
            case '6':
                document.querySelector('.button-6').click()
                break;
            case '7':
                document.querySelector('.button-7').click()
                break;
            case '8':
                document.querySelector('.button-8').click()
                break;
            case '9':
                document.querySelector('.button-9').click()
                break;
            case '.':
                document.querySelector('.button-dot').click()
                break;
            case 'Enter':
            case '=':
                document.querySelector('.button-equal').click()
                break;
            case '+':
                document.querySelector('.button-plus').click()
                break;
            case '-':
                document.querySelector('.button-minus').click()
                break;
            case '*':
                document.querySelector('.button-multiply').click()
                break;
            case '/':
                document.querySelector('.button-divide').click()
                break;
            case 'Delete':
            case 'Backspace':
                document.querySelector('.button-c').click()
                break;
            case ' ':
                event.preventDefault()
                document.querySelector('.button-ce').click()
                break;
            case '~':
                document.querySelector('.colormode-change').click()
                break;
        }
    })
}