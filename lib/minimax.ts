export interface Game<T, M> {
  players: number[];
  initialState: GameState<T>;
  isOver(state: T): boolean;
  score(state: T, player: number): number;
  moves(state: T): M[]
  makeMove(state: GameState<T>, move: M): GameState<T>
}

export interface GameState<T> {
  state: T;
  playerTurn: number;
}


export class AI<T, M> {

  constructor(private game: Game<T, M>) {
  }

}


export interface GameTree<T, M> {
  current: GameState<T>;
  miniMaxScores?: {[player: number]: number};
  moveOutcomes?: MoveOutcome<T, M>[];
}

export interface MoveOutcome<T, M> {
  move: M;
  outcome: GameTree<T, M>;
}

// helper for creating a GameTree from a Game, and
// computing the tree to a given lookAhead
export function tree<T, M> (game: Game<T, M>, lookAhead=0): GameTree<T, M> {
  let tree = {
    current: game.initialState
  };
  return computeTree(game, tree, lookAhead);
}

// compute the tree to the given lookAhead
export function computeTree<T, M> (game: Game<T, M>, tree: GameTree<T, M>, lookAhead=0): GameTree<T, M> {
  let current = tree.current;

  if (game.isOver(current.state) || lookAhead === 0) {
    tree.miniMaxScores = {};
    for (let player of game.players) {
      tree.miniMaxScores[player] = game.score(current.state, player);
    }
    return tree;
  }

  let moves = game.moves(current.state);
  let outcomes = moves.map((move) => {
    let outcomeState = game.makeMove(current, move);
    let outcomeTree = computeTree(game, {current: outcomeState}, lookAhead-1);
    return {move: move, outcome: outcomeTree};
  });
  tree.moveOutcomes = outcomes;

  tree.miniMaxScores = {};
  for (var player of game.players) {
    let childScores = outcomes.map((outcome) => {
      return outcome.outcome.miniMaxScores[player];
    });
    if (current.playerTurn === player) {
      tree.miniMaxScores[player] = Math.max.apply({}, childScores);
    } else {
      tree.miniMaxScores[player] = Math.min.apply({}, childScores);
    }
  }

  return tree;
}
