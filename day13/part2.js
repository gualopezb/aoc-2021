const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const print2DMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      process.stdout.write(matrix[i][j].toString());
    }

    process.stdout.write('\n');
  }
};

function createMatrix(m, n) {
  return Array.from({ length: m }, () => new Array(n).fill('.'));
};

const dotsList = input
  .filter((s) => s[0] !== 'f')
  .map((s) => s.split(',').map(Number));

const initialYSize = Math.max(...dotsList.map(([x, y]) => y)) + 1;
const initialXSize = Math.max(...dotsList.map(([x, y]) => x)) + 1;

let matrix = createMatrix(initialYSize, initialXSize);

for (let i = 0; i < dotsList.length; i++) {
  const [y, x] = dotsList[i];
  matrix[x][y] = '#';
}

const mergeDots = (d1, d2) => d1 === '#' || d2 === '#' ? '#' : '.';

const foldInstructions = input.filter((s) => s[0] === 'f');

for (let x = 0; x < foldInstructions.length; x++) {
  const xSize = matrix.length;
  const ySize = matrix[0].length;

  const currentFold = foldInstructions[x];
  const [left, right] = currentFold.split('=');
  const axis = left[left.length - 1]
  let number = Number(right);

  if (axis === 'x') {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][number] = '|';
    }
    const newMatrix = createMatrix(xSize, number);

    for (let a = 0; a < xSize; a++) {
      let offset = 2;
      for (let b = number - 1; b >= 0; b--) {
        if (b + offset < ySize) {
          const d1 = matrix[a][b];
          const d2 = matrix[a][b + offset];
          newMatrix[a][b] = mergeDots(d1, d2);
        } else {
          newMatrix[a][b] = matrix[a][b];
        }
        offset += 2;
      }
    }
    matrix = newMatrix;
  } else if (axis === 'y') {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[number][i] = '-';
    }

    const newMatrix = createMatrix(number, ySize);

    let offset = 2;
    for (let a = number - 1; a >= 0; a--) {
      for (let b = 0; b < ySize; b++) {
        if (a + offset < xSize) {
          const d1 = matrix[a][b];
          const d2 = matrix[a + offset][b];
          newMatrix[a][b] = mergeDots(d1, d2);
        } else {
          newMatrix[a][b] = matrix[a][b];
        }
      }
      offset += 2;
    }
    matrix = newMatrix;
  }
}

print2DMatrix(matrix);
