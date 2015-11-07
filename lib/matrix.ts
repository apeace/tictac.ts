export type Matrix = number[][];

export function equals (a: Matrix, b: Matrix) {
  if (a.length !== b.length) {
    return false;
  }
  for (let row = 0; row < a.length; row++) {
    if (row == 0 && (a[row].length !== b[row].length)) {
      return false;
    }
    for (let col = 0; col < a[row].length; col++) {
      if (a[row][col] !== b[row][col]) {
        return false;
      }
    }
  }
  return true;
}

export function clone (matrix: Matrix): Matrix {
  let cloned: Matrix = [];
  for (let row = 0; row < matrix.length; row++) {
    cloned.push(matrix[row].slice());
  }
  return cloned;
}

export function rotateClockwise90 (matrix: Matrix): Matrix {
  let rotated: Matrix = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!rotated[col]) {
        rotated.push([]);
      }
      rotated[col].unshift(matrix[row][col]);
    }
  }
  return rotated;
}

export function rotateClockwise180 (matrix: Matrix): Matrix {
  return rotateClockwise90(rotateClockwise90(matrix));
}

export function rotateClockwise270 (matrix: Matrix): Matrix {
  return rotateClockwise90(rotateClockwise90(rotateClockwise90(matrix)));
}

export function transpose (matrix: Matrix): Matrix {
  let transposed: Matrix = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (row == 0) {
        transposed.push([]);
      }
      transposed[col].push(matrix[row][col]);
    }
  }
  return transposed;
}

export function reverseTranspose (matrix: Matrix): Matrix {
  let transposed: Matrix = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (row === 0) {
        transposed.unshift([]);
      }
      let insertRow = (row === 0) ? 0 : matrix[row].length - col - 1;
      transposed[insertRow].unshift(matrix[row][col]);
    }
  }
  return transposed;
}
