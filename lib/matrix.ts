
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

export function rotateClockwise (matrix: Matrix): Matrix {
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
