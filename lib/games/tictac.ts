import * as matrix from '../matrix';
import * as minimax from '../minimax';

// a Board is represented as a 2D matrix,
// 0 = no player; 1 = player 1; 2 = player 2, etc
export type Board = matrix.Matrix;

// alias, for convenience
export type State = minimax.GameState<Board>;

// a Move is represented as the (x, y) coordinates
// the player will take on the Board
export interface Move {
    x: number;
    y: number;
}

// configuration for an NxN, K-in-a-row TicTac game
export interface GameConfig {
    players: number[];
    n: number;
    k: number;
}

// An NxN, K-in-a-row TicTacToe game
export function game (config: GameConfig) {
    // copy players so the caller can't modify them
    let players = config.players.slice();

    return {
        // player list is read-only
        get players (): number[] {
            return players.slice();
        },

        // initialState is read-only
        get initialState (): State {
            return {
                state: makeEmptyBoard(config.n),
                playerTurn: players[0]
            };
        },

        score (state: State): minimax.GameScore {
            return scoreGame({players, n: config.n, k: config.k}, state);
        },

        moves (state: State): Move[] {
            // TODO
            return [];
        },

        makeMove (state: State, move: Move): State {
            // TODO
            return state;
        }
    };
}

// creates an empty board of size N
function makeEmptyBoard (n: number): Board {
    let board: Board = [];
    for (let i = 0; i < n; i++) {
        let row: number[] = [];
        board.push(row);
        for (let e = 0; e < n; e++) {
            row.push(0);
        }
    }
    return board;
}

function scoreGame (
    config: GameConfig,
    state: State
): minimax.GameScore {
    let n = config.n;
    let k = config.k;
    let board = state.state;

    // initialize player scores at 0
    let playerScores: {[player: number]: number} = {};
    for (let player of config.players) {
        playerScores[player] = 0;
    }

    // track whether any empty space has been seen
    let emptySpaceSeen = false;

    // track how many cells we've seen in sequence for a player
    let inSeq: {[seq: string]: {player: number, count: number}} = {
        'row': {player: 0, count: 0},
        'col': {player: 0, count: 0},
        'left-diag-lower': {player: 0, count: 0},
        'left-diag-upper': {player: 0, count: 0},
        'right-diag-lower': {player: 0, count: 0},
        'right-diag-upper': {player: 0, count: 0}
    };

    function playerSeen (seq: string, player: number) {
        if (player === 0) {
            emptySpaceSeen = true;
            inSeq[seq] = {player: 0, count: 0};
        }
        else if (inSeq[seq].player === player) {
            inSeq[seq].count++;
        }
        else {
            let lastPlayer = inSeq[seq].player;
            if (lastPlayer !== 0) {
                playerScores[lastPlayer] = Math.max(playerScores[lastPlayer], inSeq[seq].count);
            }
            inSeq[seq] = {player, count: 1};
        }
    }

    function reset (seq: string) {
        let lastPlayer = inSeq[seq].player;
        if (lastPlayer === 0) return;
        playerScores[lastPlayer] = Math.max(playerScores[lastPlayer], inSeq[seq].count);
        inSeq[seq] = {player: 0, count: 0};
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // check rows and columns
            playerSeen('row', board[i][j]);
            playerSeen('col', board[j][i]);
            // check diagonals
            let ldiagRow = i+j;
            if (ldiagRow >= n) continue;
            let ldiagCol = j;
            let rdiagRow = n - 1 - ldiagRow;
            let rdiagCol = ldiagCol;
            playerSeen('left-diag-lower', board[ldiagRow][ldiagCol]);
            playerSeen('right-diag-upper', board[rdiagRow][rdiagCol]);
            if (ldiagRow !== ldiagCol) {
                playerSeen('left-diag-upper', board[ldiagCol][ldiagRow]);
                playerSeen('right-diag-lower', board[rdiagCol][rdiagRow]);
            }
        }
        reset('row');
        reset('col');
        reset('left-diag-lower');
        reset('left-diag-upper');
        reset('right-diag-lower');
        reset('right-diag-upper');
    }

    let winnerFound = false;
    for (let player of config.players) {
        if (playerScores[player] === k) {
            winnerFound = true;
            playerScores[player] = Infinity;
        }
    }

    return {
        isOver: winnerFound || !emptySpaceSeen,
        playerScores
    };
}
