
var board = new Board();

var dan = new Player("dan");

var minicat = new Player("minicat");

board.addPlayer(dan);

board.addPlayer(minicat);

var view = new BoardView(board);

$("#game").append(view.render().$el);
