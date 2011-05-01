var MenuView = function(game_view) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;

  this.canvas = new Raphael(this.x(20), this.y(10), this.parent.canvas.canvas.offsetWidth, 30);
  this.canvas.defaultCustomAttributes();

  this.menu_items = [];
  this.first = false;

  this.redraw();
}
MenuView.prototype.redraw = function() {
  this.canvas.clear();
  this.menu_items = [];
  this.menu_items.push(this.canvas.text(5, 5, 'Workshop').default({parent: this}).link(this.showInventory)[0]);
  this.menu_items.push(this.canvas.text(this.leftMargin(this.menu_items.slice(-1)) + 20, 5, 'Customers').default({parent: this}).link(this.showHeroes)[0]);
  this.menu_items.push(this.canvas.text(this.leftMargin(this.menu_items.slice(-1)) + 20, 5, 'Recipes').default({parent: this}).link(this.showRecipes)[0]);
  this.first = this.canvas.text(this.canvas.canvas.offsetWidth-90, 5, 'Help')
      .default({'text-anchor': 'end', parent: this}).link(this.showHelp);
  this.menu_items.push(this.first);
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
MenuView.prototype.showRecipes = function(event) {
  this.attrs.parent.show(event, 'recipes');
}
MenuView.prototype.showHelp = function(event) {
  this.attrs.parent.show(event, 'help');
}

MenuView.prototype.show = function(event, tab) {
  $(this.menu_items).each(function(i,e){ $(e).css('font-weight', 'normal') });
  var e = (event) ? $(event.target).parent() : (this ? this.first.node : false);
  if(e) { $(e).css('font-weight', 'bold'); }
  $(this.game_view.tabs).hide();
  this.game_view.showView(tab);
}
