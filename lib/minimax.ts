
export interface GameState<T> {
  state: T;
  playerTurn: number;
}

export interface GameResult {
  isTerminal: boolean;
  score: number;
}

export interface Game<T, M> {
  initial: GameState<T>;
  score(state: T, player: number): GameResult;
  moves(state: T): M[]
  makeMove(state: GameState<T>, move: M): GameState<T>
}


export interface MoveOutcome<T, M> {
  move: M;
  outcome: GameTree<T, M>;
}

export interface GameTree<T, M> {
  current: GameState<T>;
  miniMaxScore?: number;
  moveOutcomes?: MoveOutcome<T, M>[];
}


// helper for creating a GameTree from a Game, and
// computing the tree to a given depth
export function tree<T, M> (game: Game<T, M>, depth=0): GameTree<T, M> {
  let tree = {
    current: game.initial
  };
  return computeTree(game, tree, depth);
}

// compute the tree to the given depth
export function computeTree<T, M> (game: Game<T, M>, tree: GameTree<T, M>, depth=0): GameTree<T, M> {
  let current = tree.current;
  // TODO hard-coded: we always try to maximize the first player
  let maximizePlayer = game.initial.playerTurn;

  let result = game.score(current.state, maximizePlayer);
  if (result.isTerminal || depth === 0) {
    tree.miniMaxScore = result.score;
    return tree;
  }

  let moves = game.moves(current.state);
  let outcomes = moves.map((move) => {
    let outcomeState = game.makeMove(current, move);
    let outcomeTree = computeTree(game, {current: outcomeState}, depth-1);
    return {move: move, outcome: outcomeTree};
  });
  tree.moveOutcomes = outcomes;

  let childScores = outcomes.map((outcome) => {
    return outcome.outcome.miniMaxScore;
  })
  if (current.playerTurn === maximizePlayer) {
    tree.miniMaxScore = Math.max.apply({}, childScores);
  } else {
    tree.miniMaxScore = Math.min.apply({}, childScores);
  }

  return tree;
}
