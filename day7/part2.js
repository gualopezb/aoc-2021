const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(Number);

const fuelByPosition = {};
const getFuel = (position) => {
  if (fuelByPosition[position]) return fuelByPosition[position];
  if (position === 0 || position === 1) return position;
  const totalFuel = position + getFuel(position - 1);
  fuelByPosition[position] = totalFuel;
  return totalFuel;
};

const fuelValues = [];
for (let i = 0; i <= Math.max(...input); i++) {
  let totalFuel = 0;
  for (let j = 0; j < input.length; j++) {
    totalFuel += getFuel(Math.abs(i - input[j]));
  }
  fuelValues.push(totalFuel);
}

const sortedFuelValues = fuelValues.sort((a, b) => a - b);
console.log('response', sortedFuelValues[0]);
