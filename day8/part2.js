const fs = require('fs');
const _ = require('lodash');

const values = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map(line => line.split(' | '));

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
};

const mapping = {
  0: [0, 1, 2, 3, 4, 5],
  1: [1, 2],
  2: [0, 1, 3, 4, 6],
  3: [0, 1, 2, 3, 6],
  4: [1, 2, 5, 6],
  5: [0, 2, 3, 5, 6],
  6: [0, 2, 3, 4, 5, 6],
  7: [0, 1, 2],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 5, 6],
};

const sortString = (string) => {
  return string.split('').sort().join('');
};

let permutations = permutator(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

const tracker = [];
for (let i = 0; i < values.length; i++) {
  const [left, right] = values[i];
  const leftArray = left.split(' ');

  for (let p = 0; p < permutations.length; p++) {
    const configuration = permutations[p];

    let decodedMapping = {};
    for (let j = 0; j < leftArray.length; j++) {
      const segment = leftArray[j];
      let indexes = [];
      for (let k = 0; k < segment.length; k++) {
        const letter = segment[k];
        const index = configuration.findIndex(element => element === letter);
        indexes.push(index);
      }
      let numberString = '';
      const mappingKeys = Object.keys(mapping);
      for (let l = 0; l < mappingKeys.length; l++) {
        if (_.isEqual(mapping[mappingKeys[l]].sort(), indexes.sort())) {
          numberString += mappingKeys[l];
        }
      }
      decodedMapping[sortString(segment)] = Number(numberString);
    }
    if (_.uniq(Object.values(decodedMapping)).length !== 10) continue;

    let numberString = '';
    const rightArray = right.split(' ');
    for (let j = 0; j < rightArray.length; j++) {
      numberString += decodedMapping[sortString(rightArray[j])];
    }
    tracker.push(Number(numberString));
    continue;
  }
}

const result = tracker.reduce((acc, current) => acc + current, 0);

console.log('result', result);
