'use strict';

var synaptic = require('synaptic');
var Display = require('./Display');
var RNG = require('./RNG');

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var Brain = function () {
  // this.learningRate = .17;
  this.learningRate = .6;

  var cellBits = 2;
  var totalInputs = Display.rows * Display.cols * cellBits;
  var outputs = Display.cols; // position to play, ie. row 1..7
  var hidden = 7; // totalInputs * .8 | 0;
  var LSTM = new Architect.LSTM(totalInputs, hidden, outputs);
  this.net = LSTM.trainer.network;
}

Brain.prototype.calcNextMove = function (board) {
  var inputBits = Display.board2Bits(board)
  var moveBits = this.net.activate(inputBits);
  console.log(inputBits.join(''), 'activate');
  console.log(moveBits.join(' '), inputBits.length);
  if (moveBits.join(' ') == 'NaN NaN NaN NaN NaN NaN NaN') throw "BAD_AI_OUTPUT";
  return Display.indexOfMax(moveBits) + 1;
};

Brain.prototype.calcRandomMove = function () {
  var v = RNG.nextRange(1, Display.cols);
  console.log(v);
  // console.log('calcRandomMove', v);
  return v;
};

Brain.prototype.badMove = function (player) {
  console.log(Display.player2Bits(player), 'propagate');
  this.net.propagate(this.learningRate, Display.player2Bits(player));
};

module.exports = Brain;
