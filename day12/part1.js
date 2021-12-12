const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '')
  .map((s) => s.split('-'));

const vertices = Array.from(new Set(input.flat()));

const adjacencyList = vertices.reduce((acc, current) => {
  if (current === 'end') {
    acc[current] = [];
  } else {
    acc[current] = input
      .filter(([from, to]) => (from === current || to === current))
      .map(([from, to]) => from === current ? to : from)
      .filter((end) => end !== 'start');
  }
  return acc;
}, {});

let paths = [];
const markEdges = (vertex, visited = ['start']) => {
  if (vertex === 'end') {
    paths.push(visited);
    return;
  }

  const nodes = adjacencyList[vertex];
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
    const isUpperCase = element === element.toUpperCase();
    const limit = isUpperCase ? Infinity : 1;
    if (visited.filter((p) => p === element).length >= limit) {
      continue;
    } else {
      markEdges(element, visited.concat(element));
    }
  }
}

markEdges('start');

console.log('result', paths.length);
