var HeroesView = function(game_view, heroes) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;
  this.heroes = heroes;

  this.canvas = new Raphael(this.x(180), this.y(40), 400, 400);
  this.canvas.defaultCustomAttributes();

  this.cellSize = 132;
  this.imageSize = 128;

  this.hero_inventory = null;

  this.redraw();
}

HeroesView.prototype.redraw = function() {
  this.canvas.clear();
  this.canvas.fillBackground('#ddd').opaque();

  var row = -1;
  var cellsPerRow = Math.floor(this.canvas.canvas.offsetWidth / this.cellSize);
  for(c in this.heroes) {
    if((c % cellsPerRow) == 0) { row += 1; }
    this.canvas.image('images/heroes/' + this.heroes[c].image,
        (c % cellsPerRow) * this.cellSize+4, row * this.cellSize+4, this.imageSize, this.imageSize)
      .attr({parent: this, row: c})
      .click(this.clickCell);
  }
}

HeroesView.prototype.selectHero = function (row) {
  var hero = this.heros[row];
  $(this.hero_inventory.canvas.canvas).remove();
  delete this.hero_inventory;
  this.hero_inventory = new InventoryView()
}

HeroesView.prototype.clickCell = function(event) {
  this.attrs.parent.selectHero(this.attrs.parent);
}
