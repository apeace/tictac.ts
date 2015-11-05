
import matrix = require('./matrix');

export = GameState;

class GameState {
  private matrix: matrix.Matrix;

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
    this.matrix = matrix;
  }

}
