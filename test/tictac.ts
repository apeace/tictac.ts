/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import tictac = require('../lib/tictac');

describe('TicTac', () => {

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
  const tieMatrix = [
    [1, 2, 1],
    [2, 1, 1],
    [2, 1, 2]
  ]; 

  describe('isOver()', () => {

    let isOver = tictac.Game.isOver;

    it('Detects winner', () => {
      expect(isOver(winner1Matrix)).to.eql(true);
      expect(isOver(winner2Matrix)).to.eql(true);
    });

    it('Detects tie', () => {
      expect(isOver(tieMatrix)).to.eql(true);
    });

    it('Detects incomplete game', () => {
      expect(isOver(emptyMatrix)).to.eql(false);
    });

  }); // end isOver()

  describe('score()', () => {

    let score = tictac.Game.score;

    it('Detects winner 1', () => {
      expect(score(winner1Matrix, 1)).to.eql(1);
      expect(score(winner1Matrix, 2)).to.eql(-1);
    });

    it('Detects winner 2', () => {
      expect(score(winner2Matrix, 1)).to.eql(-1);
      expect(score(winner2Matrix, 2)).to.eql(1);
    });

    it('Detects tie', () => {
      expect(score(tieMatrix, 1)).to.eql(0);
      expect(score(tieMatrix, 2)).to.eql(0);
    });

    it('Detects incomplete game', () => {
      expect(score(emptyMatrix, 1)).to.eql(0);
      expect(score(emptyMatrix, 2)).to.eql(0);
    });

  }); // end score()

  describe('moves()', () => {

    let moves = tictac.Game.moves;

    it('Detects 1 move', () => {
      let state = [
        [1, 2, 1],
        [2, 1, 2],
        [1, 2, 0]
      ];
      expect(moves(state).length).to.eql(1);
    });

    it('Detects 3 moves', () => {
      let state = [
        [1, 2, 0],
        [0, 1, 2],
        [1, 2, 0]
      ];
      expect(moves(state).length).to.eql(3);
    });

  }); // end moves()

  describe('makeMove()', () => {

    let makeMove = tictac.Game.makeMove;

    it('Returns new state with turn applied', () => {
      let state = {state: emptyMatrix, playerTurn: 1};
      let move = {x: 0, y: 0};
      let finalState = {
        state: [
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        playerTurn: 2
      };
      expect(makeMove(state, move)).to.eql(finalState);
    });

  }); // end makeMove()

});
