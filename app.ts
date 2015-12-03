import minimax = require('./lib/minimax');
import tictac = require('./lib/tictac');

let before = new Date().getTime();
let tree = minimax.tree(tictac.Game, -1);
let rootTree = tree;
let after = new Date().getTime();
console.log('Took %dms to generate minimax tree', (after - before));
console.log(tree);

document.getElementById('loader').innerHTML = '';

let board = document.getElementById('board');
let msgBox = document.getElementById('msgBox');
let resetButton = document.getElementById('reset');
resetButton.style.display = 'inline-block';

let gameOver = false;
let errorMsg = '';

board.addEventListener('click', (e) => {
  if (gameOver) return;
  let el = <HTMLElement>e.target;
  if (el.tagName !== 'TD') {
    return;
  }
  let x = Number(el.getAttribute('data-x'));
  let y = Number(el.getAttribute('data-y'));
  playMove({x: x, y: y}, 1);
});

resetButton.addEventListener('click', (e) => {
  gameOver = false;
  errorMsg = '';
  tree = rootTree;
  drawGame();
});

drawGame();

function boardToHTML(board: tictac.Board, moveIdx?: number): string {
  let table = '<table>';
  if (moveIdx !== null) {
    table = '<table data-move="' + String(moveIdx) + '">';
  }
  return table + board.map(rowToHTML).join('\n') + '</table>';
}

function rowToHTML(row: number[], x: number): string {
  return '  <tr>' + row.map((val, y) => cellToHTHML(val, x, y)).join('\n'); + '</tr>';
}

function cellToHTHML(cell: number, x: number, y: number): string {
  let letter = cell === 0 ? '' : (cell === 1 ? 'X' : 'O');
  return '    <td data-x="' + x + '" data-y="' + y + '">' + letter + '</td>';
}

function drawGame() {
  board.innerHTML = boardToHTML(tree.current.state);
  msgBox.innerHTML = '';
  if (gameOver) {
    msgBox.innerHTML += '<p>Game over!</p>';
  }
  if (errorMsg) {
    msgBox.innerHTML += '<p>' + errorMsg + '</p>';
  }
}

function moveEq(move1: tictac.Move, move2: tictac.Move): boolean {
  return move1.x === move2.x &&
         move1.y === move2.y;
}

function playMove(move: tictac.Move, player: number) {
  errorMsg = '';
  let chosenOutcome: minimax.MoveOutcome<tictac.Board, tictac.Move>;
  for (let outcome of tree.moveOutcomes) {
    if (moveEq(outcome.move, move)) {
      chosenOutcome = outcome;
      break;
    }
  }
  if (!chosenOutcome) {
    errorMsg = 'Invalid move!';
    drawGame();
    return;
  }
  tree = chosenOutcome.outcome;
  if (!tree.moveOutcomes) {
    gameOver = true;
  } else if (player === 1) {
    let maxScore = -Infinity;
    for (let outcome of tree.moveOutcomes) {
      if (outcome.outcome.miniMaxScores[2] > maxScore) {
        maxScore = outcome.outcome.miniMaxScores[2];
        chosenOutcome = outcome;
      }
    }
    playMove(chosenOutcome.move, 2);
  }
  drawGame();
}
