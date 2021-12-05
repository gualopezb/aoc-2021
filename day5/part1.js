const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(s => s !== '');

const hydrothermalVents = input.map(line => {
  const [xString, yString] = line.split('->');
  const [x1, y1] = xString
    .trim()
    .split(',')
    .map(Number);
  const [x2, y2] = yString
    .trim()
    .split(',')
    .map(Number);
  return { x1, y1, x2, y2 };
});

const horizontalAndVerticalLines = hydrothermalVents.filter(
  ({ x1, y1, x2, y2 }) => x1 === x2 || y1 === y2
);

const maxValue = Math.max(
  ...horizontalAndVerticalLines.flatMap(({ x1, y1, x2, y2 }) => [
    x1,
    y1,
    x2,
    y2,
  ])
);

const diagram = new Array(maxValue + 1)
  .fill(0)
  .map(() => new Array(maxValue + 1).fill(0));

for (let i = 0; i < horizontalAndVerticalLines.length; i += 1) {
  const { x1, y1, x2, y2 } = horizontalAndVerticalLines[i];
  if (x1 === x2) {
    const [from, to] = [Math.min(y1, y2), Math.max(y1, y2)];
    for (let j = from; j <= to; j += 1) {
      diagram[j][x1] += 1;
    }
  }

  if (y1 === y2) {
    const [from, to] = [Math.min(x1, x2), Math.max(x1, x2)];
    for (let j = from; j <= to; j += 1) {
      diagram[y1][j] += 1;
    }
  }
}

const result = diagram.flat().filter(n => n >= 2).length;

console.log('result', result);
