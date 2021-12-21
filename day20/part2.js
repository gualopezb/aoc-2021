const fs = require('fs');

const createMatrix = (m, n, defaultValue) => Array.from({ length: m }, () => new Array(n).fill(defaultValue));

const binaryToDecimal = (binary) => parseInt(binary, 2);

let [algorithm, ...inputImage] = fs.readFileSync('input.txt', 'utf8').split('\n').filter((s) => s !== '');
let inputMatrix = inputImage.map(row => row.split(''));
let outputMatrix;
let defaultPixel = ".";

const iterations = 50;

for (let x = 0; x < iterations; x++) {
  const rowsLength = inputMatrix.length;
  const colsLength = inputMatrix[0].length;

  const expandedInputMatrix = createMatrix(rowsLength + 2, colsLength + 2, defaultPixel);
  outputMatrix = createMatrix(rowsLength + 2, colsLength + 2, defaultPixel);

  for (let i = 1; i < expandedInputMatrix.length - 1; i++) {
    for (let j = 1; j < expandedInputMatrix[0].length - 1; j++) {
      expandedInputMatrix[i][j] = inputMatrix[i - 1][j - 1];
    }
  }

  for (let i = 0; i < expandedInputMatrix.length; i++) {
    for (let j = 0; j < expandedInputMatrix[0].length; j++) {
      const upLeft = (expandedInputMatrix[i - 1] && expandedInputMatrix[i - 1][j - 1]) || defaultPixel;
      const upCenter = (expandedInputMatrix[i - 1] && expandedInputMatrix[i - 1][j]) || defaultPixel;
      const upRight = (expandedInputMatrix[i - 1] && expandedInputMatrix[i - 1][j + 1]) || defaultPixel;
      const left = (expandedInputMatrix[i] && expandedInputMatrix[i][j - 1]) || defaultPixel;
      const self = expandedInputMatrix[i][j];
      const right = (expandedInputMatrix[i] && expandedInputMatrix[i][j + 1]) || defaultPixel;
      const downLeft = (expandedInputMatrix[i + 1] && expandedInputMatrix[i + 1][j - 1]) || defaultPixel;
      const downCenter = (expandedInputMatrix[i + 1] && expandedInputMatrix[i + 1][j]) || defaultPixel;
      const downRight = (expandedInputMatrix[i + 1] && expandedInputMatrix[i + 1][j + 1]) || defaultPixel;
      const combinedPixels = `${upLeft}${upCenter}${upRight}${left}${self}${right}${downLeft}${downCenter}${downRight}`;
      const binary = combinedPixels.replaceAll('.', '0').replaceAll('#', '1');
      const index = binaryToDecimal(binary);
      const outputPixel = algorithm[index];
      outputMatrix[i][j] = outputPixel;
    }
  }

  inputMatrix = outputMatrix;
  const allDotsTurnHashes = algorithm[0] === "#";
  const allHashesTurnDot = algorithm[algorithm.length - 1] === ".";

  if (defaultPixel === "." && allDotsTurnHashes) {
    defaultPixel = "#";
  } else if (defaultPixel === "#" && allHashesTurnDot) {
    defaultPixel = ".";
  }
}

let result = 0;
for (let i = 0; i < outputMatrix.length; i++) {
  for (let j = 0; j < outputMatrix[0].length; j++) {
    if (outputMatrix[i][j] === '#') result++;
  }
}

console.log('result', result);
