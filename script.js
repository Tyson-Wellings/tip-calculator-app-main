const inputs = document.getElementsByClassName('input');
const init = function(){ 
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('bill').addEventListener('focusout', validate)
    
} 

const reset = function(){
    document.getElementById('calculator-inputs').reset();
}

function validate(){
    console.log("input value has changed")
/*     if (inputs[index].value > 0){
        inputs[index].style.border = 'none'
        return
    }
    
    errorMessage(index)
    return */
}

function errorMessage(index){
    inputs[index].style.border = 'solid 2px rgb(204,0,0)'
    
}


document.addEventListener('DOMContentLoaded', init); 

