import matrix = require('./matrix');
import minimax = require('./minimax');

// a Board is represented as a 2D matrix,
// where each cell in the matrix is either 0, 1, or 2:
// 0 = no player
// 1 = player 1
// 2 = player 2
export type Board = matrix.Matrix;

// alias, for convenience
export type State = minimax.GameState<Board>;

// a Move is represented as the (x, y) coordinates
// the player will take on the Board
export interface Move {
  x: number;
  y: number;
}

// a 3x3 TicTacToe game
export let Game: minimax.Game<Board, Move> = {

  // there are two players, called 1 and 2
  players: [1, 2],

  // initial state of a Tic-Tac-Toe game (empty board)
  initialState: {
    state: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    playerTurn: 1
  },

  // returns true if the game is over, false otherwise
  isOver: (board: Board): boolean => {
    let won = winner(board);
    if (won !== 0) {
      return true;
    }
    // no winner. check if there are any empty spaces
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          // found an empty space
          return false;
        }
      }
    }
    // game board is full
    return true;
  },

  // returns a score for the given player on the given board.
  // returns 1 if the player has won
  // returns -1 if the player has lost
  // returns 0 otherwise
  score: (board: Board, player: number): number => {
    let won = winner(board);
    if (won === 0) return 0;
    return won === player ? 1 : -1;
  },

  // returns list of possible moves that could be made
  // on the given board
  moves: (board: Board): Move[] => {
    let moveList: Move[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          moveList.push({x: row, y: col});
        }
      }
    }
    return moveList;
  },

  // returns a new board with the given move applied
  // to the given board
  makeMove: (state: State, move: Move): State => {
    let m = matrix.clone(state.state);
    m[move.x][move.y] = state.playerTurn;
    return {
      state: m,
      playerTurn: state.playerTurn === 1 ? 2 : 1
    };
  }

};

// helper for identifying the winner of a game
export function winner (board: Board): number {
  let b = board;

  // check rows
  for (let i = 0; i < 3; i++) {
    if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
      return b[i][0];
    }
  }
  // check columns 
  for (let i = 0; i < 3; i++) {
    if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
      return b[0][i];
    }
  }
  // check diagonals
  if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] == b[2][2]) {
    return b[0][0];
  }
  if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] == b[2][0]) {
    return b[0][2];
  }

  // no winner
  return 0;
}
