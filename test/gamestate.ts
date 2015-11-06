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
  const winner1Matrix = [
    [0, 2, 1],
    [2, 0, 1],
    [0, 2, 1]
  ];
  const winner2Matrix = [
    [1, 0, 2],
    [0, 2, 1],
    [2, 0, 1]
  ];
  const fullMatrix = [
    [1, 2, 1],
    [2, 1, 1],
    [2, 1, 2]
  ];

  describe('constructor', () => {

    it('Can be constructed with 3x3 matrix', () => {
      let gamestate = new GameState(emptyMatrix);
    });

    it('Cannot be constructed with less than three rows', () => {
      let matrix: matrix.Matrix = [];
      do {
        expect(() => {
          new GameState(matrix);
        }).to.throwError(/rows/);
        matrix.push([0, 0, 0]);
      } while (matrix.length < 3);
    });

    it('Cannot be constructed with less than three columns', () => {
      let matrix: matrix.Matrix = [
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

    it('Detects exact equality', () => {
      let state1 = new GameState(emptyMatrix);
      let state2 = new GameState(emptyMatrix);
      let state3 = new GameState(winner1Matrix);
      expect(state1.equals(state2)).to.be.ok();
      expect(state1.equals(state3)).to.not.be.ok();
    });

    it('Detects rotated equality', () => {
      let state1 = new GameState(winner1Matrix);
      let state2 = new GameState(matrix.rotateClockwise(state1.matrix));
      let state3 = new GameState(matrix.rotateClockwise(state2.matrix));
      let state4 = new GameState(matrix.rotateClockwise(state3.matrix));
      expect(state1.equals(state2)).to.be.ok();
      expect(state1.equals(state3)).to.be.ok();
      expect(state1.equals(state4)).to.be.ok();
    });

  }); // end equals()

  describe('winner()', () => {

    it('Detects winner 1', () => {
      let state = new GameState(winner1Matrix);
      expect(state.winner()).to.eql(1);
    });

    it('Detects winner 2', () => {
      let state = new GameState(winner2Matrix);
      expect(state.winner()).to.eql(2);
    });

    it('Detects no winner', () => {
      let state = new GameState(emptyMatrix);
      expect(state.winner()).to.not.be.ok();
    });

  }); // end winner()

  describe('full()', () => {

    it('Detects full', () => {
      let state = new GameState(fullMatrix);
      expect(state.full()).to.be.ok();
    });

    it('Detects not full', () => {
      let state1 = new GameState(emptyMatrix);
      expect(state1.full()).to.not.be.ok();
      let state2 = new GameState(winner2Matrix);
      expect(state2.full()).to.not.be.ok();
    });

  }); // end full()

});
