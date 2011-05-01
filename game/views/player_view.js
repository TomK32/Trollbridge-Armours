var PlayerView = function(game_view, player) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;
  this.player = player;

  this.canvas = new Raphael(this.x(20), this.y(70), 140, 90);
  this.canvas.defaultCustomAttributes();

  this.redraw();
}

PlayerView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();

  var e = this.canvas.width-10;
  this.canvas.text(this.canvas.width/2, 10, this.player.name).default({'text-anchor': 'middle'}).reposition();
  this.canvas.path("M10 35L" + e + " 35");
  this.canvas.text(e-5, 50, 'Balance: ' + this.player.money + '£').default({'font-size': '14px', 'text-anchor': 'end'});
  if(this.player.lastSale) {
    this.canvas.text(e-5, 70, (this.player.lastSale[0].substring(0,18) + (this.player.lastSale[1] > 0 ? ': +' : ': ') + this.player.lastSale[1] + '£')).default({'font-size': '11px', 'text-anchor': 'end'});
    this.player.lastSale = false;
  }
}