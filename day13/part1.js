const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const dotsList = input
  .filter((s) => s[0] !== 'f')
  .map((s) => s.split(',').map(Number));

const foldInstructions = input
  .filter((s) => s[0] === 'f');

const ySize = Math.max(...dotsList.map(([x, y]) => x)) + 1;
const xSize = Math.max(...dotsList.map(([x, y]) => y)) + 1;

function createMatrix(m, n) {
  return Array.from({ length: m }, () => new Array(n).fill('.'));
};

const matrix = createMatrix(xSize, ySize);

for (let i = 0; i < dotsList.length; i++) {
  const [x, y] = dotsList[i];
  matrix[y][x] = '#';
}

const mergeDots = (d1, d2) => d1 === '#' || d2 === '#' ? '#' : '.';

const [firstFold] = foldInstructions;
const [left, right] = firstFold.split('=');
const axis = left[left.length - 1]
let number = Number(right);

let newMatrix = [];
if (axis === 'x') {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][number] = '|';
  }

  const right = (ySize - number) - 1;
  const left = ySize - right - 1;

  const newYSize = right > left ? right : left;

  newMatrix = createMatrix(xSize, newYSize);

  for (let a = 0; a < newMatrix.length; a++) {
    let offset = 2;
    for (let b = newMatrix[0].length - 1; b >= 0; b--) {
      const d1 = matrix[a][b];
      const d2 = matrix[a][b + offset];
      newMatrix[a][b] = mergeDots(d1, d2);
      offset += 2;
    }
  }
}

if (axis === 'y') {
  for (let i = 0; i < matrix[0].length; i++) {
    matrix[number][i] = '-';
  }
}

let result = 0;
for (let i = 0; i < newMatrix.length; i++) {
  for (let j = 0; j < newMatrix[0].length; j++) {
    if (newMatrix[i][j] === '#') result++;
  }
}

console.log('result', result);
