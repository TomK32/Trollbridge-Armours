var InventoryView = function(game_view, inventory) {
  $.extend(this.__proto__, TKView);
  $.extend(this.__proto__, TableView);

  this.inventory = inventory;
  this.data_source = inventory;
  this.parent = game_view;
  this.canvas = new Raphael(this.x(180), this.y(70), 320, 400);
  this.canvas.defaultCustomAttributes()
  this.game_view = game_view;

  this.redraw();
};

InventoryView.prototype.show = function() {
  this.game_view.workbench_view.reset();
  this.redraw();
}
InventoryView.prototype.redraw = function(clean) {
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
