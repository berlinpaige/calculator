
var calculator = {

  masterEquation: [],
  operatorClicked: [],
  numberClicked: [],
  decimalHasBeenClicked: false,


  init: function(){
    $('.number').click(calculator.numberIsClicked);
    $('.operator').click(calculator.operatorIsClicked);
    $('.equals').click(calculator.equalsIsClicked);
    $('.clear').click(calculator.clearIsClicked);
    $('#decimal').click(calculator.decimalIsClicked);
    $('#negativeSign').click(calculator.negativeSignIsClicked); 
  },

  numberIsClicked: function(event){
    event.preventDefault();
    var numberSelected = $(this).text();
    calculator.numberClicked.push(numberSelected);
    console.log('numbers clicked :' , calculator.numberClicked);
    $('h1').text(calculator.numberClicked.toString().replace(/,/g, ''));
    
  },

  operatorIsClicked: function(event){
    event.preventDefault();
    calculator.decimalHasBeenClicked = false;
    $('#decimal').removeAttr('disabled');
    var operatorToUse = $(this).text();
    calculator.operatorClicked.push(operatorToUse);
    if (calculator.numberClicked.length !== 0 ){
      calculator.masterEquation.push(calculator.numberClicked.join(''));
      console.log('master equation:',calculator.masterEquation);
      console.log('operators', calculator.operatorClicked);
      calculator.numberClicked = [];
    }

    if (calculator.operatorClicked.length === 2){
      calculator.compute();
      console.log('master equation:',calculator.masterEquation);
    }if (calculator.masterEquation.length === 2 && calculator.operatorClicked.length < 2){
      calculator.masterEquation.shift();
      console.log('master equation after shift:',calculator.masterEquation);
    }


  },

  equalsIsClicked: function(event){
    event.preventDefault();
    calculator.masterEquation.push(calculator.numberClicked.join(''));
    calculator.masterEquation.splice(1, 2, calculator.numberClicked.join(''))
    calculator.compute();
    calculator.operatorClicked = [];
    calculator.numberClicked = [];
    calculator.decimalHasBeenClicked = false;
    $('#decimal').removeAttr('disabled');
    console.log('master equation:',calculator.masterEquation);
    console.log('numberclickedLast: ', calculator.numberClicked);


  },
  decimalIsClicked: function(event){
    calculator.decimalHasBeenClicked = true;
    if (calculator.decimalHasBeenClicked === true){
      $(this).attr('disabled', 'disabled');
    }
  },
  negativeSignIsClicked: function(){
    if(calculator.numberClicked[0] !== '-'){
      calculator.numberClicked.unshift('-');
    }else if (calculator.numberClicked[0] === '-'){
      calculator.numberClicked.shift('-');
    }
    /*if(calculator.masterEquation[0] !== '-'){
      calculator.masterEquation.unshift('-');
    }else if (calculator.masterEquation[0] === '-'){
      calculator.masterEquation.shift('-');    
    }*/
    $('h1').text(calculator.numberClicked.toString().replace(/,/g, ''));
  },

  clearIsClicked: function(event){
    event.preventDefault();
    calculator.masterEquation = [];
    calculator.operatorClicked = [];
    calculator.numberClicked = [];
    calculator.decimalHasBeenClicked = false;
    $('#decimal').removeAttr('disabled');
    $('h1').text('');
    console.log('afterclear master', calculator.masterEquation);
    console.log('afterclear operator', calculator.operatorClicked);
    console.log('afterclear number', calculator.numberClicked);
  },

  compute: function(){
    var op = calculator.operatorClicked.shift();
    var num1 = calculator.masterEquation[0];
    var num2 = calculator.masterEquation[1];
    var result;
    switch(op){
      case '+': result = parseFloat(num1) + parseFloat(num2); break;
      case '-': result = parseFloat(num1) - parseFloat(num2); break;
      case '*': result = parseFloat(num1) * parseFloat(num2); break;
      case '/': result = parseFloat(num1) / parseFloat(num2); break;
      case '%': result = parseFloat(num1) / 100;
    }
    console.log('final answer', calculator.masterEquation.splice(0, 2, result));
    $('h1').text(calculator.masterEquation);
    console.log('to manipulate', result);
    if (result === undefined || NaN){
       $('h1').text('undefined');
       calculator.clearIsClicked();
    }
  }
}
$(document).ready(calculator.init);