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
      var prev = expression.length > 0 ? expression[expression.length - 1] : '';

      // if previous element is empty or current and previous elements
      // are both operators, don't add the element
      if (isInt(prev) || isInt(element) || (element == '-' && prev != '-')) {
        expression.push(element);
        refreshDisplay();
      }
    }

    function calculate() {
      var processed = [];
      expression.unshift(0); // workaround
      // expression to string
      expression = expression.join('');

      var numbers = expression.match(/(?:[\d\.]+)+/g);
      var operators = expression.match(/[-\+\*\/]+/g);

      processed.push(parseInt(numbers.shift()));
      while (numbers.length > 0) {
        var value = parseInt(numbers.shift());
        var operator = operators.shift();

        switch (operator) {
          case '+':
            processed.push(value);
            break;
          case '-':
            processed.push(value * -1);
            break;
          case '*':
            processed.push(processed.pop() * value);
            break;
          case '/':
            processed.push(processed.pop() / value);
            break;
          default:
            break;
        }
      }
      expression = processed.reduce((res, el) => res + el);
      expression = [expression];
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
