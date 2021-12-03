const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const binaryLength = 12;

const findMostCommonBit = (data, i) => {
  let count0 = 0;
  let count1 = 0;

  data.forEach(binary => {
    binary[i] === '0' ? count0++ : count1++;
  });
  return count0 > count1 ? '0' : '1';
};

const findLeastCommonBit = (data, i) => {
  let count0 = 0;
  let count1 = 0;

  data.forEach(binary => {
    binary[i] === '0' ? count0++ : count1++;
  });
  return count0 < count1 ? '0' : '1';
};

let binaryGamma = '';
for (let i = 0; i < binaryLength; i++) {
  const bitGamma = findMostCommonBit(input, i);
  binaryGamma = `${binaryGamma}${bitGamma}`;
}

let binaryEpsilon = '';
for (let i = 0; i < binaryLength; i++) {
  const bitEpsilon = findLeastCommonBit(input, i);
  binaryEpsilon = `${binaryEpsilon}${bitEpsilon}`;
}

const decimalGamma = parseInt(binaryGamma, 2);
const decimalEpsilon = parseInt(binaryEpsilon, 2);

const result = decimalGamma * decimalEpsilon;
console.log('result', result);
