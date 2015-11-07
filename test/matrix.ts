/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import matrix = require('../lib/matrix');

describe('matrix', () => {

  const empty: matrix.Matrix = [];
  const oneByOne = [
    [1]
  ];
  const oneByTwo = [
    [1, 2]
  ];
  const twoByTwo = [
    [1, 2],
    [3, 4]
  ];
  const twoByThree = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const threeByThree = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const fourByFour = [
    [ 1,  2,  3,  4],
    [ 5,  6,  7,  8],
    [ 9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  describe('equals()', () => {

    let equals = matrix.equals;

    it('Works on empty matrix', () => {
      expect(equals(empty, empty)).to.be.ok();
      expect(equals(empty, oneByOne)).to.not.be.ok();
    });

    it('Works on a 1x2', () => {
      expect(equals(oneByTwo, oneByTwo)).to.be.ok();
      expect(equals(oneByTwo, twoByTwo)).to.not.be.ok();
      let otherOneByTwo = [
        [3, 4]
      ];
      expect(equals(oneByTwo, otherOneByTwo)).to.not.be.ok();
    });

    it('Works on a 2x2', () => {
      expect(equals(twoByTwo, twoByTwo)).to.be.ok();
      expect(equals(twoByTwo, threeByThree)).to.not.be.ok();
      let otherTwoByTwo = [
        [1, 2],
        [3, 9]
      ];
      expect(equals(twoByTwo, otherTwoByTwo)).to.not.be.ok();
    });

  }); // end equals()

  describe('clone()', () => {

    let clone = matrix.clone;

    it('Works on empty matrix', () => {
      let result = clone(empty);
      expect(result).to.eql(empty);
      expect(result === empty).to.not.be.ok();
    });

    it('Works on a 2x2', () => {
      let result = clone(twoByTwo);
      expect(result).to.eql(twoByTwo);
      expect(result === twoByTwo).to.not.be.ok();
    });

  }); // end clone()

  describe('rotateClockwise()', () => {

    let rotateClockwise = matrix.rotateClockwise;

    // the above matrices, rotated clockwise
    const oneByOneRotated = [
      [1],
      [2]
    ];
    const twoByTwoRotated = [
      [3, 1],
      [4, 2]
    ];
    const twoByThreeRotated = [
      [4, 1],
      [5, 2],
      [6, 3]
    ];
    const threeByThreeRotated = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ];

    it('Works on empty matrix', () => {
      expect(rotateClockwise(empty)).to.eql(empty);
    });

    it('Works on a 1x1', () => {
      expect(rotateClockwise(oneByOne)).to.eql(oneByOne);
    });

    it('Works on a 1x2', () => {
      expect(rotateClockwise(oneByTwo)).to.eql(oneByOneRotated);
    });

    it('Works on a 2x2', () => {
      expect(rotateClockwise(twoByTwo)).to.eql(twoByTwoRotated);
    });

    it('Works on a 2x3', () => {
      expect(rotateClockwise(twoByThree)).to.eql(twoByThreeRotated);
    });

    it('Works on a 3x3', () => {
      expect(rotateClockwise(threeByThree)).to.eql(threeByThreeRotated);
    });

  }); // end rotateClockwise()

  describe('transpose()', () => {

    let transpose = matrix.transpose;

    // the above matrices, transposed
    const twoByTwoTransposed = [
      [1, 3],
      [2, 4]
    ];
    const threeByThreeTransposed = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ];
    const fourByFourTransposed = [
      [ 1,  5,  9, 13],
      [ 2,  6, 10, 14],
      [ 3,  7, 11, 15],
      [ 4,  8, 12, 16]
    ];

    it('Works on a 2x2', () => {
      expect(transpose(twoByTwo)).to.eql(twoByTwoTransposed);
    });

    it('Works on a 3x3', () => {
      expect(transpose(threeByThree)).to.eql(threeByThreeTransposed);
    });

    it('Works on a 4x4', () => {
      expect(transpose(fourByFour)).to.eql(fourByFourTransposed);
    });

  }); // end transpose()

  describe('reverseTranspose()', () => {

    let reverseTranspose = matrix.reverseTranspose;

    // the above matrices, reverse transposed
    const twoByTwoTransposed = [
      [4, 2],
      [3, 1]
    ];
    const threeByThreeTransposed = [
      [9, 6, 3],
      [8, 5, 2],
      [7, 4, 1]
    ];
    const fourByFourTransposed = [
      [16, 12,  8,  4],
      [15, 11,  7,  3],
      [14, 10,  6,  2],
      [13,  9,  5,  1]
    ];

    it('Works on a 2x2', () => {
      expect(reverseTranspose(twoByTwo)).to.eql(twoByTwoTransposed);
    });

    it('Works on a 3x3', () => {
      expect(reverseTranspose(threeByThree)).to.eql(threeByThreeTransposed);
    });

    it('Works on a 4x4', () => {
      expect(reverseTranspose(fourByFour)).to.eql(fourByFourTransposed);
    });

  }); // end reverseTranspose()

});
