var InventoryView = function(canvas, inventory) {
  this.inventory = inventory;
  this.canvas = canvas.createLayerAt('inventory', 20, -160, 400, canvas.height-200, 10, this.redraw, 4, true);
  this.canvas.parent = this;
  this.canvas.onMouseDown = this.mouseDown;
  this.canvas.onMouseUp = this.mouseUp;
  this.rowHeight = 20;
  this.selected = false;
}

InventoryView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.clear();
  this.font_regular();
  this.fillColor('#fff')
  this.fillRect(0, 0, this.width, this.height)
  this.fillColor('#000')

  var pos_y = 0;
  if(this.parent) {
    for(var c in this.parent.inventory.items) {
      this.font_regular();
      if(c == this.parent.selectedRow()) {
        this.font_strong();
      }
      this.fillText(this.parent.inventory.items[c].to_s(), 20, pos_y);
      pos_y += this.parent.rowHeight;
    }
  }
};

InventoryView.prototype.selectRow = function(row) {
  if(this.selected) { return true; }
  var item = this.inventory.items[row];
  if(!item) { return false; }
  this.selected = true;
  // new selection
}

// find which row the mouse is over
InventoryView.prototype.selectedRow = function() {
  return Math.floor(this.canvas.mouse.y / this.rowHeight);
};
InventoryView.prototype.mouseDown = function(x,y,button) {
  this.parent.selectRow(this.parent.selectedRow(this.parent.canvas.mouse));
};

InventoryView.prototype.mouseUp = function(x,y,button) {
  this.parent.selected = false;
}