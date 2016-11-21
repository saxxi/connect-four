'use strict';

var Game = require('connect-four');
var Display = require('./src/Display');
var Player = require('./src/Player');
var playerX = new Player('X');
var playerO = new Player('O');
var players = [playerX, playerO];
var i = 0;

function playGame() {
  var game = new Game();
  var turn = 0;

  while (!game.ended) {

    if (turn == 1 && i % 4 && i < 50000) {
      players[turn].playRandom(game);
    } else {
      players[turn].play(game);
    }

    turn = turn == 0 ? 1 : 0; // swap turns
    i++;
  }

  return game;
}

for (var i = 0; i < 100000; i++) {
  var game = playGame();
  console.log(Display.drawBoard(game.board));

  if (game.winner) {
    console.log('');
    console.log(i, " Winner is ", game.winner);
  }
}

console.log('End of training!');
