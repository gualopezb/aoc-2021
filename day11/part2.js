const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map((s) => s.split('').map(Number));

let totalFlashes = 0;

let takenCoordinates = [];
const checkFlashes = (i, j) => {
  const up = { a: i - 1, b: j };
  const down = { a: i + 1, b: j };
  const right = { a: i, b: j + 1 };
  const left = { a: i, b: j - 1 };
  const upRight = { a: i - 1, b: j + 1 };
  const upLeft = { a: i - 1, b: j - 1 };
  const downRight = { a: i + 1, b: j + 1 };
  const downLeft = { a: i + 1, b: j - 1 };

  const number = input[i][j];

  if (number > 9 && !takenCoordinates.includes(`${i},${j}`)) {
    totalFlashes += 1;
    takenCoordinates.push(`${i},${j}`);
    [up, down, right, left, upRight, upLeft, downRight, downLeft].map(({ a, b }) => {
      if (a >= 0 && a < input.length && b >= 0 && b < input[a].length) {
        input[a][b] += 1;
        checkFlashes(a, b);
      }
    });
  }
};

let result = 0;
let x = 0;
while (result === 0) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      input[i][j]++;
    }
  }
  takenCoordinates = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      checkFlashes(i, j);
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) input[i][j] = 0;
    }
  }

  let flashesCount = 0;
  for (let i1 = 0; i1 < input.length; i1++) {
    for (let j1 = 0; j1 < input[i1].length; j1++) {
      if (input[i1][j1] === 0) {
        flashesCount += 1;
      }
    }
  }
  if (flashesCount === (input.length * input[0].length)) {
    result = x + 1;
  } else {
    x += 1;
  }
}

console.log('result', result);
