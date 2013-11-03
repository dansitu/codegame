var BoardView = Backbone.View.extend({

  tagName: "table",

  className: "game-table",

  initialize: function(board) {

    this.board = board;

    this.board.on("update", this.render, this);
  
  },

  render: function() {

    this.$el.empty();

    for(var r=0; r<this.board.size; r++) {
    
      var row = $("<tr></tr>");

      this.$el.append(row);

      for(var c=0; c<this.board.size; c++) {
        
        var cell = $("<td></td>");

        row.append(cell);

        var item = this.board.getCellContents([r,c]);

        if(item instanceof Player) {
          cell.append("<div class='player'>"+item.name+"</div>");
        } else if(item instanceof Trail) {
          cell.append("<div class='trail'>"+item.player.name+"</div>");
        }

      }

    }

    return this;
  
  }

});

var CodeView = Backbone.View.extend({
  className: "code-area",

  model: CodeModel,

  events: {
    "input textarea": "updateSource"
  },

  initialize: function(){
  },

  render: function(){

    this.$el.html("<textarea>"+this.model.get("source")+"</textarea>");

    return this;
  
  },

  updateSource: function(e){
    console.log("updating source");
    this.model.set("source", this.$('textarea').val());
  }

});
