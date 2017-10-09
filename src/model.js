function Model() {
    
    this.clickOfNumber= function(e) {

        var input = document.getElementsByTagName('input')[0];
        var currentString = input.value;
        var lastChar = currentString[currentString.length - 1];

        if (e.target.innerHTML == '.' && input.value == '.') {
            input.setAttribute('data-flag', false);
            return;
        } else if (e.target.innerHTML == '.' && input.value != '' && lastChar.search( /\+|\-|\÷|\×|\^/ ) != -1) {
            return
        }
        if (input.getAttribute('data-flag') === 'false') {
            input.value += e.target.innerHTML;
        } else if (input.getAttribute('data-flag') === 'true' && (lastChar.search( /\+|\-|\÷|\×|\^/ ) != -1) ) {
            input.setAttribute('data-flag', false);
            input.value += e.target.innerHTML;
        } else {
            input.setAttribute('data-flag', false);
            input.value = "";
            input.value += e.target.innerHTML;
        }
    }

    this.clickOfOperator= function(e) {
        var input = document.getElementsByTagName('input')[0];
        var currentString = input.value;
        var lastChar = currentString[currentString.length - 1];
        if (!lastChar) {
            return;
        }
        if (lastChar.search( /\+|\-|\÷|\×|\^|\./ ) != -1) {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.value = newString;
        } else if (currentString.length == 0) {
            console.log("enter a number first");
        } else {
            input.value += e.target.innerHTML;
        }
    }

    this.resultAll= function() {
        var input = document.getElementsByTagName('input')[0];
        var inputString = input.value;
        // forming an array of numbers
        var numbers = inputString.split(/\+|\-|\×|\÷|\^/g);
        // forming an array of operators
        var operators = inputString.replace(/[0-9]|\./g, "").split("");

        var divide = operators.indexOf("÷");

        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }

        var multiply = operators.indexOf("×");

        while (multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }

        var divide = operators.indexOf("^");

        while (divide != -1) {
            numbers.splice(divide, 2, Math.pow(numbers[divide], numbers[divide + 1]));
            operators.splice(divide, 1);
            divide = operators.indexOf("^");
        }

        var subtract = operators.indexOf("-");

        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }

        var add = operators.indexOf("+");

        while (add != -1) {
            // using parseFloat is necessary, otherwise it will result in string concatenation 
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }

        input.value = Math.round(numbers[0]*100000)/100000; // displaying the output
        input.setAttribute('data-flag', true);
    }

    this.clearDisplay= function() {
        var input = document.getElementsByTagName('input')[0];
        input.value = "";
        input.setAttribute('data-flag', false);
    }

    this.addPressingEffect= function(event) {
        var target = event.target;

        if (target.tagName != 'BUTTON') {
            return;
        }

        target.classList.add('light-blue');
    }

    this.removePressingEffect= function(event) {
       var target = event.target;

        if (target.tagName != 'BUTTON') {
            return;
        }

        target.classList.remove('light-blue');
    }
}

module.exports = Model;