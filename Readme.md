# TicTac.ts

A Tic-Tac-Toe solver in Typescript, using the
[minimax algorithm](https://en.wikipedia.org/wiki/Minimax).

[See demo here](https://apeace.github.io/tictac.ts/)

# Dev setup

Note that you do not need anything installed globally except Node and NPM.

```
npm install
npm run bundle
npm start
open 'http://localhost:8000'
```

While developing, you may want to run these:

```
# in one terminal window
npm run build-watch

# in another terminal window
npm run test-watch

# in another terminal window
npm run bundle-watch
```

# Progress

Right now I have a playable 3x3 Tic-Tac-Toe game (see demo link above). Work is still
in progress to be able to play **K-in-a-row** on an **NxN** board.

Motivation for this was just to learn about minimax and play with Typescript :)

TODO:

 - [Alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
 - Factor some logic out of UI code (e.g. choosing the best move should be in the minimax module)
 - K-in-a-row on NxN board
 - Nicer UI
 - Factor out minimax to its own repo
