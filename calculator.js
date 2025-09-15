"use strict";

const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");
const buttons = document.querySelector(".buttons");

const operation = {
    operand1: 0,
    operator: "",
    operand2: 0
};

let isOperand2Entered = false;
let isOperationComplete = false;

// math operators
function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    if (operand2 !== 0) {
        return operand1 / operand2;
    }
    else {
        return "Can't divide by 0";
    }
}

// executes the appropriate math function based on operator
function operate(operator, operand1, operand2) {
    let result;

    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        
        case "−":
            result = subtract(operand1, operand2);
            break;

        case "×":
            result = multiply(operand1, operand2);
            break;

        case "÷":
            result = divide(operand1, operand2);
    }

    return result;
}

// handles the type of button clicked (e.g. number, operator, delete, etc.)
function handleClick(event) {
    const element = event.target;

    if (element.tagName === "BUTTON") {
        const btnType = ["all-clear-btn", "clear-btn", "delete-left-btn", "operator-btn", "number-btn",
            "plus-minus-btn", "decimal-btn", "equal-btn"
        ].find(cls => element.classList.contains(cls));

        switch(btnType) {
            case "all-clear-btn":
                handleAllClearClick();
                break;

            case "clear-btn":
                handleClearClick();
                break;
            
            case "number-btn":
                handleNumberClick(event);
                break;
            
            case "operator-btn":
                handleOperatorClick(event);
                break;

            case "equal-btn":
                handleEqualClick(event);
        }
    }
}

// reset the calculator's settings to default values
function handleAllClearClick() {
    operation.operand1 = 0;
    operation.operator = "";
    operation.operand2 = 0;
    
    upperDisplay.textContent = "";
    lowerDisplay.textContent = "0";

    isOperand2Entered = false;
    isOperationComplete = false;
}

// sets the current operand being built to 0
function handleClearClick() {
    lowerDisplay.textContent = 0;
    isOperand2Entered = false;
}

// appends the number clicked to the lower display
function handleNumberClick(event) {    
    if (isOperationComplete) {
        handleAllClearClick();        
    }
    
    const number = event.target.textContent;

    if (operation.operator === "") {
        if (lowerDisplay.textContent === "0") {
            lowerDisplay.textContent = number;
        }
        else {
            lowerDisplay.textContent += number;
        }
    }
    else if (operation.operator !== "") {
        if (isOperand2Entered) {
            lowerDisplay.textContent += number;
        }
        else {
            isOperand2Entered = true;
            lowerDisplay.textContent = number;
        }
    }
}

// sets the selected operator for the operation
function handleOperatorClick(event) {
    const operator = event.target.textContent;
    
    if (isOperationComplete) {        
        operation.operand1 = +lowerDisplay.textContent;
        operation.operator = operator;
        isOperand2Entered = false;
        isOperationComplete = false;

        upperDisplay.textContent = `${operation.operand1} ${operation.operator}`;
    }
    else if (!isOperand2Entered) {
        operation.operator = operator;        
        operation.operand1 = +lowerDisplay.textContent;
        upperDisplay.textContent = `${operation.operand1} ${operation.operator}`;
    }
    else {
        operation.operand2 = +lowerDisplay.textContent;
        const result = operate(operation.operator, operation.operand1, operation.operand2);
        operation.operator = operator;

        operation.operand1 = result;
        upperDisplay.textContent = `${operation.operand1} ${operation.operator}`;
        lowerDisplay.textContent = result;
        isOperand2Entered = false;
    }    
}

// calculates and displays a single operation
function handleEqualClick() {
    if (operation.operator === "") {
        operation.operand1 = +lowerDisplay.textContent;
        upperDisplay.textContent = `${operation.operand1} =`;
    }    
    else {
        isOperationComplete = true;
        operation.operand2 = +lowerDisplay.textContent;
        upperDisplay.textContent = `${operation.operand1} ${operation.operator} ${operation.operand2} =`;

        const result = operate(operation.operator, operation.operand1, operation.operand2);
        lowerDisplay.textContent = result;
    }
}

buttons.addEventListener("click", handleClick);