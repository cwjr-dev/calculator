"use strict";

const buttons = document.querySelector(".buttons");

const operation = {
    operand1: 0,
    operator: "",
    operand2: 0
};

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

// handles the type of button clicked (e.g. number, operator, delete, etc.)
function handleClick(event) {
    const element = event.target;

    if (element.tagName === "BUTTON") {
        const btnType = ["all-clear-btn", "clear-btn", "delete-left-btn", "operator-btn", "number-btn",
            "plus-minus-btn", "decimal-btn", "equal-btn"
        ].find(cls => element.classList.contains(cls));

        switch(btnType) {
     

        }
    }
}


buttons.addEventListener("click", handleClick);