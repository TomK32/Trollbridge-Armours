WorkbenchView = function(game_view) {
  $.extend(this.__proto__, TableView);

  this.parent = game_view;
  this.canvas = new Raphael(this.x(520), this.y(40), 240, 300);
  this.canvas.defaultCustomAttributes()
  this.game_view = game_view;
  this.inventory = new Inventory();
  this.data_source = this.inventory;
  this.redraw();
  this.tableOffsetTop = 50;
};

WorkbenchView.prototype.x = function(other) {
  return this.parent.canvas.canvas.offsetLeft + other;
}
WorkbenchView.prototype.y = function(other) {
  return this.parent.canvas.canvas.offsetTop + other;
}

WorkbenchView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.canvas.clear();
  this.canvas.fillBackground('#eee');

  this.renderTable();
  if(this.data_source.items.length > 0) {
    this.canvas.text(this.canvas.width / 2, 20, 'Combine')
      .default({'text-anchor': 'middle'}).button(this.combine);
  }
};

WorkbenchView.prototype.selectRow = function(event) {
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

WorkbenchView.prototype.selectRow = function(event) {
  var row = this.attrs.row;
  var p = this.attrs.parent;
  var item = p.data_source.items[row];
  // TODO amount_available < 1
  if(!item || item.amount < 1) { return false; }
  // new selection
  var item_clone = jQuery.extend(true, {}, item);
  item_clone.amount = 1;
  p.inventory.remove(item_clone);
  p.game_view.redraw();
};

WorkbenchView.prototype.combine = function(event) {
  console.log(event);
}
