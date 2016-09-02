(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var minimax = require('./lib/minimax');
var tictac = require('./lib/tictac');
var before = new Date().getTime();
var tree = minimax.tree(tictac.Game, -1);
var rootTree = tree;
var after = new Date().getTime();
console.log('Took %dms to generate minimax tree', (after - before));
console.log(tree);
document.getElementById('loader').innerHTML = '';
var board = document.getElementById('board');
var msgBox = document.getElementById('msgBox');
var resetButton = document.getElementById('reset');
resetButton.style.display = 'inline-block';
var gameOver = false;
var errorMsg = '';
board.addEventListener('click', function (e) {
    if (gameOver)
        return;
    var el = e.target;
    if (el.tagName !== 'TD') {
        return;
    }
    var x = Number(el.getAttribute('data-x'));
    var y = Number(el.getAttribute('data-y'));
    playMove({ x: x, y: y }, 1);
});
resetButton.addEventListener('click', function (e) {
    gameOver = false;
    errorMsg = '';
    tree = rootTree;
    drawGame();
});
drawGame();
function boardToHTML(board, moveIdx) {
    var table = '<table>';
    if (moveIdx !== null) {
        table = '<table data-move="' + String(moveIdx) + '">';
    }
    return table + board.map(rowToHTML).join('\n') + '</table>';
}
function rowToHTML(row, x) {
    return '  <tr>' + row.map(function (val, y) { return cellToHTHML(val, x, y); }).join('\n') + '</tr>';
}
function cellToHTHML(cell, x, y) {
    var letter = cell === 0 ? '' : (cell === 1 ? 'X' : 'O');
    return '    <td data-x="' + x + '" data-y="' + y + '">' + letter + '</td>';
}
function drawGame() {
    board.innerHTML = boardToHTML(tree.current.state);
    msgBox.innerHTML = '';
    if (gameOver) {
        msgBox.innerHTML += '<p>Game over!</p>';
    }
    if (errorMsg) {
        msgBox.innerHTML += '<p>' + errorMsg + '</p>';
    }
}
function moveEq(move1, move2) {
    return move1.x === move2.x &&
        move1.y === move2.y;
}
function playMove(move, player) {
    errorMsg = '';
    var chosenOutcome;
    for (var _i = 0, _a = tree.moveOutcomes; _i < _a.length; _i++) {
        var outcome = _a[_i];
        if (moveEq(outcome.move, move)) {
            chosenOutcome = outcome;
            break;
        }
    }
    if (!chosenOutcome) {
        errorMsg = 'Invalid move!';
        drawGame();
        return;
    }
    tree = chosenOutcome.outcome;
    if (!tree.moveOutcomes) {
        gameOver = true;
    }
    else if (player === 1) {
        var maxScore = -Infinity;
        for (var _b = 0, _c = tree.moveOutcomes; _b < _c.length; _b++) {
            var outcome = _c[_b];
            if (outcome.outcome.miniMaxScores[2] > maxScore) {
                maxScore = outcome.outcome.miniMaxScores[2];
                chosenOutcome = outcome;
            }
        }
        playMove(chosenOutcome.move, 2);
    }
    drawGame();
}

},{"./lib/minimax":3,"./lib/tictac":4}],2:[function(require,module,exports){
"use strict";
function equals(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (var row = 0; row < a.length; row++) {
        if (row == 0 && (a[row].length !== b[row].length)) {
            return false;
        }
        for (var col = 0; col < a[row].length; col++) {
            if (a[row][col] !== b[row][col]) {
                return false;
            }
        }
    }
    return true;
}
exports.equals = equals;
function clone(matrix) {
    var cloned = [];
    for (var row = 0; row < matrix.length; row++) {
        cloned.push(matrix[row].slice());
    }
    return cloned;
}
exports.clone = clone;
function rotateClockwise90(matrix) {
    var rotated = [];
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            if (!rotated[col]) {
                rotated.push([]);
            }
            rotated[col].unshift(matrix[row][col]);
        }
    }
    return rotated;
}
exports.rotateClockwise90 = rotateClockwise90;
function rotateClockwise180(matrix) {
    return rotateClockwise90(rotateClockwise90(matrix));
}
exports.rotateClockwise180 = rotateClockwise180;
function rotateClockwise270(matrix) {
    return rotateClockwise90(rotateClockwise90(rotateClockwise90(matrix)));
}
exports.rotateClockwise270 = rotateClockwise270;
function flipVertical(matrix) {
    var flipped = [];
    for (var row = 0; row < matrix.length; row++) {
        if (!flipped[row]) {
            flipped.push([]);
        }
        for (var col = 0; col < matrix[row].length; col++) {
            flipped[row].unshift(matrix[row][col]);
        }
    }
    return flipped;
}
exports.flipVertical = flipVertical;
function flipHorizontal(matrix) {
    var flipped = [];
    for (var row = 0; row < matrix.length; row++) {
        if (!flipped[row]) {
            flipped.unshift([]);
        }
        for (var col = 0; col < matrix[row].length; col++) {
            flipped[0].push(matrix[row][col]);
        }
    }
    return flipped;
}
exports.flipHorizontal = flipHorizontal;
function transpose(matrix) {
    var transposed = [];
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            if (row == 0) {
                transposed.push([]);
            }
            transposed[col].push(matrix[row][col]);
        }
    }
    return transposed;
}
exports.transpose = transpose;
function reverseTranspose(matrix) {
    var transposed = [];
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            if (row === 0) {
                transposed.unshift([]);
            }
            var insertRow = (row === 0) ? 0 : matrix[row].length - col - 1;
            transposed[insertRow].unshift(matrix[row][col]);
        }
    }
    return transposed;
}
exports.reverseTranspose = reverseTranspose;

},{}],3:[function(require,module,exports){
"use strict";
// helper for creating a GameTree from a Game, and
// computing the tree to a given lookAhead
function tree(game, lookAhead) {
    if (lookAhead === void 0) { lookAhead = 0; }
    var tree = {
        current: game.initialState
    };
    return computeTree(game, tree, lookAhead);
}
exports.tree = tree;
// compute the tree to the given lookAhead
function computeTree(game, tree, lookAhead) {
    if (lookAhead === void 0) { lookAhead = 0; }
    var current = tree.current;
    if (game.isOver(current.state) || lookAhead === 0) {
        tree.miniMaxScores = {};
        for (var _i = 0, _a = game.players; _i < _a.length; _i++) {
            var player_1 = _a[_i];
            tree.miniMaxScores[player_1] = game.score(current.state, player_1);
        }
        return tree;
    }
    var moves = game.moves(current.state);
    var outcomes = moves.map(function (move) {
        var outcomeState = game.makeMove(current, move);
        var outcomeTree = computeTree(game, { current: outcomeState }, lookAhead - 1);
        return { move: move, outcome: outcomeTree };
    });
    tree.moveOutcomes = outcomes;
    tree.miniMaxScores = {};
    for (var _b = 0, _c = game.players; _b < _c.length; _b++) {
        var player = _c[_b];
        var childScores = outcomes.map(function (outcome) {
            return outcome.outcome.miniMaxScores[player];
        });
        if (current.playerTurn === player) {
            tree.miniMaxScores[player] = Math.max.apply({}, childScores);
        }
        else {
            tree.miniMaxScores[player] = Math.min.apply({}, childScores);
        }
    }
    return tree;
}
exports.computeTree = computeTree;

},{}],4:[function(require,module,exports){
"use strict";
var matrix = require('./matrix');
// a 3x3 TicTacToe game
exports.Game = {
    // there are two players, called 1 and 2
    players: [1, 2],
    // initial state of a Tic-Tac-Toe game (empty board)
    initialState: {
        state: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        playerTurn: 1
    },
    // returns true if the game is over, false otherwise
    isOver: function (board) {
        var won = winner(board);
        if (won !== 0) {
            return true;
        }
        // no winner. check if there are any empty spaces
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === 0) {
                    // found an empty space
                    return false;
                }
            }
        }
        // game board is full
        return true;
    },
    // returns a score for the given player on the given board.
    // returns 1 if the player has won
    // returns -1 if the player has lost
    // returns 0 otherwise
    score: function (board, player) {
        var won = winner(board);
        if (won === 0)
            return 0;
        return won === player ? 1 : -1;
    },
    // returns list of possible moves that could be made
    // on the given board
    moves: function (board) {
        var moveList = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === 0) {
                    moveList.push({ x: row, y: col });
                }
            }
        }
        return moveList;
    },
    // returns a new board with the given move applied
    // to the given board
    makeMove: function (state, move) {
        var m = matrix.clone(state.state);
        m[move.x][move.y] = state.playerTurn;
        return {
            state: m,
            playerTurn: state.playerTurn === 1 ? 2 : 1
        };
    }
};
// helper for identifying the winner of a game
function winner(board) {
    var b = board;
    // check rows
    for (var i = 0; i < 3; i++) {
        if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
            return b[i][0];
        }
    }
    // check columns 
    for (var i = 0; i < 3; i++) {
        if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
            return b[0][i];
        }
    }
    // check diagonals
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] == b[2][2]) {
        return b[0][0];
    }
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] == b[2][0]) {
        return b[0][2];
    }
    // no winner
    return 0;
}
exports.winner = winner;

},{"./matrix":2}]},{},[1]);
