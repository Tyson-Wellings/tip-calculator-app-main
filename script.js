const wrappers = document.getElementsByClassName('calculator-section-wrapper')
const inputs = document.getElementsByClassName('input');
const tipButtons = document.getElementsByClassName('tip-buttons')
var tipPercentage;
/* this neat sequences of declaring arrays and fillin them with 0s is alot faster and elegant
when compared to using forLoops
https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
*/
var errorMessageLog = []
errorMessageLog.length = wrappers.length; 
errorMessageLog.fill(0);

var tipButtonStates = []
tipButtonStates.length = tipButtons.length;
tipButtonStates.fill(0);

const init = function () {
    document.getElementById('reset').addEventListener('click', reset);
    console.log(inputs)
    Array.from(inputs).forEach(prepareInputs) //document.getElementsByClassName returns classes as a HTML Collection
    Array.from(tipButtons).forEach(prepareTipButtons) //Array.from converts these into an array making them
   /*  compatible with forEach
    https://dmitripavlutin.com/foreach-iterate-array-javascript/ */
    

}

const reset = function () {
    document.getElementById('calculator-inputs').reset();
    Array.from(tipButtons).forEach(resetButtons)
}

function resetButtons (input){
    input.style.backgroundColor ="hsl(183, 100%, 15%)"
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
    
    wrapper = wrappers[index]
    if (target.value > 0) {

        target.style.border = 'none'
        if (errorMessageLog[index] == 1) { 
            document.getElementById('error-message-' + index).style.display = 'none' //hides any error messages that may be present
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
        /* if an error message has been created already this will just fill the div with the appropriate text */
        document.getElementById('error-message-' + index).textContent = node;
        document.getElementById('error-message-' + index).style.display = 'inline-block'
        return
    }

    let errorMessage = document.createElement("div")
    errorMessage.id = "error-message-" + index
    errorMessage.className = "error-message";
    errorMessageLog[index] = 1
    errorMessage.textContent = node;
    wrapper.insertBefore(errorMessage, wrapper.firstChild);

}

function calculate() {

   /*  majority of this function is just mathematical calculations */
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
        document.getElementById('reset').style.opacity = '1'
        return
    }

    /* If all the user inputted values are not above 0 the calculator will display 0 */
    document.getElementById('tip-amount').textContent = '$' + zero.toFixed(2)
    document.getElementById('tip-per-person').textContent = '$' + zero.toFixed(2)
}

function prepareTipButtons(button) {

    document.getElementById('tip').addEventListener('focusout', e => calculateTipPercentage(e))
    button.addEventListener('click', e => calculateTipPercentage(e))

}

function calculateTipPercentage(button) {
    console.log(button)
    tipPercentage = button.target.value
    console.log(tipPercentage)
    for (let tipButtonsCount = 0;tipButtonsCount < tipButtons.length; tipButtonsCount++ ){
        tipButtons[tipButtonsCount].style.backgroundColor ="hsl(183, 100%, 15%)"
        if (tipPercentage == tipButtons[tipButtonsCount].value && !(button.target == document.getElementById('tip'))){
            tipButtons[tipButtonsCount].style.backgroundColor ="hsl(172, 67%, 45%)"
        }
    }
    calculate()

   
}

document.addEventListener('DOMContentLoaded', init);


