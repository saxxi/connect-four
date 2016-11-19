var synaptic = require('synaptic');

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var Brain = function (board, inputRows) {
  var totalInputs = ;
  var outputs = inputRows; // position to play, ie. row 1..7
  var hidden = totalInputs * .8 | 0;

  this.LSTM = new Architect.LSTM(totalInputs, hidden, outputs);

  Train(this.LSTM);
}

Brain.prototype.activate = function (board) {
  return this.LSTM.activate(board);
};

module.exports = Brain;
