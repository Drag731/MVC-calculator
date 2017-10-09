/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Model = __webpack_require__(1);
var Controller = __webpack_require__(2);

var model = new Model();                            
var controller = new Controller(model);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var View = __webpack_require__(3);


function Controller(model) {
    
    var mModel = model; 
   
    this.clickOfNumber= function(e) {
        mModel.clickOfNumber(e);
    }

    this.clickOfOperator= function(e) {
        mModel.clickOfOperator(e);
    }

    this.resultAll= function() {
        mModel.resultAll();
    }

    this.clearDisplay= function() {
        mModel.clearDisplay();
    }

    this.addPressingEffect= function(event) {
        mModel.addPressingEffect(event);
    }

    this.removePressingEffect= function(event) {
        mModel.removePressingEffect(event);
    }

     var mView = new View(this, model);
}

module.exports = Controller;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);