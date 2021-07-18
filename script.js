const wrappers = document.getElementsByClassName('calculator-section-wrapper')
const inputs = document.getElementsByClassName('input');
const tipButtons = document.getElementsByClassName('tip-buttons')
var errorMessageLog = []
var tipPercentage;
console.log(inputs)
for (let wrapperCount = 0; wrapperCount < wrappers.length; wrapperCount++) {
    errorMessageLog[wrapperCount] = 0;
}

const init = function () {
    document.getElementById('reset').addEventListener('click', reset);
    console.log(Array.from(inputs))
    Array.from(inputs).forEach(prepareInputs)
    Array.from(tipButtons).forEach(prepareTipButtons)
    //inputs[i].addEventListener('focusout', calculate) 

}

const reset = function () {
    document.getElementById('calculator-inputs').reset();
}

function prepareInputs(input, index) {
    console.log(index)
    input.addEventListener('focusout', e => validate(index, e.target))
    input.addEventListener('focusout', calculate)
    //e contains the event info in a json format
    //using an arrow function to then call the validate function as oppossed to running the validate function 
    //straight up prevents the validate function running when the document loads.
}

function validate(index, target) {
    console.log(errorMessageLog)
    wrapper = wrappers[index]
    if (target.value > 0) {

        target.style.border = 'none'
        if (errorMessageLog[index] == 1) {
            document.getElementById('error-message-' + index).style.display = 'none'
        }
        return
    }

    if (target.value == 0) {
        errorMessage(target, wrapper, 0, index)
        return
    }

    if (target.value < 0) {
        errorMessage(target, wrapper, target.value, index)
        return
    }

    return

}
function errorMessage(target, wrapper, value, index) {
    target.style.border = 'solid 2px rgb(204,0,0)'
    messageMaker(value, wrapper, index)

}

function messageMaker(value, wrapper, index) {

    let node;

    if (value == 0) {
        node = "Can't be 0";
    }

    if (value < 0) {
        node = "negative value"
    }

    if (errorMessageLog[index] == 1) {
        console.log(node)
        document.getElementById('error-message-' + index).textContent = node;
        document.getElementById('error-message-' + index).style.display = 'inline-block'
        return
    }
    console.log(node)
    let errorMessage = document.createElement("div")
    errorMessage.id = "error-message-" + index
    errorMessage.className = "error-message";
    errorMessageLog[index] = 1
    errorMessage.textContent = node;
    wrapper.insertBefore(errorMessage, wrapper.firstChild);

}

function calculate() {
    var tipTotal, tipPerPerson, zero
    document.getElementById('tip').value;
    zero = 0;
    bill = document.getElementById('bill').value;
    people = document.getElementById('people').value;
    tipTotal = bill * tipPercentage / 100;
    tipPerPerson = tipTotal / people;
    if (tipTotal > 0 && tipPerPerson > 0 && people > 0) {
        document.getElementById('tip-amount').textContent = '$' + tipTotal.toFixed(2)
        document.getElementById('tip-per-person').textContent = '$' + tipPerPerson.toFixed(2)
        return
    }
    document.getElementById('tip-amount').textContent = '$' + zero.toFixed(2)
    document.getElementById('tip-per-person').textContent = '$' + zero.toFixed(2)
}

function prepareTipButtons(button) {

    button.addEventListener('focusout', e => calculateTipPercentage(e))
    button.addEventListener('click', e => calculateTipPercentage(e))
    button.addEventListener('click', e => console.log('clicked'))

}

function calculateTipPercentage(button) {
    tipPercentage = button.target.value
    console.log('tip-percentage is ' + tipPercentage)
}

document.addEventListener('DOMContentLoaded', init);


