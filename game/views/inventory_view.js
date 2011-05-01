var InventoryView = function(game_view, inventory) {
  $.extend(this.__proto__, TableView);

  this.inventory = inventory;
  this.data_source = inventory;
  this.parent = game_view;
  this.canvas = new Raphael(this.x(180), this.y(40), 300, 300);
  this.canvas.defaultCustomAttributes()
  this.game_view = game_view;
  this.canvas.onMouseDown = this.mouseDown;
  this.canvas.onMouseUp = this.mouseUp;
  this.selected = false;
  this.redraw();
};

InventoryView.prototype.x = function(other) {
  return this.parent.canvas.canvas.offsetLeft + other;
}
InventoryView.prototype.y = function(other) {
  return this.parent.canvas.canvas.offsetTop + other;
}
InventoryView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.canvas.clear();
  this.canvas.fillBackground('#eee');
  
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
