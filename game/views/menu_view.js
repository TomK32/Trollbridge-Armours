var MenuView = function(game_view) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;

  this.canvas = new Raphael(this.x(20), this.y(10), 600, 30);
  this.canvas.defaultCustomAttributes();

  this.menu_items = [];

  this.redraw();
}
MenuView.prototype.redraw = function() {
  this.menu_items = [];
  this.menu_items.push(this.canvas.text(5, 5, 'Inventory').default({parent: this}).click(this.showInventory)[0]);
  this.menu_items.push(this.canvas.text(this.leftMargin(this.menu_items.slice(-1,1)) + 20, 5, 'Heroes').default({parent: this}).click(this.showHeroes)[0]);
}

MenuView.prototype.leftMargin = function(l) {
  return l[0].offsetLeft + l[0].offsetWidth
}
MenuView.prototype.showInventory = function(event) {
  this.attrs.parent.show(event, 'inventory');
}
MenuView.prototype.showHeroes = function(event) {
  this.attrs.parent.show(event, 'heroes');
}
MenuView.prototype.show = function(event, tab) {
  $(this.menu_items).each(function(i,e){ $(e).css('font-weight', 'normal') });
  $(event.target).parent().css('font-weight', 'bold');
  $(this.game_view.tabs).hide();
  this.game_view.showView(tab);
}
