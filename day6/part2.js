const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(Number);

const days = 256;

let countsPerNumber = [];
for (let i = 0; i <= 8; i++) {
  countsPerNumber[i] = input.filter((n) => n === i).length;
}

for (let i = 0; i < days; i++) {
  const [zeroCounts, ...restCounts] = countsPerNumber;
  restCounts[6] += zeroCounts;
  restCounts[8] = zeroCounts;
  countsPerNumber = restCounts;
}

const result = countsPerNumber.reduce((acc, current) => acc + current, 0);

console.log('result', result);
