
var GameView = function(target, game) {
  this.game = game;
  this.canvas = new Canvas(target, 0, this.redraw);
  
  this.canvas.onMousedown = function(x,y,button) { console.log(x);};

  this.inventory_view = new InventoryView(this, this.canvas, this.game.inventory);
  this.workbench_view = new WorkbenchView(this, this.canvas);
};

GameView.prototype.redraw = function() {
  this.clear();
  this.font_regular();
  this.fillColor('#eee')
  this.fillRect(0, 0, this.width, this.height)
  this.fillColor('#000')
  this.fillText('v' + Game.version, 0, this.height-20);
};


GameView.prototype.selectIngredient = function(item) {
  this.workbench_view.inventory.add(item);
}
Canvas.prototype.font_regular = function() { this.font('400 13px sans-serif'); }
Canvas.prototype.font_strong  = function() { this.font('800 13px sans-serif'); }
