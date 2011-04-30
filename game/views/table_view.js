var TableView = { };

TableView.renderTable = function() {
  var pos_y = 0;
  if(!this.data_source) { return; }
  for(var c in this.data_source.items) {
    this.canvas.font_regular();
    if(c == this.selectedRow()) {
      this.canvas.font_strong();
    }
    this.canvas.fillText(this.data_source.items[c].to_s(), 20, pos_y);
    pos_y += this.rowHeight||20;
  }
};

// find which row the mouse is over
TableView.selectedRow = function() {
  return Math.floor(this.canvas.mouse.y / (this.rowHeight||20));
};
TableView.mouseDown = function(x,y,button) {
  this.parent.selectRow(this.parent.selectedRow(this.parent.canvas.mouse));
};

TableView.mouseUp = function(x,y,button) {
  this.parent.selected = false;
};