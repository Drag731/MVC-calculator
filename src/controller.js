var View = require('./view.js');


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