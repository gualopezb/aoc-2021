const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const [polymerTemplate, ...pairInsertionRules] = input;

const pairInsertionRulesMap = new Map();
for (let i = 0; i < pairInsertionRules.length; i++) {
  const [key, value] = pairInsertionRules[i].trim().split('->');
  pairInsertionRulesMap.set(key.trim(), value.trim());
}

let pairInsertionRulesMapCounts = new Map();
for (let i = 0; i < polymerTemplate.length - 1; i++) {
  const left = polymerTemplate[i];
  const right = polymerTemplate[i + 1];
  const pair = `${left}${right}`;
  pairInsertionRulesMapCounts.set(pair, (pairInsertionRulesMapCounts.get(pair) || 0) + 1);
}

for (let i = 0; i < 40; i++) {
  let updatedPairsCount = new Map();
  const keys = [...pairInsertionRulesMapCounts.keys()];
  for (let j = 0; j < keys.length; j++) {
    const [left, right] = keys[j];
    const key = `${left}${right}`;
    const currentCount = pairInsertionRulesMapCounts.get(key);
    const letter = pairInsertionRulesMap.get(key);
    const increasingKey1 = `${left}${letter}`;
    const increasingKey2 = `${letter}${right}`;
    updatedPairsCount.set(increasingKey1, currentCount + (updatedPairsCount.get(increasingKey1) || 0));
    updatedPairsCount.set(increasingKey2, currentCount + (updatedPairsCount.get(increasingKey2) || 0));
  }
  pairInsertionRulesMapCounts = updatedPairsCount;
}

const countsByLetter = {};
for (let [pair, occurrences] of pairInsertionRulesMapCounts) {
  let left = pair[0];
  let right = pair[1];

  countsByLetter[left] = (countsByLetter[left] || 0) + occurrences;
  countsByLetter[right] = (countsByLetter[right] || 0) + occurrences;
}

const mostLeftLetter = polymerTemplate[0];
const mostRightLetter = polymerTemplate[polymerTemplate.length - 1];
countsByLetter[mostLeftLetter] = countsByLetter[mostLeftLetter] + 1;
countsByLetter[mostRightLetter] = countsByLetter[mostRightLetter] + 1;

const sortedValues = Object.entries(countsByLetter)
  .map(([letter, total]) => total / 2)
  .sort((a, b) => a - b);

const [leastCommon] = sortedValues;
const mostCommon = sortedValues[sortedValues.length - 1];
const result = mostCommon - leastCommon;

console.log('result', result);
