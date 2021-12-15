const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const [polymerTemplate, ...pairInsertionRules] = input

const pairInsertionRulesMap = new Map();
for (let i = 0; i < pairInsertionRules.length; i++) {
  const [key, value] = pairInsertionRules[i].trim().split('->');
  pairInsertionRulesMap.set(key.trim(), value.trim());
}

const calculate = (template, iteration, stopIteration) => {
  if (iteration === stopIteration) return template;

  let newTemplate = '';
  for (let i = 0; i < template.length; i++) {
    const left = template[i];
    const right = template[i + 1];
    const middle = pairInsertionRulesMap.get(`${left}${right}`) || '';
    newTemplate += `${left}${middle}`;
  }
  return calculate(newTemplate, iteration + 1, stopIteration);
};

const newTemplate = calculate(polymerTemplate, 0, 10);
const newTemplateSplitted = newTemplate.split('');
const possibleValues = [...new Set(pairInsertionRulesMap.values())];

let values = [];
for (let i = 0; i < possibleValues.length; i++) {
  const letter = possibleValues[i];
  const letterTotal = newTemplateSplitted.filter(l => l === letter).length;
  values.push(letterTotal);
}

const sortedValues = values.sort((a, b) => a - b);
const [leastCommon] = sortedValues;
const mostCommon = sortedValues[sortedValues.length - 1];
const result = mostCommon - leastCommon;

console.log('result', result);
