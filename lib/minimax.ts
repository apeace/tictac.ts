
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
  moveOutcomes?: MoveOutcome<T, M>[];
}


export function tree<T, M> (game: Game<T, M>, depth=0): GameTree<T, M> {
  let tree = {
    current: game.initial
  };
  return advanceToDepth(game, tree, depth);
}

export function advanceToDepth<T, M> (game: Game<T, M>, tree: GameTree<T, M>, depth=0): GameTree<T, M> {
  for (let i = 0; i < depth; i++) {
    /*
    let moveOutcomes = game.moves(game.initial).map((move) => {
      return {move: move, outcome: game.makeMove(game.initial, move)};
    });
    */
  }
  return tree;
}
