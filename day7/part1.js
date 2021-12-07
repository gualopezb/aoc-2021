const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(Number);

const fuelByPosition = [];
for (let i = 0; i <= Math.max(...input); i++) {
  let totalFuel = 0;
  for (let j = 0; j < input.length; j++) {
    totalFuel += Math.abs(i - input[j]);
  }
  fuelByPosition.push(totalFuel);
}

const sortedFuelByPosition = fuelByPosition.sort((a, b) => a - b);
console.log('response', sortedFuelByPosition[0]);
