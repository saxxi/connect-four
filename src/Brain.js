var synaptic = require('synaptic');

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var Brain = function () {
  var rows = 6;
  var cols = 7;

  var totalInputs = rows * cols;
  var outputs = cols; // position to play, ie. row 1..7
  var hidden = totalInputs * .8 | 0;
  this.LSTM = new Architect.LSTM(totalInputs, hidden, outputs);

  // Train(this.LSTM);
}

Brain.prototype.calcNextMove = function (board) {
  var cols = 7
  return Math.round(Math.random() * cols + 1);
  // return this.LSTM.activate(board);
};

module.exports = Brain;
