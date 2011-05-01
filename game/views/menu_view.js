var MenuView = function(game_view) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;

  this.canvas = new Raphael(this.x(20), this.y(10), 600, 30);
  this.canvas.defaultCustomAttributes();

  this.redraw();
}
MenuView.prototype.redraw = function() {
  var l = this.canvas.text(5, 5, 'Inventory').default({parent: this}).click(this.showInventory);
  l = this.canvas.text(this.leftMargin(l) + 20, 5, 'Heroes').default({parent: this}).click(this.showHeroes);
}

MenuView.prototype.leftMargin = function(l) {
  return l[0].offsetLeft + l[0].offsetWidth
}
MenuView.prototype.showInventory = function(event) {
  this.attrs.parent.show('inventory');
}
MenuView.prototype.showHeroes = function(event) {
  this.attrs.parent.show('heroes');
}
MenuView.prototype.show = function(tab) {
  $(this.game_view.tabs).hide();
  this.game_view.showView(tab);
}
