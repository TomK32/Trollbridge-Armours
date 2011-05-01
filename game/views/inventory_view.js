var InventoryView = function(game_view, inventory) {
  $.extend(this.__proto__, TKView);
  $.extend(this.__proto__, TableView);

  this.inventory = inventory;
  this.data_source = inventory;
  this.parent = game_view;
  this.canvas = new Raphael(this.x(180), this.y(70), 400, 400);
  this.canvas.defaultCustomAttributes()
  this.game_view = game_view;

  this.redraw();
};

InventoryView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#eee').opaque();

  this.renderTable();
};

InventoryView.prototype.selectRow = function(event) {
  var row = this.attrs.row;
  var p = this.attrs.parent;
  var item = p.data_source.items[row];
  // TODO amount_available < 1
  if(!item || item.amount < 1) { return false; }
  p.game_view.showView('workbench');
  // new selection
  var item_clone = jQuery.extend(true, {}, item);
  item_clone.amount = 1;
  p.game_view.selectIngredient(item_clone);
};

var HeroInventoryView = function(hero_view, hero) {
  $.extend(this.__proto__, InventoryView);
  $.extend(this.__proto__, TableView);
  $.extend(this.__proto__, TKView);

  this.inventory = hero.inventory;
  this.data_source = this.inventory;
  this.hero_view = hero_view;
  this.hero = hero;
  this.game_view = hero_view.game_view;
  this.parent = hero_view;
  this.canvas = new Raphael(this.x(0), this.y(0), this.parentWidth(), this.parentWidth());
  this.canvas.defaultCustomAttributes()

  this.tableOffsetTop = 70;
  this.tableOffsetLeft = 136;

  this.redraw();
};

HeroInventoryView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#eee').opaque();
  this.renderTable();
  this.canvas.image('images/heroes/' + this.hero.image, 4, 4, 128, 128);
  this.canvas.text(142, 20, this.hero.name).default();

};

HeroInventoryView.prototype.selectRow = function(event) {
  // TODO
};
