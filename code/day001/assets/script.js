(function(){
  window.calculator = calculator();
  function calculator() {
    var expression = [];

    return {
      addElement: addElement,
      calculate: calculate,
      clear: clear
    };

    function addElement(element) {
      var previous;
      previous = typeof expression[expression.length - 1] === 'undefined';
      previous = previous ? '' : expression[expression.length - 1];

      // if previous element is empty or current and previous elements
      // are both operators, don't add the element
      if (isInt(previous) || isInt(element)) {
        expression.push(element);
        refreshDisplay();
      }
    }

    function calculate() {
      var processed = 0;
      // expression to string
      expression = expression.join('');

      var numbers = expression.match(/(?:[\d\.]+)+/g);
      var operators = expression.match(/[-\+\*\/]+/g);

      processed = parseInt(numbers.pop());
      while (numbers.length > 0) {
        var value = parseInt(numbers.pop());
        var operator = operators.pop();

        switch (operator) {
          case '+':
            processed += value;
            break;
          case '-':
            processed -= value;
            break;
          case '*':
            processed *= value;
            break;
          case '/':
            processed = value / processed;
            break;
          default:
            break;
        }
      }
      expression = [processed];
      refreshDisplay();
    }

    function refreshDisplay() {
      var display = document.getElementById('display');
      display.innerHTML = expression.join('');
    }

    function clear() {
      expression = [];
      refreshDisplay();
    }

    function isInt(n){
      return parseInt(n) % 1 === 0;
    }
  }
})();
