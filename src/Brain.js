var synaptic = require('synaptic');
var Display = require('./Display');

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
  var inputBits = Display.board2Bits(board).join()

  return Math.round(Math.random() * Display.cols + 1);
  // return this.LSTM.activate(inputBits);
};

Brain.prototype.badMove = function (move) {
  // TODO: continue here
};

module.exports = Brain;
