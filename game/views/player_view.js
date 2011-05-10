var PlayerView = function(game_view, player) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;
  this.player = player;

  this.canvas = new Raphael(this.x(20), this.y(70), 140, 130);
  this.canvas.defaultCustomAttributes();

  this.redraw();
}

PlayerView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();
  var y = 10;
  var x = this.canvas.width-15;
  var smallfont = {'font-size': '11px', 'text-anchor': 'end'};
  this.canvas.text(this.canvas.width/2, y, this.player.name).defaults({'text-anchor': 'middle'}).reposition();
  this.canvas.path("M10 35L" + x+5 + " 35");
  y+= 40;
  this.canvas.text(x, y, 'Balance: ' + this.player.money + '£').defaults({'font-size': '14px', 'text-anchor': 'end'});
  y += 15;
  if(this.player.lastSale) {
    this.canvas.text(x, y, (this.player.lastSale[0].substring(0,18) + (this.player.lastSale[1] > 0 ? ': +' : ': ') + this.player.lastSale[1] + '£')).defaults(smallfont);
    this.player.lastSale = false;
  }
  y += 20;
  var i = this.player.inventory.ingredientsValue();
  var p = this.player.inventory.productsValue()
  this.canvas.text(x, y, 'Ingredients: ' + i + '£').defaults(smallfont)
  y += 15;
  this.canvas.text(x, y, 'Products: ' + p + '£').defaults(smallfont)
  y += 15;
  this.canvas.text(x, y, 'Total: ' + (i+p) + '£').defaults(smallfont)
}