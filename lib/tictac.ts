
import matrix = require('./matrix');
import minimax = require('./minimax');

// a Board is represented as a 2D matrix,
// where each cell in the matrix is either 0, 1, or 2:
// 0 = no player
// 1 = player A
// 2 = player B
export type Board = matrix.Matrix;

// alias, for convenience
export type TicTacState = minimax.GameState<Board>;

// a TicTacMove is represented as the (x, y) coordinates
// the player will take on the TicTacBoard
export interface TicTacMove {
  x: number;
  y: number;
}

// a 3x3 TicTacToe game
export let Game: minimax.Game<Board, TicTacMove> = {

  // initial state of a Tic-Tac-Toe game (empty board)
  initial: {
    state: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    playerTurn: 1
  },

  // returns isTerminal=true if the game has been won or tied,
  // and isTerminal=false if the game is not yet complete.
  // if the game is not yet complete, returns score=0.
  // if the game has been tied, returns score=0.
  // if the game has been won by player, returns score=1.
  // if the game has been lost by player, returns score=-1
  score: (board: Board, player: number): minimax.GameResult => {
    // helper function to return GameResult based on which number
    // (either 1 or 2) we find three in a row of
    let winner = (val: number): minimax.GameResult => {
      return {
        isTerminal: true,
        score: val === player ? 1 : -1
      };
    }

    let b = board;

    // check rows
    for (let i = 0; i < 3; i++) {
      if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        return winner(b[i][0]);
      }
    }
    // check columns 
    for (let i = 0; i < 3; i++) {
      if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        return winner(b[0][i]);
      }
    }
    // check diagonals
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] == b[2][2]) {
      return winner(b[0][0]);
    }
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] == b[2][0]) {
      return winner(b[0][2]);
    }

    for (let i = 0; i < 3; i++) {
      for (let e = 0; e < 3; e++) {
        if (b[i][e] === 0) {
          // board is not full, no winner
          return {isTerminal: false, score: 0};
        }
      }
    }

    // board is full, tie
    return {isTerminal: true, score: 0};
  },

  // returns list of possible moves that could be made
  // on the given board
  moves: (board: Board): TicTacMove[] => {
    let moveList: TicTacMove[] = [];
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
  makeMove: (state: TicTacState, move: TicTacMove): TicTacState => {
    let m = matrix.clone(state.state);
    m[move.x][move.y] = state.playerTurn;
    return {
      state: m,
      playerTurn: state.playerTurn === 1 ? 2 : 1
    };
  }

};
