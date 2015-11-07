/// <reference path="../typings/tsd.d.ts" />

import expect = require('expect.js');

import GameState = require('../lib/gamestate');
import gametree = require('../lib/gametree');
import matrix = require('../lib/matrix');

describe('GameTree', () => {

  it('Detects 1 move', () => {
    let state = new GameState([
      [1, 2, 1],
      [2, 1, 2],
      [0, 2, 0]
    ]);
    let tree = new gametree.Node(1, state);
    expect(tree.moves.length).to.eql(1);
  });

  it('Detects 2 moves', () => {
    let state = new GameState([
      [1, 2, 1],
      [2, 1, 2],
      [2, 0, 0]
    ]);
    let tree = new gametree.Node(1, state);
    expect(tree.moves.length).to.eql(2);
  });

  it('Detects 3 moves', () => {
    let state = new GameState([
      [1, 1, 2],
      [2, 1, 2],
      [0, 0, 0]
    ]);
    let tree = new gametree.Node(1, state);
    expect(tree.moves.length).to.eql(3);
  });

  it('Detects 4 moves', () => {
    let state = new GameState([
      [1, 2, 0],
      [2, 1, 2],
      [0, 0, 0]
    ]);
    let tree = new gametree.Node(1, state);
    expect(tree.moves.length).to.eql(4);
  });
  
  it('Detects 5 moves', () => {
    let state = new GameState([
      [1, 0, 2],
      [2, 0, 0],
      [0, 0, 1]
    ]);
    let tree = new gametree.Node(1, state);
    expect(tree.moves.length).to.eql(5);
  });

});
