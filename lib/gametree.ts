import GameState = require('./gamestate');

export class Node {

  moves: Move[];
  winner: number;
  full: boolean;

  constructor(public playerTurn: number, public gamestate: GameState) {
    this.moves = [];
    this.winner = gamestate.winner();
    this.full = gamestate.full();

    if (this.winner || this.full) {
      return;
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (gamestate.matrix[row][col] !== 0) {
          continue;
        }
        this.addMove(row, col);
      }
    }
  }

  addMove(row: number, col: number) {
    let gamestate = this.gamestate.takeTurn(this.playerTurn, row, col);
    for (let move of this.moves) {
      if (move.result.gamestate.equals(gamestate)) {
        return;
      }
    }
    let node = new Node(this.playerTurn === 1 ? 2 : 1, gamestate);
    this.moves.push(new Move(row, col, node));
  }

}

export class Move {

  constructor(
    public row: number,
    public col: number,
    public result: Node
  ) {}

}
