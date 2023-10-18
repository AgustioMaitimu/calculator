const mainDisplay = document.querySelector('#main-display')
const subDisplay = document.querySelector('#sub-display')
const allButtons = document.querySelectorAll('.all-button')
const numberAndOperatorButtons = document.querySelectorAll('.row .button')
const cButton = document.querySelector('.button-c')
const ceButton = document.querySelector('.button-ce')
const equalButton = document.querySelector('.button-equal')
const operators = ['+', '-', '*', '/', 'operators']
const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'operands']
const specialButtons = ['CE', 'C', 'specialButtons']
const equal = ['=', 'equal']
const buttonCategories = [operators, operands, specialButtons, equal]
const colors = {
    lightMode: {
        operators: '#9465df',
        operands: '#f7fa5e',
        specialButtons: '#fdb044',
        equal: '#ff7be9'
    },
    darkMode: {}
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

cButton.addEventListener('click', () => {
    userInput.charAt(userInput.length -1) == ' ' ? userInput = userInput.slice(0, -3) : userInput = userInput.slice(0, -1)
    updateDisplay()
})

ceButton.addEventListener('click', () => {
    userInput = ''
    mainDisplay.innerHTML = ''
    subDisplay.innerHTML = ''
})

for (let button of numberAndOperatorButtons) {
    button.addEventListener('click', (event) => {
        operators.includes(event.target.innerHTML) ? userInput += ` ${event.target.innerHTML} ` : userInput += `${event.target.innerHTML}`
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
            case 'Backspace':
                document.querySelector('.button-c').click()
                break;
            case 'Delete':
                document.querySelector('.button-ce').click()
                break;
        }
    })
}

function addUserFeedback() {
    for (let button of allButtons) {
        button.addEventListener('click', (event) => {
            event.target.style.backgroundColor = 'red'
            setTimeout(function() {
                for (let category of buttonCategories) {
                    if (category.includes(event.target.innerHTML)) {
                        event.target.style.backgroundColor = colors['lightMode'][category[category.length - 1]]
                    }
                }
            }, 200);
        })
    }
}