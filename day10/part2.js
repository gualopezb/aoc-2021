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

let corruptedLines = [];
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
        corruptedLines.push(input[i]);
        continue;
      }
    }
  }
}

const incompleteLines = input.filter(line => !corruptedLines.includes(line));

let completionStrings = [];
for (let i = 0; i < incompleteLines.length; i++) {
  let openingTracker = [];
  for (let j = 0; j < incompleteLines[i].length; j++) {
    const element = incompleteLines[i][j];
    if (openingSymbols.includes(element)) {
      openingTracker.push(element);
    }
    else {
      openingTracker.pop();
    }
  }
  const completionString = openingTracker.reverse().map(value => mapping[value]).join('');
  completionStrings.push(completionString);
}

const completionTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

let totalScores = [];
for (let i = 0; i < completionStrings.length; i++) {
  let totalScore = 0;
  for (let j = 0; j < completionStrings[i].length; j++) {
    totalScore *= 5;
    totalScore += completionTable[completionStrings[i][j]];
  }
  totalScores.push(totalScore);
}

const sortedValues = totalScores.sort((a, b) => a - b);
const result = sortedValues[(sortedValues.length - 1) / 2];

console.log('result', result);
