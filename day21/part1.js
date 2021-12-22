const fs = require('fs');

const [player1String, player2String] = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

let [player1CurrentPosition, player2CurrentPosition] = [player1String, player2String].map(s => Number(s.split(': ')[1]));

let player1 = {
  currentPosition: player1CurrentPosition,
  score: 0,
};
let player2 = {
  currentPosition: player2CurrentPosition,
  score: 0,
};

const getNextScorePosition = ({ currentPosition, totalMoves }) =>
  currentPosition + totalMoves <= 10 ? currentPosition + totalMoves : ((currentPosition + totalMoves) % 10) || 10;

let dieRollsCounter = 0;
let currentDieValue = 1;
const rollDie = () => {
  const a = currentDieValue;
  const b = a + 1 <= 100 ? a + 1 : 1;
  const c = b + 1 <= 100 ? b + 1 : 1;
  currentDieValue = c + 1 <= 100 ? c + 1 : 1;
  dieRollsCounter += 3;
  return [a, b, c];
};

let winner;
while (typeof winner === 'undefined') {
  const totalMovesPlayer1 = rollDie().reduce((a, b) => a + b, 0);
  const nextScorePositionPlayer1 = getNextScorePosition({
    currentPosition: player1.currentPosition,
    totalMoves: totalMovesPlayer1,
  });
  player1.currentPosition = nextScorePositionPlayer1;
  player1.score += nextScorePositionPlayer1;
  if (player1.score >= 1000) {
    winner = player1;
    continue;
  }

  const totalMovesPlayer2 = rollDie().reduce((a, b) => a + b, 0);
  const nextScorePositionPlayer2 = getNextScorePosition({
    currentPosition: player2.currentPosition,
    totalMoves: totalMovesPlayer2,
  });
  player2.currentPosition = nextScorePositionPlayer2;
  player2.score += nextScorePositionPlayer2;
  if (player2.score >= 1000) winner = player2;
}

const looser = player1 === winner ? player2 : player1;
const result = looser.score * dieRollsCounter;
console.log('result', result);
