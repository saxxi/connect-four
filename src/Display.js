module.exports = {
  drawBoard: function (game) {
    var board = [];
    for (var i = 0; i < game.rows; i++) {
      board[i] = [];
      for (var j = 0; j < game.cols; j++) board[i][j] = '.';
    }

    for (var k in game.board) {
      if (game.board.hasOwnProperty(k)) {
        var coords = k.split(':');
        var x = game.rows - parseInt(coords[1]) - 1;
        var y = parseInt(coords[0]);
        board[x][y] = game.board[k];
      }
    }

    for (var i = 0; i < game.rows; i++) {
      var row = "";
      for (var j = 0; j < game.cols; j++) {
        row += " " + board[i][j] + " ";
      }
      console.log(row);
    }
  }
}
