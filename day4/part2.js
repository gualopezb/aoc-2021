const fs = require('fs');
const _ = require('lodash');

const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter((s) => s !== '');

const [numbersString, ...boardsStrings] = input;

const hasCompletedAnyRow = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === null && board[i][1] === null && board[i][2] === null && board[i][3] === null && board[i][4] === null) {
      return true;
    }
  }
  return false;
};

const hasCompletedAnyColumn = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board[0][i] === null && board[1][i] === null && board[2][i] === null && board[3][i] === null && board[4][i] === null) {
      return true;
    }
  }
  return false;
};

const isBoardWinner = (board) => hasCompletedAnyRow(board) || hasCompletedAnyColumn(board);

const numbers = numbersString.split(',').map(Number);
const boards = _.chunk(boardsStrings, 5).map(b => b.map(b2 => b2.split(' ').filter(Boolean).map(Number)));

const getWinnerBoardAndWinnerNumber = () => {
  const winningBoards = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const didAlreadyWin = isBoardWinner(boards[j]);
      if (didAlreadyWin) continue;
      const currentBoard = boards[j];
      for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
          if (numbers[i] === currentBoard[a][b]) boards[j][a][b] = null;
        }
      }
      if (isBoardWinner(boards[j])) {
        winningBoards.push(boards[j]);
        const isLastToWin = winningBoards.length === boards.length;
        if (isLastToWin) {
          return {
            board: boards[j],
            number: numbers[i],
          };
        }
      }
    }
  }
}

const { board, number } = getWinnerBoardAndWinnerNumber();
const result = board.flat().filter(Boolean).reduce((a, b) => a + b, 0) * number;
console.log('result', result);
