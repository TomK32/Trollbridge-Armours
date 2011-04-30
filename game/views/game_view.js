
Raphael.fn.defaultCustomAttributes = function() {
  this.customAttributes.parent = function (parent) { return parent; }
  this.customAttributes.row = function (row) { return row; }
}
Raphael.fn.fillBackground = function(color) {
  this.rect(0,0,this.width, this.height).attr({fill: color});
}
Raphael.el.withHighlight = function() {
  var toggleHighlight = function(event) {
    $(event.target).css('font-weight',
      ($(event.target).css('font-weight') == 'bold') ? 'normal' : 'bold');
  }
  this.hover(toggleHighlight).mouseout(toggleHighlight);
}

var GameView = function(target, game) {
  this.game = game;
  this.canvas = new Raphael(target, 800, 600);
  this.canvas.defaultCustomAttributes()

  this.inventory_view = new InventoryView(this, this.game.inventory);
  this.workbench_view = new WorkbenchView(this);
  this.redraw();
};

GameView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.rect(0,0,this.canvas.width, this.canvas.height).attr({fill: '#ddd'});

  this.canvas.text(5, this.canvas.canvas.offsetHeight-10, 'v' + Game.version).attr({'text-anchor': 'start'});
  this.inventory_view.redraw();
  this.workbench_view.redraw();
};


GameView.prototype.selectIngredient = function(item) {
  this.workbench_view.inventory.add(item);
  this.redraw();
}
Tools = {};
Tools.font_regular = function() { this.font('400 13px sans-serif'); }
Tools.font_strong  = function() { this.font('800 13px sans-serif'); }
