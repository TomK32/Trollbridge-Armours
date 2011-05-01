var HeroesView = function(game_view) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;

  this.canvas = new Raphael(this.x(180), this.y(40), 300, 300);
  this.canvas.defaultCustomAttributes();

  this.redraw();
}

HeroesView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#eee');

}
