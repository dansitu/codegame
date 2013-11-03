
var board = new Board();

var dan = new Player("dan");

var minicat = new Player("minicat");

board.addPlayer(dan);

board.addPlayer(minicat);

var view = new BoardView(board);

$("#game").append(view.render().$el);

var danCode = new CodeView({model: dan.code});
$("#player1").append(danCode.render().$el);

var minicatCode = new CodeView({model: minicat.code});
$("#player2").append(minicatCode.render().$el);

$("#go").click(function(){
  board.playTurn();
});
