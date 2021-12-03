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
  return count1 >= count0 ? '1' : '0';
};

const findLeastCommonBit = (data, i) => {
  let count0 = 0;
  let count1 = 0;

  data.forEach(binary => {
    binary[i] === '0' ? count0++ : count1++;
  });
  return count0 <= count1 ? '0' : '1';
};

let oxygenGeneratorCollection = [...input];
let binaryOxygenGeneratorRating;
for (let i = 0; i < binaryLength; i++) {
  const mostCommonBit = findMostCommonBit(oxygenGeneratorCollection, i);
  oxygenGeneratorCollection = oxygenGeneratorCollection.filter(binary => binary[i] === mostCommonBit);
  if (oxygenGeneratorCollection.length === 1) {
    binaryOxygenGeneratorRating = oxygenGeneratorCollection[0];
    break;
  }
}

let co2ScrubberCollection = [...input];
let binaryCo2ScrubberRating;
for (let i = 0; i < binaryLength; i++) {
  const leastCommon = findLeastCommonBit(co2ScrubberCollection, i);
  co2ScrubberCollection = co2ScrubberCollection.filter(binary => binary[i] === leastCommon);
  if (co2ScrubberCollection.length === 1) {
    binaryCo2ScrubberRating = co2ScrubberCollection[0];
    break;
  }
}

const decimalOxygenGeneratorRating = parseInt(binaryOxygenGeneratorRating, 2);
const decimalCo2ScrubberRating = parseInt(binaryCo2ScrubberRating, 2);

const result = decimalOxygenGeneratorRating * decimalCo2ScrubberRating;
console.log('result', result);
