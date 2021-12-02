const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(Number);

let increasedMeasurements = 0;

for (let index = 0; index < input.length; index++) {
  if (index + 3 < input.length) {
    const prev = input[index] + input[index + 1] + input[index + 2];
    const next = input[index + 1] + input[index + 2] + input[index + 3];
    if (next > prev) increasedMeasurements++;
  }
}

console.log('increasedMeasurements', increasedMeasurements);
