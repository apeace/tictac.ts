
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
    var m = gamestate.matrix;
    // compare the matrices each time before rotating,
    // but don't rotate if the last comparison isn't equal
    for (let i = 0; i < 4; i++) {
      if (matrix.equals(this._matrix, m)) {
        return true;
      }
      if (i < 3) {
        m = matrix.rotateClockwise(m);
      }
    }
    return false;
  }

}
