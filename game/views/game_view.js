
var GameView = function(target, game) {
  this.game = game;
  this.canvas = new Raphael(target, 900, 600);
  this.canvas.defaultCustomAttributes()

  this.inventory_view = new InventoryView(this, this.game.inventory);
  this.workbench_view = new WorkbenchView(this);
  this.heroes_view = new HeroesView(this, game.heroes);

  this.menu_view = new MenuView(this);
  this.tabs = [this.inventory_view.canvas.canvas, this.workbench_view.canvas.canvas,
    this.heroes_view.canvas.canvas];
  $(this.tabs).hide();
  this.showView('inventory');
  this.redraw();
};

GameView.prototype.showView = function(view) {
  $(this[view + '_view'].canvas.canvas).show();
  this[view + '_view'].redraw();
}
GameView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.image('images/shop.png', 0,0, 900, 600);

  this.canvas.text(this.canvas.canvas.offsetWidth-15, 15, 'v' + Game.version).default({'text-anchor': 'end'});
  this.inventory_view.redraw();
  this.workbench_view.redraw();
};


GameView.prototype.selectIngredient = function(item) {
  var inventory_item = this.inventory_view.inventory.find(item, 0);
  var workbench_item = this.workbench_view.inventory.find(item, 0);
  // cut item.amount down to the max we can
  if (workbench_item && (item.amount + workbench_item.amount) >= inventory_item.amount) {
      item.amount =  inventory_item.amount - workbench_item.amount;
  }
  this.workbench_view.inventory.add(item);
  this.redraw();
}
Tools = {};
Tools.font_regular = function() { this.font('400 13px sans-serif'); }
Tools.font_strong  = function() { this.font('800 13px sans-serif'); }
