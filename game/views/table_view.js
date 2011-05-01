var TableView = { };

TableView.renderTable = function() {
  var pos_y = this.tableOffsetTop||20;
  if(!this.data_source) { return; }
  var items = this.data_source.items||this.data_source;
  for(var c in items) {
    this.canvas.text(this.tableOffsetLeft||10, pos_y, items[c].to_s()).default()
      .attr({parent: this, row: c})
      .click(this.selectRow).withHighlight();
    pos_y += this.rowHeight||20;
  }
};
