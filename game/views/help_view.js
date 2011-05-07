var HelpView = function(game_view) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;

  this.canvas = new Raphael(this.x(180), this.y(70), 400, 400);
  this.canvas.defaultCustomAttributes();
  

};
HelpView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#eee').opaque(0.8);

  var t = this.canvas.text(20,20, "In the menu can switch from the two areas of the game,\nthe inventory where you can combine your materials\nto produce new items and the customers area where\nyou see the heroes who want to buy your products.").defaults().reposition();

};
HelpView.prototype.show = HelpView.prototype.redraw;
