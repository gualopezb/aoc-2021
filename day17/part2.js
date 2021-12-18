const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let [x, y] = input.split('target area: ').map(s => s.trim()).filter((s) => s !== '')[0].split(',');

x = x.substring(2, x.length).split('..');
y = y.substring(3, y.length).split('..');

const targetX1 = Number(x[0]);
const targetX2 = Number(x[1]);
const targetY1 = Number(y[0]);
const targetY2 = Number(y[1]);

let possibleValuesCount = 0;

const isWithinTarget = (x, y, iteration, cx, cy) => {
  if (x > targetX2 || y < targetY1) {
    return;
  }
  let newX;
  if (x === 0) {
    newX = 0;
  } else {
    newX = x - iteration;
  }
  const newY = y - iteration;
  const newCX = cx + x;
  const newCY = cy + y;

  if (newCX >= targetX1 && newCX <= targetX2 && newCY <= targetY2 && newCY >= targetY1) {
    return true;
  } else {
    return isWithinTarget(newX, newY, iteration++, newCX, newCY);
  }
};

for (let i = 0; i <= targetX2; i++) {
  for (let j = targetY1; j <= Math.abs(targetY1); j++) {
    if (isWithinTarget(i, j, 1, 0, 0)) possibleValuesCount += 1;
  }
}

console.log('result', possibleValuesCount);
