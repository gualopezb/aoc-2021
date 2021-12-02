const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(Number);

const increasedMeasurements = input.reduce((acc, current, index) => {
  if (index === 0) return acc;
  if (current > input[index - 1]) return acc + 1;
  return acc;
}, 0);

console.log('increasedMeasurements', increasedMeasurements);
