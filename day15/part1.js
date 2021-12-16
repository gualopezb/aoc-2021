// node --stack_size=10001 part1.js
const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const matrix = input.map(line => line.split('').map(Number));
const graph = new Map();

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    const up = i - 1;
    const down = i + 1;
    const left = j - 1;
    const right = j + 1;
    let connectionNodes = [];
    if (up >= 0) {
      connectionNodes.push({ i: up, j });
    }
    if (down < matrix.length) {
      connectionNodes.push({ i: down, j });
    }
    if (left >= 0) {
      connectionNodes.push({ i, j: left });
    }
    if (right < matrix[i].length) {
      connectionNodes.push({ i, j: right });
    }
    const key = `${i},${j}`;
    graph.set(key, connectionNodes);
  }
}

const setInitialDistances = (startNode) => {
  const m = matrix.length;
  const distances = Array.from({ length: m }, () => new Array(m).fill(Infinity));
  const [startLeft, startRight] = startNode.split(',');
  distances[startLeft][startRight] = 0;
  return distances;
};

let distances = setInitialDistances('0,0');
let visitedNodes = [];

const dijkstra = (source) => {
  const currentNode = source;
  const [currentNodeLeft, currentNodeRight] = source.split(',');
  const neighbors = graph.get(currentNode);
  const nonVisitedNeighbors = neighbors.filter(({ i, j }) => !visitedNodes.includes(`${i},${j}`));
  for (let i = 0; i < neighbors.length; i++) {
    const currentNeighbor = neighbors[i];
    const minDistance = distances[currentNodeLeft][currentNodeRight] + matrix[currentNeighbor.i][currentNeighbor.j];
    if (minDistance < distances[currentNeighbor.i][currentNeighbor.j]) {
      distances[currentNeighbor.i][currentNeighbor.j] = minDistance;
    }
  }
  visitedNodes.push(source);
  let nextNode;
  let distance = Infinity;
  for (let i = 0; i < distances.length; i++) {
    for (let j = 0; j < distances[i].length; j++) {
      const key = `${i},${j}`;
      if (!visitedNodes.includes(key) && distances[i][j] < distance) {
        nextNode = key;
        distance = distances[i][j];
      }
    }
  }
  if (nextNode) dijkstra(nextNode);
}

const graphKeys = [...graph.keys()];
const startNode = graphKeys[0];
const endNode = graphKeys[graphKeys.length - 1];

dijkstra(startNode);

const [endNodeLeft, endNodeRight] = endNode.split(',');
const result = distances[endNodeLeft][endNodeRight];
console.log('result', result);
