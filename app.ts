
import minimax = require('./lib/minimax');
import tictac = require('./lib/tictac');

let tree = minimax.tree(tictac.Game);
console.log(tree);

/*

import gametree = require('./lib/gametree');
import GameState = require('./lib/gamestate');

let emptyState = new GameState([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

let before = (new Date().getTime());
let tree = new gametree.Node(1, emptyState);
let rootTree = tree;
let after = (new Date().getTime());
console.log('Took %dms to generate game tree', (after - before));
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
  tree = tree.moves[move].result;
  drawGame();
});

resetButton.addEventListener('click', (e) => {
  tree = rootTree;
  drawGame();
});

drawGame();

function stateToHTML(state: GameState, moveIdx?: number): string {
  let table = '<table>';
  if (moveIdx !== null) {
    table = '<table data-move="' + String(moveIdx) + '">';
  }
  return table + state.matrix.map(rowToHTML).join('\n') + '</table>';
}

function rowToHTML(row: number[]): string {
  return '  <tr>' + row.map(cellToHTHML).join('\n'); + '</tr>';
}

function cellToHTHML(cell: number): string {
  let letter = cell === 0 ? '' : (cell === 1 ? 'X' : 'O');
  return '    <td>' + letter + '</td>';
}

function drawGame() {
  currentState.innerHTML = stateToHTML(tree.gamestate);
  console.log('>>>>>>>>>>>>');
  stateChoices.innerHTML = tree.moves.map((move, idx) => {
    let outcomeDistances = move.result.outcomeDistance;
    let outcomeCounts = move.result.outcomeCounts;
    console.log('Move %d -- X moves: %d, O moves: %d, X wins: %d, O wins: %d',
      idx + 1,
      outcomeDistances[1],
      outcomeDistances[2],
      outcomeCounts[1],
      outcomeCounts[2]
    );
    return stateToHTML(move.result.gamestate, idx);
  }).join('\n');
  console.log('Optimal move is %d', tree.optimalMove + 1);
}

*/
