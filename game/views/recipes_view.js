var RecipesView = function(game_view, player) {
  $.extend(this.__proto__, TKView);
  $.extend(this.__proto__, TableView);

  this.game_view = game_view;
  this.parent = game_view;
  this.game = game;

  this.canvas = new Raphael(this.x(180), this.y(70), 400, 400);
  this.canvas.defaultCustomAttributes();

};
RecipesView.prototype.data_source = function() {
  var recipes = [];
  for(r in this.game.player.recipes) {
    if(this.game.player.recipes[r].requirements.length == 0) { recipes.push(this.game.player.recipes[r]); }
  }
  return recipes;
}

RecipesView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();
  this.renderTable(this.renderChildren);
};
RecipesView.prototype.show = RecipesView.prototype.redraw

RecipesView.prototype.renderChildren = function(row, item) {
  var color = {'fill': '#080'}
  row.attr(color)
  var children = item.children();
  var pos_y = row.getBBox().y;
  var last = row;
  var x = last.getBBox().x+20;
  var y;
  for (c in children) {
    y = last.getBBox().y + last.getBBox().height;
    last = this.renderRow(children[c], x, y);
    if(children[c].satisfied) {
      last.attr(color)
      last = this.renderChildren(last, children[c]);
    }
  }
  return last;
}
