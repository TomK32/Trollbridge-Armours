var InventoryView = function(game_view, canvas, inventory) {
  $.extend(this.__proto__, TableView);

  this.inventory = inventory;
  this.data_source = inventory;
  this.canvas = canvas.createLayerAt('inventory', 20, 0, 500, canvas.height-200, 10, this.redraw, 1, true);
  this.canvas.parent = this;
  this.game_view = game_view;
  this.canvas.onMouseDown = this.mouseDown;
  this.canvas.onMouseUp = this.mouseUp;
  this.selected = false;
};

InventoryView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.clear();
  this.font_regular();
  this.fillColor('#fff');
  this.fillRect(0, 0, this.width, this.height);
  this.fillColor('#000');

  if(this.parent) {
    this.parent.renderTable();
  }
};

InventoryView.prototype.selectRow = function(row) {
  if(this.selected) { return true; }
  var item = this.data_source.items[row];
  // TODO amount_available < 1
  if(!item || item.amount < 1) { return false; }
  this.selected = true;
  // new selection
  var item_clone = jQuery.extend(true, {}, item);
  item_clone.amount = 1;
  this.game_view.selectIngredient(item_clone);
};
