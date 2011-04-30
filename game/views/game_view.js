
var GameView = function(target, game) {
  this.game = game;
  this.canvas = new Canvas(target, 0, function() { 
    this.clear();
    this.fillColor('#eee')
    this.fillRect(0, 0, this.width, this.height)
    this.fillColor('#000')
    this.fillText('v' + Game.version, 0, this.height-20);
  });

  this.inventory_view = new InventoryView(this.canvas, this.game.inventory);
};