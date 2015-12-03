import minimax = require('./lib/minimax');
import tictac = require('./lib/tictac');

let before = new Date().getTime();
let tree = minimax.tree(tictac.Game, -1);
let rootTree = tree;
let after = new Date().getTime();
console.log('Took %dms to generate minimax tree', (after - before));
console.log(tree);

let currentState = document.getElementById('currentState');
let stateChoices = document.getElementById('stateChoices');
let resetButton = document.getElementById('reset');

stateChoices.addEventListener('click', (e) => {
  let el = <HTMLElement>e.target;
  if (el.tagName === 'TABLE') {
    // that's what we want
  } else if (el.tagName === 'TBODY') {
    el = el.parentElement;
  } else if (el.tagName === 'TR') {
    el = el.parentElement.parentElement;
  } else if (el.tagName === 'TD') {
    el = el.parentElement.parentElement.parentElement;
  } else {
    // ignore clicks to the div itself
    return;
  }
  let move = Number(el.getAttribute('data-move'));
  tree = tree.moveOutcomes[move].outcome;
  drawGame();
});

resetButton.addEventListener('click', (e) => {
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

function rowToHTML(row: number[]): string {
  return '  <tr>' + row.map(cellToHTHML).join('\n'); + '</tr>';
}

function cellToHTHML(cell: number): string {
  let letter = cell === 0 ? '' : (cell === 1 ? 'X' : 'O');
  return '    <td>' + letter + '</td>';
}

function drawGame() {
  currentState.innerHTML = boardToHTML(tree.current.state);
  console.log('>>>>>>>>>>>>');
  var i = 1;
  if (!tree.moveOutcomes) {
    stateChoices.innerHTML = '';
    return;
  }
  stateChoices.innerHTML = tree.moveOutcomes.map((outcome, idx) => {
    console.log('%d: %d', i, outcome.outcome.miniMaxScore);
    i++;
    return boardToHTML(outcome.outcome.current.state, idx);
  }).join('\n');
}
