const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(s => s !== '');

let currentHorizontal = 0;
let currentDepth = 0;

const calculate = () => {
  input.forEach(row => {
    const [command, value] = row.split(' ');
    const parsedValue = Number(value);

    switch (command) {
      case 'forward':
        currentHorizontal = currentHorizontal + parsedValue;
        break;

      case 'down':
        currentDepth = currentDepth + parsedValue;
        break;

      case 'up':
        currentDepth = currentDepth - parsedValue;
        break;

      default:
        break;
    }
  });

  return currentHorizontal * currentDepth;
};

const result = calculate();
console.log('result', result);
