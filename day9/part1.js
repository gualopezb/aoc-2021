const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map((s) => s.split('').map(Number));

const lowPoints = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const up = i - 1;
    const down = i + 1;
    const right = j + 1;
    const left = j - 1;
    const number = input[i][j];
    let adjacentLocations = [];
    if (up >= 0 && up < input.length) adjacentLocations.push([up, j]);
    if (down >= 0 && down < input.length) adjacentLocations.push([down, j]);
    if (right < input[i].length) adjacentLocations.push([i, right]);
    if (left >= 0) adjacentLocations.push([i, left]);
    if (adjacentLocations.every(([a, b]) => number < input[a][b])) lowPoints.push(number);
  }
}

const result = lowPoints.map(n => n + 1).reduce((a, b) => a + b, 0)

console.log('result', result);
