var InventoryView = function(canvas, inventory) {
  this.inventory = inventory;
  this.canvas = canvas.createLayerAt('inventory', 20, -160, 400, canvas.height-200, 1, this.redraw, 4, true);
  this.canvas.parent = this;
  this.canvas.onMousedown = function(x,y,button) { console.log(x);};
  console.log(this.canvas.onMousedown);
}

InventoryView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.clear();
  this.fillColor('#fff')
  this.fillRect(0, 0, this.width, this.height)
  this.fillColor('#000')
  
  this.fillText('Inventory', 5, 5);
  var pos_y = 30;
  if(this.parent) {
    for(var c in this.parent.inventory.items) {
      this.fillText(this.parent.inventory.items[c].to_s(), 20, pos_y);
      pos_y += 20;
    }
  }
}

InventoryView.prototype.mouseDown = function(x,y,button) {
  console.log(x);
}