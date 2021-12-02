const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(s => s !== '');

let currentHorizontal = 0;
let currentDepth = 0;
let currentAim = 0;

const calculate = () => {
  input.forEach(row => {
    const [command, value] = row.split(' ');
    const parsedValue = Number(value);

    switch (command) {
      case 'forward':
        currentHorizontal = currentHorizontal + parsedValue;
        currentDepth = currentDepth + (currentAim * parsedValue);
        break;

      case 'down':
        currentAim = currentAim + parsedValue;
        break;

      case 'up':
        currentAim = currentAim - parsedValue;
        break;

      default:
        break;
    }
  });

  return currentHorizontal * currentDepth;
};

const result = calculate();
console.log('result', result);
