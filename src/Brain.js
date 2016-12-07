'use strict';

var Architect = require('synaptic').Architect;
var Display = require('./Display');
var RNG = require('./RNG');

var Brain = function () {
  this.learningRate = .17;

  var cellBits = 2;
  var totalInputs = Display.rows * Display.cols * cellBits;
  var outputs = Display.cols; // position to play, ie. row 1..7
  var hidden = totalInputs * .8 | 0;
  var LSTM = new Architect.LSTM(totalInputs, hidden, outputs);
  this.net = LSTM.trainer.network;
}

Brain.prototype.calcNextMove = function (board) {
  var inputBits = Display.board2Bits(board)
  // console.log(inputBits.join(''), 'activate');
  var moveBits = this.net.activate(inputBits);
  // console.log(moveBits.join(' '), inputBits.length);
  return Display.indexOfMax(moveBits) + 1;
};

Brain.prototype.calcRandomMove = function () {
  var randomMove = RNG.nextRange(1, Display.cols);
  // console.log('calcRandomMove', randomMove);
  return randomMove;
};

Brain.prototype.badMove = function (lastPlay) {
  // console.log(Display.play2Bits(lastPlay), lastPlay, 'propagate');
  this.net.propagate(this.learningRate, Display.play2Bits(lastPlay));
};

module.exports = Brain;
