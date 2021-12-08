const fs = require('fs');

const known = [2, 4, 3, 7];

const outputValues = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map(line => line.split(' | ')[1])
  .join(' ')
  .split(' ');

const response = outputValues.filter(segment => known.includes(segment.length)).length;

console.log('response', response);
