const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(Number);

const days = 80;
let state = input;

for (let i = 0; i < days; i++) {
  const stateLength = state.length;
  for (let j = 0; j < stateLength; j++) {
    if (state[j] === 0) {
      state[j] = 6;
      state[state.length] = 8;
    } else {
      state[j] -= 1;
    }
  }
}

const result = state.length;

console.log('result', result);
