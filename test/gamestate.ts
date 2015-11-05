/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import GameState = require('../lib/gamestate');
import matrix = require('../lib/matrix');

describe('GameState', () => {

  describe('constructor', () => {

    it('Can be constructed with 3x3 matrix', () => {
      let gamestate = new GameState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
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

  });

});
