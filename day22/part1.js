const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

let results = {};

const rebootSteps = input.map(line => {
  let [status, coordinates] = line.split(' ');
  coordinates = coordinates
    .split(',')
    .flatMap(coordinateAxis => coordinateAxis.substring(2, coordinateAxis.length).split('..').map(Number));
  const [x1, x2, y1, y2, z1, z2] = coordinates;
  return { x1, x2, y1, y2, z1, z2, status: status === 'on' };
});

const rebootCube = ({ x1, x2, y1, y2, z1, z2 }, status) => {
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      for (let k = z1; k <= z2; k++) {
        const key = `${i},${j},${k}`;
        results[key] = status;
      }
    }
  }
};

const filteredRebootSteps = rebootSteps
  .filter(({ x1, x2, y1, y2, z1, z2 }) => [x1, x2, y1, y2, z1, z2].every(value => value >= -50 && value <= 50));

for (let i = 0; i < filteredRebootSteps.length; i++) {
  const { x1, x2, y1, y2, z1, z2, status } = filteredRebootSteps[i];
  rebootCube({ x1, x2, y1, y2, z1, z2 }, status);
}

const result = Object.values(results).filter(Boolean).length;
console.log('result', result);
