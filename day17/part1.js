const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let [x, y] = input.split('target area: ').map(s => s.trim()).filter((s) => s !== '')[0].split(',');

y = y.substring(3, y.length).split('..');

const targetY1 = Number(y[0]);
const absY = Math.abs(targetY1);
const result = (absY * (absY - 1)) / 2;
console.log('result', result);
