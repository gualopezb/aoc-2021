const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const createMatrix = (m, n, value) => Array.from({ length: m }, () => new Array(n).fill(value));

const matrix = input.map(line => line.split('').map(Number));

const buildFullMap = (tileMap) => {
  const mapNewValue = currentValue => currentValue + 1 <= 9 ? currentValue + 1 : 1;

  tileMap.forEach((line, index) => {
    let newLine = line;

    for (let i = 0; i < 4; i++) {
      let newBlock = line.map(mapNewValue);
      newLine = newLine.concat(newBlock)
      line = newBlock;
    }

    tileMap[index] = newLine;
  });

  const lengthBeforeVerticalExpansion = tileMap.length;
  for (let j = 0; j < 4; j++) {
    let newLines = tileMap.slice(j * lengthBeforeVerticalExpansion);

    newLines.forEach(line => {
      let newLine = line.map(mapNewValue);
      tileMap.push(newLine);
    });
  }

  return tileMap;
}

const newMatrix = buildFullMap(matrix);

const graph = new Map();

for (let i = 0; i < newMatrix.length; i++) {
  for (let j = 0; j < newMatrix[i].length; j++) {
    const up = i - 1;
    const down = i + 1;
    const left = j - 1;
    const right = j + 1;
    let connectionNodes = [];
    if (up >= 0) {
      connectionNodes.push({ i: up, j });
    }
    if (down < newMatrix.length) {
      connectionNodes.push({ i: down, j });
    }
    if (left >= 0) {
      connectionNodes.push({ i, j: left });
    }
    if (right < newMatrix[i].length) {
      connectionNodes.push({ i, j: right });
    }
    const key = `${i},${j}`;
    graph.set(key, connectionNodes);
  }
}

const setInitialDistances = (startNode) => {
  const distances = new Map();
  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[i].length; j++) {
      const key = `${i},${j}`;
      distances.set(key, Infinity);
    }
  }
  const [startLeft, startRight] = startNode.split(',');
  const key = `${startLeft},${startRight}`;
  distances.set(key, 0);
  return distances;
};

let distances = setInitialDistances('0,0');
let visitedNodes = {};

const graphKeys = [...graph.keys()];
const startNode = graphKeys[0];
const endNode = graphKeys[graphKeys.length - 1];

var startTime, endTime;

let isThereNextNode = true;
let currentNode = startNode;
while (isThereNextNode) {
  const [currentNodeLeft, currentNodeRight] = currentNode.split(',');
  const neighbors = graph.get(currentNode);
  const nonVisitedNeighbors = neighbors.filter(({ i, j }) => !visitedNodes[`${i},${j}`]);
  for (let i = 0; i < neighbors.length; i++) {
    const currentNeighbor = neighbors[i];
    const minDistance = distances.get(`${currentNodeLeft},${currentNodeRight}`) + newMatrix[currentNeighbor.i][currentNeighbor.j];
    if (minDistance < distances.get(`${currentNeighbor.i},${currentNeighbor.j}`)) {
      distances.set(`${currentNeighbor.i},${currentNeighbor.j}`, minDistance);
    }
  }

  visitedNodes[currentNode] = true;
  let nextNode;
  let distance = Infinity;

  distances.forEach((value, key) => {
    if (!visitedNodes[key] && value < distance) {
      nextNode = key;
      distance = distances[key];
    }
  });

  currentNode = nextNode;
  if (!nextNode) isThereNextNode = false;
}

const [endNodeLeft, endNodeRight] = endNode.split(',');
const result = distances.get(`${endNodeLeft},${endNodeRight}`);
console.log('result', result);
