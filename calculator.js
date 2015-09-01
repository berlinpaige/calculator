var calculator = {

  masterEquation: [],
  operatorClicked: [],
  numberClicked: [],
  decimalHasBeenClicked: false,
  numberToEvaluate: 0,
  operatorWasClickedLast: false,
  equalsClickedLast: false,
  percentClickedLast: true,
  rightAfterEquals: false,
  randomColorFeatureInitiated: false,
  normalColorFeatureInitiated: true,
  pickYourColorFeatureInitiated: false,

  init: function(){
    $('.number').click(calculator.numberIsClicked);
    $('.operator').click(calculator.operatorIsClicked);
    $('.equals').click(calculator.equalsIsClicked);
    $('.clear').click(calculator.clearIsClicked);
    $('.decimal').click(calculator.decimalIsClicked);
    $('#percentSign').click(calculator.percentSignIsClicked);
    $('.randomColorGenerator').click(calculator.randomColorGenerator);
    $('.pickYourColorGenerator').click(calculator.pickYourColor);
    $('.normalColorFeature').click(calculator.normalColor);
    $('#colorSelect').toggle();
  },
  randomColorGenerator: function(){
    calculator.randomColorFeatureInitiated = true;
    calculator.normalColorFeatureInitiated = false;
    calculator.pickYourColorFeatureInitiated = false;
    console.log('color feature', calculator.randomColorFeatureInitiated);
  },
  normalColor: function(){
    calculator.randomColorFeatureInitiated = false;
    calculator.normalColorFeatureInitiated = true;
    calculator.pickYourColorFeatureInitiated = false;
    $('.normalBackground').css({"background-color" : 'rgba(0, 51, 153, 0.85)'});
    $('button').css({'color' : '#000000' ,'background-color' : '#80b2ff'});
    $('.display').css({'background-color' : '#ffffff', 'color' : '#000000'})
  },
  pickYourColor: function(){
    calculator.randomColorFeatureInitiated = false;
    calculator.normalColorFeatureInitiated = false;
    calculator.pickYourColorFeatureInitiated = true;
    $('#colorSelect').toggle();
    calculator.personalizeColor();
  },
  numberIsClicked: function(event){
    event.preventDefault();
    calculator.operatorWasClickedLast = false;
    if(calculator.numberClicked.length >= 20){
      $('.number').attr('disabled', 'disabled');
    } 
    var numberSelected = $(this).attr('id');
    console.log('number selected', numberSelected);
    if (numberSelected === '-' && (calculator.equalsClickedLast === true || calculator.percentClickedLast === true)){
      var variableToMove = calculator.masterEquation.pop();
      if(variableToMove > 0){
      calculator.numberClicked.push(variableToMove);
      }else if(variableToMove < 0){
      variableToMove = variableToMove * -1;
      var arrayToJoin = calculator.numberClicked.push(variableToMove);
      calculator.rightAfterEquals = true;
        console.log("rightAfterEquals", calculator.rightAfterEquals);
      } 
    } 
    calculator.equalsClickedLast = false;
    if (numberSelected === '-' && calculator.equalsClickedLast === false){
      if(calculator.numberClicked[0] !== '-'){
       if(calculator.rightAfterEquals === false){ 
        calculator.numberClicked.unshift(numberSelected);
       }else{
        calculator.rightAfterEquals = false;
       }
      }else if (calculator.numberClicked[0] === '-'){
        calculator.numberClicked.shift(numberSelected);
      }
    }else{
      calculator.numberClicked.push(numberSelected);
    }
    $('h1').text(calculator.numberClicked.toString().replace(/,/g, ''));
    if ($('h1').text().length >= 13){
      $('h1').css({'font-size' : '130%'});
    }else{
      $('h1').css({'font-size' : '200%'});
    }
    console.log('BestInfo MasterEquationArray', calculator.masterEquation);
    console.log('BestInfo operatorClickedArray:', calculator.operatorClicked);
    console.log('BestInfo numberClickedArray:' , calculator.numberClicked);
    console.log('best info equals clicked last:', calculator.equalsClickedLast);
  },

  operatorIsClicked: function(event){
    event.preventDefault();
    calculator.decimalHasBeenClicked = false;
    calculator.operatorWasClickedLast = true;
    calculator.equalsClickedLast = false;
    $('.decimal').removeAttr('disabled');
    var operatorToUse = $(this).attr('id');
    calculator.operatorClicked.push(operatorToUse);
    if (calculator.numberClicked.length !== 0){
       calculator.masterEquation.push(calculator.numberClicked.join(''));
       calculator.numberClicked = [];
    }
    if (calculator.operatorClicked.length === 2){
      calculator.compute();
    }
    if (calculator.masterEquation.length === 2 && calculator.operatorClicked.length < 2){
      calculator.masterEquation.shift();
    }
     if ($('h1').text() === 'NaN'){
       $('.number').attr('disabled', 'disabled');
       $('.operator').attr('disabled', 'disabled');
       $('.equals').attr('disabled', 'disabled');
       $('h1').text('undefined');
    }
    console.log('BestInfo MasterEquationArray', calculator.masterEquation);
    console.log('BestInfo operatorClickedArray:', calculator.operatorClicked);
    console.log('BestInfo numberClickedArray:' , calculator.numberClicked);
    console.log('best info equals clicked last:', calculator.equalsClickedLast);
  },
  equalsIsClicked: function(event){
    event.preventDefault;
    if (calculator.randomColorFeatureInitiated === true){
      calculator.randomColorFeature();
      console.log('randomColorWorks!')
    }
    calculator.equalsClickedLast = true;
    calculator.operatorWasClickedLast = true;
    console.log('masterequa1', calculator.masterEquation.push(calculator.numberClicked.join('')));
    console.log('masterequa2',calculator.masterEquation.splice(1, 2, calculator.numberClicked.join('')));
    calculator.compute();
    calculator.operatorClicked = [];
    calculator.numberClicked = [];
    calculator.decimalHasBeenClicked = false;
    $('.decimal').removeAttr('disabled');
    $('.number').removeAttr('disabled');
    console.log('BestInfo MasterEquationArray', calculator.masterEquation);
    console.log('BestInfo operatorClickedArray:', calculator.operatorClicked);
    console.log('BestInfo numberClickedArray:' , calculator.numberClicked);
    console.log('best info equals clicked last:', calculator.equalsClickedLast);
  },
  decimalIsClicked: function(event){
    calculator.decimalHasBeenClicked = true;
    if (calculator.decimalHasBeenClicked === true){
      $(this).attr('disabled', 'disabled');
    }
  },
  percentSignIsClicked: function(){
    calculator.numberClicked.push(100);
    calculator.compute();
    calculator.percentClickedLast = true;
    console.log('percent last clicked', calculator.percentClickedLast);
  },
  clearIsClicked: function(event){
    if (calculator.randomColorFeatureInitiated === true){
      calculator.randomColorFeature();
      console.log('randomColorWorks!')
    }
    calculator.masterEquation = [];
    calculator.operatorClicked = [];
    calculator.numberClicked = [];
    calculator.decimalHasBeenClicked = false;
    calculator.operatorWasClickedLast = false;
    calculator.equalsClickedLast = false;
    calculator.numberToEvaluate = 0;
    $('.decimal').removeAttr('disabled');
    $('.number').removeAttr('disabled');
    $('.operator').removeAttr('disabled');
    $('.equals').removeAttr('disabled');
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
      case 'x': result = parseFloat(num1) * parseFloat(num2); break;
      case '/': result = parseFloat(num1) / parseFloat(num2); break;
      case 'percentSign': result = parseFloat(num1) / 100; calculator.numberClicked = []; break;
      default: $('h1').text(undefined)
    }
    console.log('final answer', calculator.masterEquation.splice(0, 2, result));
    $('h1').text(calculator.masterEquation);
    calculator.numberToEvaluate = result;
    console.log('numberToEvaluate: ', calculator.numberToEvaluate);
    console.log('to manipulate', result);
    if (result === undefined || NaN){
       $('h1').text('undefined');
       calculator.clearIsClicked();
    }
    if ($('h1').text().length >= 13){
      $('h1').css({'font-size' : '130%'});
   }else{
      $('h1').css({'font-size' : '200%'})
   }
  },
  randomColorFeature: function(){
    var nullValueArray = [0,0,0,0,0,0];
      function randomizer(array) {
        return array.map(function (i) {
        i = Math.floor(Math.random() * 9) + 1; 
        return i;
      });
    } 
    var randomValueArray = randomizer(nullValueArray);
    randomValueArray.unshift("#");
    randomHexValue = randomValueArray.join("");
    function invertColor(hexTripletColor) {
      var color = hexTripletColor;
      color = color.substring(1);           
      color = parseInt(color, 16);          
      color = 0xFFFFFF ^ color;             
      color = color.toString(16);           
      color = ("000000" + color).slice(-6); 
      color = "#" + color;                  
      return color;
    }
    var textColor = invertColor(randomHexValue);
    $('.normalBackground').css({"background-color" : randomHexValue });
    $('button, .display').css({'color' : textColor ,'background-color' : '#ffffff'});
    console.log('random color rocks');
  },
  personalizeColor: function(){
    function changeColor(){
      var r = $('#red').val();
      var g = $('#green').val();
      var b = $('#blue').val();
      $('.normalBackground').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ' )');
      $('.function').css('background-color', '#ffffff');
    }
    $("input[type=range]").on("input", changeColor);
  }
}
$(document).ready(calculator.init);