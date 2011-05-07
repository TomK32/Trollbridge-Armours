var TableView = { };

TableView.renderTable = function(callback) {
  var pos_y = this.tableOffsetTop||20;
  if(!this.data_source && typeof(this.data_source) != 'function') { return; }
  var d = this.data_source;
  if(typeof(this.data_source) == 'function') { d = d.call(this); }
  var items = d.items||d;
  for(var c in items) {
    var row = this.canvas.text(this.tableOffsetLeft||10, pos_y, items[c].to_s()).defaults()
      .attr({parent: this, row: c})
      .link(this.selectRow).withHighlight();
    if(callback) { callback.call((this.parent||this), row, items[c]); }
    pos_y += this.rowHeight||20;
  }
};
