var PlayerView = function(game_view, player) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;
  this.player = player;

  this.canvas = new Raphael(this.x(30), this.y(70), 120, 90);
  this.canvas.defaultCustomAttributes();

  this.redraw();
}

PlayerView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();

  this.canvas.text(this.canvas.width/2, 20, this.player.name).default({'text-anchor': 'middle'});
  this.canvas.path("M10 35L" + (this.canvas.width-10) + " 35");
  this.canvas.text(10, 50, 'Balance: £' + this.player.money).default({'font-size': '14px'});
}