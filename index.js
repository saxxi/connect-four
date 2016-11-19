'use strict';

var Game = require('connect-four');
var game = new Game();

var Player = require('./src/Player');
var playerX = new Player(game, 'X');
var playerO = new Player(game, 'O');

var players = [playerX, playerO];
var playing = true;
var turn = 0;

while (!game.ended) {
  console.log('\n\n\n\n');
  players[turn].play();
  drawBoard(game);
  swapTurns();
}

if (game.winner) {
  console.log("Winner is ", game.winner);
} else {
  console.log("Draw!");
}

playerX.gameEnded();
playerO.gameEnded();

function swapTurns() {
  turn = turn == 0 ? 1 : 0;
}

function drawBoard(game) {
  var board = [];
  for (var i = 0; i < game.rows; i++) {
    board[i] = [];
    for (var j = 0; j < game.cols; j++) board[i][j] = '.';
  }

  for (var k in game.board) {
    if (game.board.hasOwnProperty(k)) {
      var coords = k.split(':');
      var x = game.rows - parseInt(coords[1]) - 1;
      var y = parseInt(coords[0]);
      board[x][y] = game.board[k];
    }
  }

  for (var i = 0; i < game.rows; i++) {
    var row = "";
    for (var j = 0; j < game.cols; j++) {
      row += " " + board[i][j] + " ";
    }
    console.log(row);
  }
}
