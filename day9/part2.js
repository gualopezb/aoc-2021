const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map((s) => s.split('').map(Number));

const lowPointCoordinates = [];
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
    if (adjacentLocations.every(([a, b]) => number < input[a][b])) lowPointCoordinates.push([i, j]);
  }
}

let takeCoordinates = [];
const getBasinSize = (i, j) => {
  const up = i - 1;
  const down = i + 1;
  const right = j + 1;
  const left = j - 1;

  const number = input[i][j];

  let count = 0;

  if (up >= 0 && number < input[up][j] && input[up][j] !== 9 && !takeCoordinates.includes(`${up}${j}`)) {
    takeCoordinates.push(`${up}${j}`);
    count = (count + 1) + getBasinSize(up, j);
  }
  if (down < input.length && number < input[down][j] && input[down][j] !== 9 && !takeCoordinates.includes(`${down}${j}`)) {
    takeCoordinates.push(`${down}${j}`);
    count = (count + 1) + getBasinSize(down, j);
  }
  if (right < input[i].length && number < input[i][right] && input[i][right] !== 9 && !takeCoordinates.includes(`${i}${right}`)) {
    takeCoordinates.push(`${i}${right}`);
    count = (count + 1) + getBasinSize(i, right);
  }
  if (left >= 0 && number < input[i][left] && input[i][left] !== 9 && !takeCoordinates.includes(`${i}${left}`)) {
    takeCoordinates.push(`${i}${left}`);
    count = (count + 1) + getBasinSize(i, left);
  }

  takeCoordinates.push(`${i}${j}`);
  return count;
};

let basinSizes = [];
for (let i = 0; i < lowPointCoordinates.length; i++) {
  const [x, y] = lowPointCoordinates[i];
  const basinSize = getBasinSize(x, y);
  basinSizes.push(basinSize + 1);
}

const sortedBasinSizes = basinSizes.sort((a, b) => b - a);

const [b1, b2, b3] = sortedBasinSizes;
const result = b1 * b2 * b3;

console.log('result', result);
