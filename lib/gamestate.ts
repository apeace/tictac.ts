import matrix = require('./matrix');

export = GameState;

class GameState {
  private _matrix: matrix.Matrix;

  constructor(matrix: matrix.Matrix) {
    if (matrix.length !== 3) {
      throw new Error('GameState must have three rows');
    }
    let threeColumns = 3 == matrix[0].length &&
      3 == matrix[1].length &&
      3 == matrix[2].length;
    if (!threeColumns) { 
      throw new Error('GameState must have three columns');
    }
    this._matrix = matrix;
  }

  get matrix(): matrix.Matrix {
    return this._matrix;
  }

  equals(gamestate: GameState): boolean {
    let m = gamestate.matrix;
    // compare against all rotations of the gamestate matrix
    // but don't rotate after the last comparison
    for (let i = 0; i < 4; i++) {
      if (matrix.equals(this._matrix, m)) {
        return true;
      }
      if (i < 3) {
        m = matrix.rotateClockwise90(m);
      }
    }
    // compare against transpositions (reflect over diagonals)
    m = matrix.transpose(gamestate.matrix);
    if (matrix.equals(this._matrix, m)) {
      return true;
    }
    m = matrix.reverseTranspose(gamestate.matrix);
    if (matrix.equals(this._matrix, m)) {
      return true;
    }
    // compare against flips (reflect over vertical/horizontal)
    m = matrix.flipHorizontal(gamestate.matrix);
    if (matrix.equals(this._matrix, m)) {
      return true;
    }
    m = matrix.flipVertical(gamestate.matrix);
    if (matrix.equals(this._matrix, m)) {
      return true;
    }
    return false;
  }

  winner(): number {
    let m = this._matrix;
    // check rows
    for (let i = 0; i < 3; i++) {
      if (m[i][0] !== 0 && m[i][0] === m[i][1] && m[i][1] === m[i][2]) {
        return m[i][0];
      }
    }
    // check columns 
    for (let i = 0; i < 3; i++) {
      if (m[0][i] !== 0 && m[0][i] === m[1][i] && m[1][i] === m[2][i]) {
        return m[0][i];
      }
    }
    // check diagonals
    if (m[0][0] !== 0 && m[0][0] === m[1][1] && m[1][1] == m[1][2]) {
      return m[0][0];
    }
    if (m[0][2] !== 0 && m[0][2] === m[1][1] && m[1][1] == m[2][0]) {
      return m[0][2];
    }
    return null;
  }

  full(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let e = 0; e < 3; e++) {
        if (this._matrix[i][e] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  takeTurn(player: number, row: number, col: number): GameState {
    let m = matrix.clone(this._matrix);
    m[row][col] = player;
    return new GameState(m);
  }

}
