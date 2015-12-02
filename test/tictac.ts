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

  describe('score()', () => {

    let score = tictac.Game.score;

    it('Detects winner 1', () => {
      let state = winner1Matrix;
      // player 1 wins
      let score1 = score(state, 1);
      expect(score1).to.eql({isTerminal: true, score: 1});
      // player 2 loses
      let score2 = score(state, 2);
      expect(score2).to.eql({isTerminal: true, score: -1});
    });

    it('Detects winner 2', () => {
      let state = winner2Matrix;
      // player 1 loses
      let score1 = score(state, 1);
      expect(score1).to.eql({isTerminal: true, score: -1});
      // player 2 wins
      let score2 = score(state, 2);
      expect(score2).to.eql({isTerminal: true, score: 1});
    });

    it('Detects tie', () => {
      let state = tieMatrix;
      // tie for both player 1 and player 2
      let score1 = score(state, 1);
      expect(score1).to.eql({isTerminal: true, score: 0});
      let score2 = score(state, 2);
      expect(score2).to.eql({isTerminal: true, score: 0});
    });

    it('Detects incomplete game', () => {
      let state = emptyMatrix;
      // incomplete for both player 1 and player 2
      let score1 = score(state, 1);
      expect(score1).to.eql({isTerminal: false, score: 0});
      let score2 = score(state, 2);
      expect(score2).to.eql({isTerminal: false, score: 0});
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
