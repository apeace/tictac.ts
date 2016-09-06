/// <reference path="../../../typings/index.d.ts" />

import expect = require('expect.js');
import * as tictac from '../../../lib/games/tictac';

describe('TicTac', () => {

    const empty3x3 = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const rowWin3x3 = [
        [2, 0, 2],
        [0, 2, 0],
        [1, 1, 1],
    ];

    const colWin3x3 = [
        [2, 0, 1],
        [0, 2, 1],
        [2, 0, 1],
    ];

    const leftDiagWin3x3 = [
        [1, 0, 2],
        [2, 1, 0],
        [2, 0, 1],
    ];

    const leftDiagInProg3x3 = [
        [0, 2, 0],
        [1, 0, 2],
        [0, 1, 0],
    ];

    const rightDiagWin3x3 = [
        [2, 0, 1],
        [2, 1, 0],
        [1, 0, 2],
    ];

    const rightDiagInProg3x3 = [
        [0, 2, 0],
        [2, 0, 1],
        [0, 1, 0],
    ];

    const tie3x3 = [
        [2, 1, 2],
        [2, 2, 1],
        [1, 2, 1],
    ];

    describe('game()', () => {

        it('players can\'t be modified later', () => {
            let players = [1, 2];
            let g = tictac.game({players, n: 3, k: 3});
            players.push(3);
            expect(g.players).to.eql([1, 2]);
        });

        it('players can\'t be modified in place', () => {
            let g = tictac.game({players: [1, 2], n: 3, k: 3});
            g.players.push(3);
            expect(g.players).to.eql([1, 2]);
        });

        it('initialState can\'t be modified in place', () => {
            let g = tictac.game({players: [1, 2], n: 3, k: 3});
            let initial: tictac.State = g.initialState;
            expect(initial).to.eql({state: empty3x3, playerTurn: 1});
            initial.state[0][0] = 1;
            expect(g.initialState).to.eql({state: empty3x3, playerTurn: 1});
        });

    });

    describe('score() 3x3', () => {

        let game = tictac.game({players: [1, 2], n: 3, k: 3});

        it('empty', () => {
            let state = {state: empty3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: false,
                playerScores: {1: 0, 2: 0}
            });
        });

        it('row win', () => {
            let state = {state: rowWin3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: true,
                playerScores: {1: Infinity, 2: 2}
            });
        });

        it('col win', () => {
            let state = {state: colWin3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: true,
                playerScores: {1: Infinity, 2: 2}
            });
        });

        it('left diag win', () => {
            let state = {state: leftDiagWin3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: true,
                playerScores: {1: Infinity, 2: 2}
            });
        });

        it('left diag in-prog', () => {
            let state = {state: leftDiagInProg3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: false,
                playerScores: {1: 2, 2: 2}
            });
        });

        it('right diag win', () => {
            let state = {state: rightDiagWin3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: true,
                playerScores: {1: Infinity, 2: 2}
            });
        });

        it('right diag in-prog', () => {
            let state = {state: rightDiagInProg3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: false,
                playerScores: {1: 2, 2: 2}
            });
        });

        it('tie', () => {
            let state = {state: tie3x3, playerTurn: 1};
            expect(game.score(state)).to.eql({
                isOver: true,
                playerScores: {1: 2, 2: 2}
            });
        });

    });

});
