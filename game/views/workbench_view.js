WorkbenchView = function(game_view) {
  $.extend(this.__proto__, TableView);
  $.extend(this.__proto__, TKView);

  this.parent = game_view;
  this.game_view = game_view;
  this.game = game_view.game;

  this.inventory = new Inventory();
  this.data_source = this.inventory;

  this.canvas = new Raphael(this.x(520), this.y(40), 240, 300);
  this.canvas.defaultCustomAttributes()

  this.tableOffsetTop = 50;
  this.redraw();
};

WorkbenchView.prototype.redraw = function(frameDuration, totalDuration, frameNumber) {
  this.canvas.clear();
  this.canvas.fillBackground('#eee').opaque();
  this.inventory.compact();

  this.renderTable();
  if(this.data_source.items.length > 0) {
    this.canvas.text(this.canvas.width / 2, 20, 'Combine')
      .default({parent: this}).button(this.combine);
  }
};

WorkbenchView.prototype.selectRow = function(event) {
  var row = this.attrs.row;
  var p = this.attrs.parent;
  var item = p.data_source.items[row];
  // TODO amount_available < 1
  if(!item || item.amount < 1) { return false; }
  // new selection
  var item_clone = jQuery.extend(true, {}, item);
  item_clone.amount = 1;
  p.inventory.remove(item_clone);
  p.game_view.redraw();
};

WorkbenchView.prototype.findRecipe = function() {
  return this.game.findRecipeFor(this.inventory.items);
}

WorkbenchView.prototype.combine = function(event) {
  var p = this.attrs.parent;
  if(!p) { return; }
  var recipe = p.findRecipe();
  if(recipe) {
    p.game.combine(recipe);
    // hide if all used up
    if(p.inventory.items.length == 0) {
      $(p.canvas.canvas).hide();
    }
    p.game_view.redraw();
  } else {
    this.errorHighlight();
  }
}
