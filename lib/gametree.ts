import GameState = require('./gamestate');

export class Node {

  playerTurn: number;
  gamestate: GameState;
  moves: Move[];
  winner: number;
  full: boolean;
  outcomeDistance: number[];
  outcomeCounts: number[];
  optimalMove: number;

  constructor(playerTurn: number, gamestate: GameState) {
    this.playerTurn = playerTurn;
    this.gamestate = gamestate;
    
    this.moves = [];
    this.optimalMove = null;
    this.outcomeDistance = [Infinity, Infinity, Infinity];
    this.outcomeCounts =[0, 0, 0];

    this.winner = gamestate.winner();
    this.full = gamestate.full();

    if (this.winner) {
      this.outcomeDistance[this.winner] = 0;
      this.outcomeCounts[this.winner] = 1;
      return;
    } else if (this.full) {
      this.outcomeDistance[0] = 0;
      this.outcomeCounts[0] = 1;
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

    this.computeOptimalMove();
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
    this.outcomeDistance[0] = Math.min(this.outcomeDistance[0], node.outcomeDistance[0] + 1);
    this.outcomeDistance[1] = Math.min(this.outcomeDistance[1], node.outcomeDistance[1] + 1);
    this.outcomeDistance[2] = Math.min(this.outcomeDistance[2], node.outcomeDistance[2] + 1);
    this.outcomeCounts[0] += node.outcomeCounts[0];
    this.outcomeCounts[1] += node.outcomeCounts[1];
    this.outcomeCounts[2] += node.outcomeCounts[2];
  }

  computeOptimalMove() {
    let player = this.playerTurn;
    let opponent = player === 1 ? 2 : 1;
    let candidates: number[] = [];
    let maxLoseDistance = -Infinity;
    let minWinDistance = Infinity;
    for (let i = 0; i < this.moves.length; i++) {
      let move = this.moves[i];
      let loseDistance = move.result.outcomeDistance[opponent];
      let winDistance = move.result.outcomeDistance[player];
      if (loseDistance < maxLoseDistance) {
        continue;
      }
      else if (loseDistance > maxLoseDistance) {
        candidates = [i];
        maxLoseDistance = loseDistance;
        minWinDistance = winDistance;
      }
      else {
        candidates.push(i);
        if (winDistance < minWinDistance) {
          minWinDistance = winDistance;
        }
      }
    }
    if (candidates.length === 1) {
      this.optimalMove = candidates[0];
      return;
    }
    let maxWinPercentage = -Infinity;
    candidates = candidates.filter((i) => {
      let move = this.moves[i];
      if (move.result.outcomeDistance[player] > minWinDistance) {
        return false;
      }
      let outcomeCounts = move.result.outcomeCounts;
      let total = outcomeCounts[0] + outcomeCounts[1] + outcomeCounts[2];
      let winningPercentage = outcomeCounts[player] / total;
      maxWinPercentage = Math.max(maxWinPercentage, winningPercentage);
      return true;
    });
    if (candidates.length === 1) {
      this.optimalMove = candidates[0];
      return;
    }
    candidates = candidates.filter((i) => {
      let move = this.moves[i];
      let outcomeCounts = move.result.outcomeCounts;
      let total = outcomeCounts[0] + outcomeCounts[1] + outcomeCounts[2];
      let winningPercentage = outcomeCounts[player] / total;
      return winningPercentage >= maxWinPercentage;
    });
    this.optimalMove = candidates[0];
  }

}

export class Move {

  constructor(
    public row: number,
    public col: number,
    public result: Node
  ) {}

}
