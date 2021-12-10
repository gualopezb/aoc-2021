const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const mapping = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const openingSymbols = Object.keys(mapping);
const closingSymbols = Object.values(mapping);

let illegalSymbols = [];

let opening = [];
let closing = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const element = input[i][j];
    if (openingSymbols.includes(element)) {
      opening.push(element);
    }
    else {
      const lastOpening = opening.pop();
      if (mapping[lastOpening] !== element) {
        illegalSymbols.push(element);
        continue;
      }
    }
  }
}

const scoreMapping = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let result = 0;
for (let i = 0; i < illegalSymbols.length; i++) {
  result += scoreMapping[illegalSymbols[i]];
}

console.log('result', result);
