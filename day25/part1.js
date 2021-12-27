const fs = require('fs');

const input = fs
  .readFileSync('input2.txt', 'utf8')
  .split('\n')
  .map((s) => s.split(''))
  .filter(a => a.length);

let currentStep = 0;
let didStop = false;

while (!didStop) {
  let occupiedDestinations = [];
  let currentMoves = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const jDestination = j === (input[i].length - 1) ? 0 : j + 1;
      if (
        input[i][j] === '>'
        && !occupiedDestinations.includes(`${i},${j}`)
        && !occupiedDestinations.includes(`${i},${jDestination}`)
        && input[i][jDestination] === '.'
      ) {
        input[i][j] = '.';
        input[i][jDestination] = '>';
        occupiedDestinations.push(`${i},${j}`);
        occupiedDestinations.push(`${i},${jDestination}`);
      }
    }
  }
  currentMoves += occupiedDestinations.length;
  occupiedDestinations = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const iDestination = i === (input.length - 1) ? 0 : i + 1;
      if (
        input[i][j] === 'v'
        && !occupiedDestinations.includes(`${i},${j}`)
        && !occupiedDestinations.includes(`${iDestination},${j}`)
        && input[iDestination][j] === '.'
      ) {
        input[i][j] = '.';
        input[iDestination][j] = 'v';
        occupiedDestinations.push(`${i},${j}`);
        occupiedDestinations.push(`${iDestination},${j}`);
      }
    }
  }

  currentMoves += occupiedDestinations.length;
  currentStep++;

  if (currentMoves === 0) {
    didStop = true;
  }
}

console.log('result', currentStep);
