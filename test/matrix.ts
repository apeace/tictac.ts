/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import matrix = require('../lib/matrix');

describe('matrix', () => {

  describe('rotateClockwise()', () => {

    let rotateClockwise = matrix.rotateClockwise;

    it('Works on empty matrix', () => {
      let empty: matrix.Matrix = [];
      expect(rotateClockwise(empty)).to.eql(empty);
    });

    it('Works on a 1x1', () => {
      let oneByOne = [
        [1]
      ];
      expect(rotateClockwise(oneByOne)).to.eql(oneByOne);
    });

    it('Works on a 1x2', () => {
      let oneByTwo = [
        [1, 2]
      ];
      let rotated = [
        [1],
        [2]
      ];
      expect(rotateClockwise(oneByTwo)).to.eql(rotated);
    });

    it('Works on a 2x2', () => {
      let twoByTwo = [
        [1, 2],
        [3, 4]
      ];
      let rotated = [
        [3, 1],
        [4, 2]
      ];
      expect(rotateClockwise(twoByTwo)).to.eql(rotated);
    });

    it('Works on a 2x3', () => {
      let twoByThree = [
        [1, 2, 3],
        [4, 5, 6]
      ];
      let rotated = [
        [4, 1],
        [5, 2],
        [6, 3]
      ];
      expect(rotateClockwise(twoByThree)).to.eql(rotated);
    });

    it('Works on a 3x3', () => {
      let threeByThree = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      let rotated = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
      ];
      expect(rotateClockwise(threeByThree)).to.eql(rotated);
    });

  }); // end rotateClockwise()

  describe('equals()', () => {

  }); // end equals()

});
