var TableView = { };

TableView.renderTable = function() {
  var pos_y = this.tableOffsetTop||20;
  if(!this.data_source) { return; }
  for(var c in this.data_source.items) {
    this.canvas.text(10, pos_y, this.data_source.items[c].to_s()).default()
      .attr({parent: this, row: c})
      .click(this.selectRow).withHighlight();
    pos_y += this.rowHeight||20;
  }
};
