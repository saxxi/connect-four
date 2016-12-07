var Brain = require('./Brain');

var Display = require('./Display');

var Player = function(mark) {
  this.brain = new Brain();
  this.game = null;
  this.mark = mark; // ie. X | O
  this.moves = 0;
  this.sameMoves = 0;
  this.prevMove = -1;
}

Player.prototype.calcNextMove = function () {
  return this.brain.calcNextMove(this.game.board);
};

Player.prototype.playRandom = function (game) {
  this.game = game;
  var move = this.brain.calcRandomMove();
  while (!this.game.validMove(move)) {
    this.brain.badMove(move);
    // console.log('player playing randomly', move);
    move = this.brain.calcRandomMove();
  }
  this.game.play(this.mark, move);
};

Player.prototype.play = function (game) {
  this.game = game;
  this.moves += 1;

  var move = this.calcNextMove();
  while (!this.game.validMove(move)) {
    this.brain.badMove(this.mark);

    this.sameMoves++;
    if (this.sameMoves >= 8) { // Too many times trying, maybe sth wrong
      move = this.brain.calcRandomMove();
      if (this.prevMove == move) {
        this.game.ended = true;
        return;
      };
      this.sameMoves = 0;

    } else {
      move = this.brain.calcNextMove(this.game.board);
    }
  }

  this.prevMove = move;

  if (this.game.validMove(move)) {
    this.game.play(this.mark, move);

    if (this.game.winner != null && this.game.winner != this.mark) {
      this.brain.badMove(this.mark);
    }
  };
};

module.exports = Player;
