/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import minimax = require('../lib/minimax');

describe('MiniMax', () => {

  // for testing purposes, we define a minimax.Game which
  // only has two moves. we call it "Two Move Game" or "TMG"

  // below is what the tree should look like. each "X" is
  // a node, and each number in parens is the minimax score
  // for that node. the letters next to the lines are the
  // moves each player can make.
  //
  //                X (2)
  //              /   \
  //             /     \ 
  //            /       \
  //         A /         \ B
  //          /           \
  //         /             \
  //        X (2)           X (1)
  //       / \             / \
  //    A /   \ B       A /   \ B
  //     /     \         /     \ 
  //    X (2)   X (7)   X (1)   X (8)

  // the state of our game. each player will choose one letter
  interface TMGState {
    player1?: string;
    player2?: string;
  }

  // an alias for convenience
  type TMGGameState = minimax.GameState<TMGState>;

  // a move in our game is simply which letter was chosen
  type TMGMove = string;

  let TMG: minimax.Game<TMGState, TMGMove> = {
    // there are two players
    players: [1, 2],
    // initial state is empty and player 1 goes first
    initialState: {
      state: {},
      playerTurn: 1
    },
    // game is over when both moves have been taken
    isOver: (state: TMGState): boolean => {
      return Boolean(state.player1) && Boolean(state.player2);
    },
    // scoring here follows no real logic--simply making sure
    // the outcomes match the leaf nodes in the above tree
    score: (state: TMGState, player: number): number => {
      let lookup: {[firstmove: string]: {[secondmove: string]: number}} = {
        "A": {"A": 2, "B": 7},
        "B": {"A": 1, "B": 8}
      };
      return lookup[state.player1][state.player2];
    },
    // the available moves are always the same
    moves: (state: TMGState): string[] => {
      return ["A", "B"];
    },
    // when making a move, just assign the move string to the state
    makeMove: (state: TMGGameState, move: string): TMGGameState => {
      if (state.playerTurn === 1) {
        return {state: {player1: move}, playerTurn: 2};
      }
      else {
        return {state: {player1: state.state.player1, player2: move}, playerTurn: 0};
      }
    }
  };

  describe('tree() with TMG', () => {

    let tree = minimax.tree;
    let tmgTree = tree(TMG, -1);

    it('Tree is correct height', () => {
      let firstLevel = tmgTree.moveOutcomes;
      expect(firstLevel.length).to.eql(2);
      let secondLevel = flatten(firstLevel.map((outcome) => {
         return outcome.outcome.moveOutcomes; 
      }));
      expect(secondLevel.length).to.eql(4);
      secondLevel.map((outcome) => {
        if (outcome.outcome.moveOutcomes) {
          throw new Error('Tree is too tall');
        }
      });
    });

    it('Scores are correct', () => {
      expect(tmgTree.miniMaxScores[1]).to.eql(2);
      let firstLevel = tmgTree.moveOutcomes;
      let firstLevelScores = firstLevel.map((outcome) => {
        return outcome.outcome.miniMaxScores[1];
      });
      expect(firstLevelScores).to.eql([2, 1]);
      let secondLevelScores = flatten(firstLevel.map((outcome) => {
         return outcome.outcome.moveOutcomes.map((outcome) => {
           return outcome.outcome.miniMaxScores[1];
         }); 
      }));
      expect(secondLevelScores).to.eql([2, 7, 1, 8]);
    });

  }); // end tree()

});

// helper function for flattening a list of lists
function flatten<Y> (list: Y[][]): Y[] {
  let result: Y[] = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      result.push(list[i][j]);
    }
  }
  return result;
}


