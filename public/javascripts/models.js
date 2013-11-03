var CodeModel = Backbone.Model.extend({

  defaults: {
    source: "function(player,move,up,right,down,left){\n\n\n}"
  },

  getFunction: function(){

    try {
      var funcObj = eval("("+this.get("source")+")");
      return funcObj;
    } catch (ex) {
      console.log("Exception during function interpretation");
      console.log(ex);
      this.trigger("function-invalid")
      return null;
    }

  },

  execute: function(parameters){
    
    var func = this.getFunction();

    if(func) {
      try {
        func.apply(null, parameters);
        return true;
      } catch(ex){
        console.log("Exception during function");
        console.log(ex);
        this.trigger("function-exception");
      }
    }

    return false;
  
  }

});
