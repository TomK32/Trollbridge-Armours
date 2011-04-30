WorkbenchView = function(game_view, canvas) {
  $.extend(this.__proto__, TableView);
  this.canvas = canvas.createLayerAt('workbench', 540, -160, 240, canvas.height-200, 11, this.redraw, 5, true);
  this.canvas.parent = this;
  this.game_view = game_view;
  this.inventory = new Inventory();
  this.data_source = this.inventory;
};

WorkbenchView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.clear();
  this.font_regular();
  this.fillColor('#ddd');
  this.fillRect(0, 0, this.width, this.height);
  this.fillColor('#000');

  if(this.parent) {
    this.parent.renderTable();
  }
};

WorkbenchView.prototype.selectRow = function(row) {
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


