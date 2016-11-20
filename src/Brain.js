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
  var cellBits = 2;
  var totalInputs = Display.rows * Display.cols * cellBits;
  var outputs = Display.cols; // position to play, ie. row 1..7
  var hidden = totalInputs * .8 | 0;
  this.LSTM = new Architect.LSTM(totalInputs, hidden, outputs);
}

Brain.prototype.calcNextMove = function (board) {
  return this.calcRandomMove();
};

Brain.prototype.calcRandomMove = function () {
  var v = RNG.nextRange(1, Display.cols);
  // console.log('calcRandomMove', v);
  return v;
};

Brain.prototype.badMove = function (move) {
  // TODO: continue here
};

module.exports = Brain;
