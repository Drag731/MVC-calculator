function View(controller, model) {

    var mController = controller;
    var mModel = model;
    var arrayOfButton = ['C', '^', 7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '÷', 0, '.', '=', '×'];

    var parentElem = document.body;
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.setAttribute('value', '');
    div.classList.add('calc');
    parentElem.insertBefore(div, parentElem.children[0]);

    for (var i = 0; i < arrayOfButton.length; i++) {
        var button = document.createElement('button');
        div.appendChild(button);
        button.appendChild(document.createTextNode(arrayOfButton[i]));
    };

    div.insertBefore(input, div.children[2]);

    var buttons = div.getElementsByTagName('button');

    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        if(buttons[i].innerHTML.search( /\d|\./ ) != -1)  {
                buttons[i].classList.add('numbers');
        }
        if(button.innerHTML.search( /\+|\-|\÷|\×|\^/ ) != -1) {
                buttons[i].classList.add('green', 'operators');
        }
        if(button.innerHTML == 'C') {
            buttons[i].classList.add('red', 'clear');
        }
        if(button.innerHTML == '=') {
                buttons[i].classList.add('orange', 'result');
        }
    };

    var number = document.querySelectorAll('.numbers'),
        operator = document.querySelectorAll('.operators'),
        result = document.querySelector('.result'),
        clear = document.querySelector('.clear');

    // flag to keep an eye on what output is displaye
    input.setAttribute('data-flag', false);

    // adding click handlers to number buttons
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener("click", mController.clickOfNumber);
    }

    // adding click handlers to operator buttons
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener("click", mController.clickOfOperator);
    }

    // on click of 'equal' button
    result.addEventListener("click", mController.resultAll);

    // clearing the input on press of clear
    clear.addEventListener("click", mController.clearDisplay);

    // visual effect of button pressing
    div.addEventListener('mousedown', mController.addPressingEffect);
    div.addEventListener( "mouseup", mController.removePressingEffect);
}

module.exports = View;