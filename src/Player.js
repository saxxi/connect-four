var Brain = require('./Brain');

var Player = function(mark) {
  this.brain = new Brain();
  this.game = null;
  this.mark = mark; // ie. X | O
  this.moves = 0;
  this.sameMoves = 0;
}

Player.prototype.calcNextMove = function () {
  return this.brain.calcNextMove(this.game.board);
};

Player.prototype.playRandom = function (game) {
  this.game = game;
  var move = this.brain.calcRandomMove();
  while (!this.game.validMove(move)) {
    this.brain.badMove(move);
    move = this.brain.calcRandomMove();
  }
  this.game.play(this.mark, move);
};

Player.prototype.play = function (game) {
  this.game = game;
  this.moves += 1;

  var move = this.calcNextMove();
  while (!this.game.validMove(move)) {
    this.brain.badMove(move);
    this.sameMoves++;
    if (this.sameMoves >= 8) {
      this.sameMoves = 0;
      move = this.brain.calcRandomMove();
    } else {
      move = this.calcNextMove();
    }
  }

  if (this.game.validMove(move)) {
    this.game.play(this.mark, move);

    if (this.game.winner != null && this.game.winner != this.mark) {
      this.brain.badMove(move);
    }
  };
};

module.exports = Player;
