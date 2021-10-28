class Calculator {
  constructor(currentDisplay, previousDisplay) {
    this.currentDisplay = currentDisplay;
    this.previousDisplay = previousDisplay;
    this.clear();
  }

  clear() {
    this.currentOperend = '';
    this.previousOperend = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperend != '') {
      this.currentOperend = this.currentOperend.slice(0, this.currentOperend.length - 1);
    }
  }


  appendNumbers(number) {
    if (this.currentOperend.includes('.') && number === '.') return;
    this.currentOperend = this.currentOperend + number;
  }

  updateDisplay() {
    if (this.currentOperend == '')
      this.currentDisplay.innerText = 0;
    else
      this.currentDisplay.innerText = this.currentOperend;
    if (this.operation != undefined) {
      this.previousDisplay.innerText = this.previousOperend + " " + this.operation.toString();
    }
    else {
      this.previousDisplay.innerText = '';

    }
  }

  chooseOperations(operation) {
    if (this.currentOperend == '' || this.currentOperend == 0) {
      alert("please enter your number");
    }
    else {
      this.previousOperend = this.currentOperend;
      this.operation = operation;
      this.currentOperend = '';
    }
  }

  calculate() {
    switch (this.operation) {
      case '+':
        this.currentOperend = (parseInt(this.previousOperend) + parseInt(this.currentOperend)).toString();
        this.previousOperend = '';
        this.operation = undefined;
        break;
      case '÷':
        this.currentOperend = (parseInt(this.previousOperend) / parseInt(this.currentOperend)).toString();
        this.previousOperend = '';
        this.operation = undefined;
        break;
      case '×':
        this.currentOperend = (parseInt(this.previousOperend) * parseInt(this.currentOperend)).toString();
        this.previousOperend = '';
        this.operation = undefined;
        break;
      case '-':
        this.currentOperend = (parseInt(this.previousOperend) - parseInt(this.currentOperend)).toString();
        this.previousOperend = '';
        this.operation = undefined;
        break;
    }
  }


}

const numberButtons = document.querySelectorAll('[data-button-number]');
const operationsButtons = document.querySelectorAll('[data-button-operations]');
const equalButton = document.querySelector('[data-button-equal]');
const deleteButton = document.querySelector('[data-button-del]');
const acButton = document.querySelector('[data-button-ac]');
const currentDisplay = document.querySelector('[data-current-display]');
const previousDisplay = document.querySelector('[data-previous-display]');

const calculator = new Calculator(currentDisplay, previousDisplay);

numberButtons.forEach(item => {
  item.addEventListener('click', () => {
    calculator.appendNumbers(item.innerText);
    calculator.updateDisplay();
  })
})
operationsButtons.forEach(item => {
  item.addEventListener('click', () => {
    calculator.chooseOperations(item.innerText);
    calculator.updateDisplay();
  })
})

acButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
  currentDisplay.innerText = 0;
})
equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})