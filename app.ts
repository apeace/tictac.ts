import gametree = require('./lib/gametree');
import GameState = require('./lib/gamestate');

let emptyState = new GameState([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]);

let before = (new Date().getTime());
let tree = new gametree.Node(1, emptyState);
let after = (new Date().getTime());

console.log('%dms', (after - before));
console.log(tree);

let table = document.getElementById('table');
table.addEventListener('click', (e: MouseEvent) => {
  let el = <HTMLElement>e.target;
  // parse the id "cell3" into the number 3
  let id = parseInt(el.id.substring(4));
  el.innerHTML = String(id);
});