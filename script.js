// object for hold the data
const calculator = {
  displayValue: '0', // represent input or result on the calculator screen
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit){
  const { displayValue } = calculator;
  //overwrite `displayValue` if the current value is '0' otherwise append to it
  // if displayValue === 0 is true then change it to digit, if not add displayValue with digit
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
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
    console.log('operator', target.value);
    return;
  }

  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    return
  }

  if(target.classList.contains('all-clear')){
    console.log('clear', target.value);
    return;
  }

  inputDigit(target.value);
  updateDisplay();

});
