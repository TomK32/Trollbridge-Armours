var RecipesView = function(game_view, player) {
  $.extend(this.__proto__, TKView);
  $.extend(this.__proto__, TableView);

  this.game_view = game_view;
  this.parent = game_view;
  this.player = player;

  this.canvas = new Raphael(this.x(180), this.y(70), 400, 400);
  this.canvas.defaultCustomAttributes();

  this.redraw();
};
RecipesView.prototype.data_source = function() {
  return this.player.recipes;
}

RecipesView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();
  this.renderTable();
};