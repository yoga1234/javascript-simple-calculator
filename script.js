// object for hold the data
const calculator = {
  displayValue: '0', // represent input or result on the calculator screen
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// this function is for inputing digit
function inputDigit(digit){
  const { displayValue, waitingForSecondOperand } = calculator;

  //overwrite `displayValue` if the current value is '0' otherwise append to it
  // if displayValue === 0 is true then change it to digit, if not add displayValue with digit
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

// this function is for inputing decimal
function inputDecimal(dot){
  if (calculator.waitingForSecondOperand === true) {
    return;
  }

  // if the displayValue does not container a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // append the decimal point
    calculator.displayValue += dot;
  }
}

// function for second operator
function handleOperator(nextOperator){
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if(operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // Storing result in first operand if it does not exist already
  if(firstOperand == null){
    calculator.firstOperand = inputValue;
  } else if(operator) {
    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

// Object for perform a calculation
const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

// reset the calculator
function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

// function for updating the calculator screen
function updateDisplay(){
  const display = document.querySelector('.calculator-screen');
  // update the value of screen from displayValue in calculator object
  display.value = calculator.displayValue;
}
// calling the updateDisplay() method
updateDisplay();

// selecting a tag which have class of calculator-keys
// and insert it into a constant named keys
const keys = document.querySelector('.calculator-keys');

// add event listener to constant named keys
// listener for click event
// addEventListener(type, listener)
keys.addEventListener('click', (event) => {

  // code here is called as event delegation
  const {target} = event;
  if(!target.matches('button')){
    return;
  }

  if(target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return
  }

  if(target.classList.contains('all-clear')){
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();

});
