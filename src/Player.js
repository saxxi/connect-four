var Player = function(game, mark) {
  this.game = game;
  this.mark = mark; // ie. X | O
  this.moves = 0;
}

Player.prototype.calcNextMove = function () {
  // TODO: AI - Activate net
  return Math.round(Math.random() * this.game.cols + 1);
};

Player.prototype.play = function () {
  this.moves += 1;

  var move = this.calcNextMove();
  while (!this.game.validMove(move)) {
    // TODO: AI - Propagate error
    move = this.calcNextMove();
  }

  if (this.game.validMove(move)) {
    this.game.play(this.mark, move);
  };
};

Player.prototype.gameEnded = function () {
  if (this.game.winner != null && this.game.winner != this.mark) {
    // TODO: AI - Propagate error
  }
};

module.exports = Player;
