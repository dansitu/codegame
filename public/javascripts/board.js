var Board = function(){

  var self = this;

  self.size = 8;

  self.players = [];

  self.columns = [];

  for(var r=0; r < self.size; r++) {
    var row = [];
    for(var c=0;c<self.size;c++) {
      row.push([]);
    }
    self.columns.push(row);
  }

}

_.extend(Board.prototype, Backbone.Events);

Board.prototype.addPlayer = function(player){

  var self = this;

  var playerLocation = null;

  if(self.players.length === 0) {
    playerLocation = [0,0];
  } else if (self.players.length === 1) {
    playerLocation = [self.size-1,self.size-1];
  } else {
    throw "Too many players already."
  }

  player.location = playerLocation;

  self.players.push(player);

  player.board = self;

  self.addPlayerAtLocation(player);

}

Board.prototype.movePlayer = function(player, direction){

  var square = this.columns[player.location[0]][player.location[1]];

  var index = square.indexOf(player);

  square.splice(index, 1);

  square.push(new Trail(player));

  var newCoords = player.location.slice();

  switch(direction) {
    case "up":
      newCoords[0] = player.location[0] - 1;
      break;
    case "right":
      newCoords[1] = player.location[1] + 1;
      break;
    case "down":
      newCoords[0] = player.location[0] + 1;
      break;
    case "left":
      newCoords[1] = player.location[1] - 1;
      break;
    default:
      throw "Invalid direction " + direction;
  }

  player.location = newCoords;

  this.addPlayerAtLocation(player);

  this.trigger("update");

}

Board.prototype.addPlayerAtLocation = function(player) {

  var square = this.columns[player.location[0]][player.location[1]];

  square.push(player);

}

Board.prototype.getCellContents = function(coords) {

  return this.columns[coords[0]][coords[1]];
}

var Player = function(name){

  var self = this;

  self.name = name;

  self.location = null;

  self.board = null;

}

Player.prototype.move = function(direction){

  this.board.movePlayer(this, direction);

}

var Trail = function(player) {

  var self = this;

  self.player = player;

}
