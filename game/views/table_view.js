var TableView = { };

TableView.renderTable = function(callback) {
  var pos_y = this.tableOffsetTop||20;
  if(!this.data_source) { return; }
  var items = this.data_source.items||this.data_source;
  for(var c in items) {
    var row = this.canvas.text(this.tableOffsetLeft||10, pos_y, items[c].to_s()).defaults()
      .attr({parent: this, row: c})
      .link(this.selectRow).withHighlight();
    if(callback) { callback.call((this.parent||this), row, items[c]); }
    pos_y += this.rowHeight||20;
  }
};
