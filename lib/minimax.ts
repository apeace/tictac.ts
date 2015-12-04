/*
 * Game: The interface required for minimax AI to play a game
 */

// S = the type of the game state (e.g. a tic-tac-toe board)
// M = the type of a game move (e.g. x/y coordinates in tic-tac-toe)
export interface Game<S, M> {
  // TODO deprecate?
  // or, could be useful for UI turn-taking logic...
  players: number[];
  // the starting state of the game
  initialState: GameState<S>;
  // returns true if the game has ended, false otherwise
  isOver(state: S): boolean;
  // returns the score for the given state, for the given player
  score(state: S, player: number): number;
  // returns all possible next moves for the given state
  moves(state: S): M[]
  // creates a new GameState by applying the given move
  // to the given GameState
  makeMove(state: GameState<S>, move: M): GameState<S>
}

// represents the state of a game, including the actual state
// (e.g. the tic-tac-toe board) and who's turn it is now
// TODO: could use a better name, so we don't have state.state
export interface GameState<S> {
  state: S;
  playerTurn: number;
}

/*
 * AI: The class that facilitates getting the next move
 * for each AI player
 */

export class AI<T, M> {

  private tree: GameTree<T, M>;

  constructor(
    private game: Game<T, M>,
    private conf: Config
  ) {
    // TODO
    this.tree = new GameTree();
  }

}

// represents an AI configuration
export interface Config {
  // the player numbers 
  aiPlayers: number[];
}

/*
 * GameTree: The class that facilitates incrementally building
 * a minimax game tree
 */

export class GameTree<T, M> {
  // TODO
}


export interface DeprecatedGameTree<T, M> {
  current: GameState<T>;
  miniMaxScores?: {[player: number]: number};
  moveOutcomes?: MoveOutcome<T, M>[];
}

export interface MoveOutcome<T, M> {
  move: M;
  outcome: DeprecatedGameTree<T, M>;
}

// helper for creating a GameTree from a Game, and
// computing the tree to a given lookAhead
export function tree<T, M> (game: Game<T, M>, lookAhead=0): DeprecatedGameTree<T, M> {
  let tree = {
    current: game.initialState
  };
  return computeTree(game, tree, lookAhead);
}

// compute the tree to the given lookAhead
export function computeTree<T, M> (game: Game<T, M>, tree: DeprecatedGameTree<T, M>, lookAhead=0): DeprecatedGameTree<T, M> {
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
