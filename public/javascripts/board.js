var Board = function(){

  var self = this;

  self.size = 8;

  self.moves = 4;

  self.players = [];

  self.columns = [];

  for(var r=0; r < self.size; r++) {
    self.columns.push(new Array(self.size));
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

  self.players.push(player);

  player.board = self;

  self.addPlayerAtLocation(playerLocation, player);

}

Board.prototype.movePlayer = function(player, direction){

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

  if(newCoords[0] < 0
      || newCoords[0] >= this.size
      || newCoords[1] < 0
      || newCoords[1] >= this.size) {
    player.trigger("out-of-bounds", direction);
    return;
  }

  this.setCellContents(player.location, new Trail(player));

  this.addPlayerAtLocation(newCoords, player);

  this.trigger("update");

}

Board.prototype.addPlayerAtLocation = function(coords, player) {

  var square = this.getCellContents(coords);

  if(square instanceof Trail
    && square.player !== player) {
    player.trigger("hit_trail", square);
  }

  if(square instanceof Player) {
    player.trigger("hit_player", square);
    alert(player.name + " killed " + square.name);
  }

  this.setCellContents(coords, player);

  player.location = coords;

}

Board.prototype.getCellContents = function(coords) {

  return this.columns[coords[0]][coords[1]];

}

Board.prototype.setCellContents = function(coords, contents) {
  this.columns[coords[0]][coords[1]] = contents;
}

Board.prototype.getSurroundings = function(coords) {

  var upIndex = coords[1] - 1;
  var rightIndex = coords[0] + 1;
  var downIndex = coords[1] + 1;
  var leftIndex = coords[0] - 1;

  var up = upIndex > -1 ? this.getCellContents([coords[0],upIndex]) : null;
  var right = rightIndex < this.size ? this.getCellContents([rightIndex,coords[1]]) : null;
  var down = downIndex < this.size ? this.getCellContents([coords[0],downIndex]) : null;
  var left = leftIndex > -1 ? this.getCellContents([leftIndex,coords[1]]) : null;

  return [up, right, down, left]

}

Board.prototype.playTurn = function(){

  // this.moves moves per player
  for(var move = 1; move <= this.moves*2; move++) {
    var mod = move%2;
    this.players[mod].makeMove(mod ? ((move-mod)/2)+1 : move/2);
  }

}

var Player = function(name){

  var self = this;

  self.name = name;

  self.location = null;

  self.board = null;

  self.code = new CodeModel();

}

_.extend(Player.prototype, Backbone.Events);

Player.prototype.move = function(direction){

  this.board.movePlayer(this, direction);

}

Player.prototype.makeMove = function(moveNumber){

  var surroundingsArray = this.board.getSurroundings(this.location);

  var parameters = [this, moveNumber, surroundingsArray];

  var result = this.code.execute(parameters);

  return result;

}

var Trail = function(player) {

  var self = this;

  self.player = player;

}
