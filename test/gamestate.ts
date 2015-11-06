/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import GameState = require('../lib/gamestate');
import matrix = require('../lib/matrix');

describe('GameState', () => {

  const emptyMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  describe('constructor', () => {

    it('Can be constructed with 3x3 matrix', () => {
      let gamestate = new GameState(emptyMatrix);
    });

    it('Cannot be constructed with less than three rows', () => {
      var matrix: matrix.Matrix = [];
      do {
        expect(() => {
          new GameState(matrix);
        }).to.throwError(/rows/);
        matrix.push([0, 0, 0]);
      } while (matrix.length < 3);
    });

    it('Cannot be constructed with less than three columns', () => {
      var matrix: matrix.Matrix = [
        [0, 0],
        [0, 0],
        [0, 0]
      ];
      for (let i = 0; i < 3; i++) {
        expect(() => {
          new GameState(matrix);
        }).to.throwError(/columns/);
        matrix[i].push(0);
      }
    });

  }); // end constructor

  describe('equals()', () => {

    it('Works for exact equality', () => {
      let state1 = new GameState(emptyMatrix);
      let state2 = new GameState(emptyMatrix);
      let state3 = new GameState([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ]);
      expect(state1.equals(state2)).to.be.ok();
      expect(state1.equals(state3)).to.not.be.ok();
    });

    it('Works for rotated equality', () => {
      var state1 = new GameState([
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
      var state2 = new GameState(matrix.rotateClockwise(state1.matrix));
      var state3 = new GameState(matrix.rotateClockwise(state2.matrix));
      var state4 = new GameState(matrix.rotateClockwise(state3.matrix));
      expect(state1.equals(state2)).to.be.ok();
      expect(state1.equals(state3)).to.be.ok();
      expect(state1.equals(state4)).to.be.ok();
    });

  }); // end equals()

});
