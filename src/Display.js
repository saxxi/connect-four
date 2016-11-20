module.exports = {

  rows: 6,
  cols: 7,

  // eg. Output: [ [X, ., .],
  //               [., O, .],
  //               [., ., X] ]
  getBoard: function (gameBoard) {
    var board = [];
    for (var i = 0; i < this.rows; i++) {
      board[i] = [];
      for (var j = 0; j < this.cols; j++) board[i][j] = '.';
    }
    for (var k in gameBoard) {
      if (gameBoard.hasOwnProperty(k)) {
        var coords = k.split(':');
        var x = this.rows - parseInt(coords[1]) - 1;
        var y = parseInt(coords[0]);
        board[x][y] = gameBoard[k];
      }
    }
    return board;
  },

  drawBoard: function (gameBoard) {
    var board = this.getBoard(gameBoard);

    for (var i = 0; i < board.length; i++) {
      var row = "";
      for (var j = 0; j < board[i].length; j++) {
        row += " " + board[i][j] + " ";
      }
    }
    console.log(board);
  },

  // eg. Input: [ [X, ., .],
  //              [., O, .],
  //              [., ., X] ]
  //
  // So: [ [1,0], [0,0], [0,0],
  //       [0,0], [0,1], [0,0],
  //       [0,0], [0,0], [1,0] ]
  //
  // Output: [1,0, 0,0, 0,0, 0,0, 0,1, 0,0, 0,0, 0,0, 1,0]
  board2Bits: function (board) {
    var bits = [];
    var board = this.getBoard(board);

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        var cell = this.player2Bits(board[i][j]);
        bits.push.apply(bits, cell);
      }
    }
    return bits;
  },

  inactiveBoardBits: function (cellBits) {
    bits = '';
    for (var i = 0; i < this.rows * this.cols * cellBits.length - 1; i++) {
      bits += '0';
    }
    return bits + '1';
  },

  player2Bits: function (cell) {
    if (cell == 'X') {
      return [1, 0];
    } else if (cell == 'O') {
      return [0, 1];
    } else {
      return [0, 0];
    }
  },

  indexOfMax: function (arr) {
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  },

}
