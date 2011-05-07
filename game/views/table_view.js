var TableView = { };

TableView.renderTable = function(callback) {
  this.rowMargin = (this.rowMargin || 10);
  var pos_y = this.tableOffsetTop||20;
  if(!this.data_source && typeof(this.data_source) != 'function') { return; }
  var d = this.data_source;
  if(typeof(this.data_source) == 'function') { d = d.call(this); }
  var items = d.items||d;
  for(var c in items) {
    var row = this.renderRow(items[c],this.tableOffsetLeft||10, pos_y, callback);
    pos_y = row.getBBox().y + row.getBBox().height;
  }
};
TableView.renderRow = function(item, x, y, callback) {
  var row = this.canvas.text(x, y+this.rowMargin, item.to_s()).defaults()
    .attr({parent: this, row: item   })
    .link(this.selectRow).withHighlight();
  var callback_result
  if(callback) { callback_result = callback.call(this, row, item); }
  return (callback_result || row);
}
