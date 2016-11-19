'use strict';

var Game = require('connect-four');
var Display = require('./src/Display');
var Player = require('./src/Player');
var playerX = new Player('X');
var playerO = new Player('O');
var players = [playerX, playerO];

function playGame() {
  var game = new Game();
  var turn = 0;

  while (!game.ended) {
    players[turn].play(game);
    turn = turn == 0 ? 1 : 0; // swap turns
  }

  playerX.gameEnded();
  playerO.gameEnded();
  return game;
}

for (var i = 0; i < 10000; i++) {
  var game = playGame();
  // Display.drawBoard(game);

  if (game.winner) {
    console.log("Winner is ", game.winner);
  } else {
    console.log("Draw!");
  }
}
