# TicTac.ts

A Tic-Tac-Toe solver in Typescript, using the
[minimax algorithm](https://en.wikipedia.org/wiki/Minimax).

[See demo here](https://apeace.github.io/tictac.ts/)

# Dev setup

Note that you do not need anything installed globally except Node and NPM.

```
npm install
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

# License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to [http://unlicense.org/](http://unlicense.org/)

