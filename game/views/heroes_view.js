var HeroesView = function(game_view, heroes) {
  $.extend(this.__proto__, TKView);

  this.game_view = game_view;
  this.parent = game_view;
  this.heroes = heroes;

  this.canvas = new Raphael(this.x(180), this.y(70), 400, 400);
  this.canvas.defaultCustomAttributes();

  this.cellSize = 132;
  this.imageSize = 128;

  this.hero_inventory = null;

  this.redraw();
}

HeroesView.prototype.redraw = function() {
  this.canvas.clear();
  this.removeHeroDetails();
  this.canvas.fillBackground('#ddd').opaque();

  var row = -1;
  var col = 0;
  var cellsPerRow = Math.floor(this.canvas.width / this.cellSize);
  for(var c in this.heroes) {
    if(this.heroes[c].present) {
      if((col % cellsPerRow) == 0) { row += 1; }
      var image = this.canvas.rect((col % cellsPerRow) * this.cellSize+4,
          row * this.cellSize+4, this.imageSize, this.imageSize)
        .attr({parent: this, row: c, fill: 'url(images/heroes/' + this.heroes[c].image + ')', 'stroke-width' : 0})
        .link(this.clickCell);
      if(this.heroes[c].wishlist.items.length > 0) {
        image.attr({'stroke-width': '1px', 'stroke': '#F00'})
      }
      col += 1;
    }
  }
}
HeroesView.prototype.show = HeroesView.prototype.redraw

HeroesView.prototype.removeHeroDetails = function() {
  if(this.hero_inventory) {
    $(this.hero_inventory.canvas.canvas).remove();
    delete this.hero_inventory;
  }
}
HeroesView.prototype.selectHero = function (row) {
  var hero = this.heroes[row];
  this.removeHeroDetails();
  this.canvas.clear();
  this.hero_inventory = new HeroInventoryView(this, hero)
  this.game_view.tabs.push(this.hero_inventory.canvas.canvas);
}

HeroesView.prototype.clickCell = function(event) {
  this.attrs.parent.selectHero(this.attrs.row);
}

HeroesView.prototype.sellItem = function(event) {
  this.attrs.parent.game_view.game.sellItem(this.attrs.row, this.attrs.parent.hero_inventory.hero);
  this.attrs.parent.hero_inventory.redraw();
};

HeroesView.prototype.buyItem = function(event) {
  this.attrs.parent.game_view.game.buyItem(this.attrs.row, this.attrs.parent.hero_inventory.hero);
  this.attrs.parent.hero_inventory.redraw();
}

var HeroInventoryView = function(hero_view, hero) {
  $.extend(this.__proto__, InventoryView);
  $.extend(this.__proto__, TableView);
  $.extend(this.__proto__, TKView);

  this.inventory = hero.inventory;
  this.data_source = hero.wishlist;
  this.hero_view = hero_view;
  this.hero = hero;
  this.game_view = hero_view.game_view;
  this.game_view.game.stopLoop();
  this.game_view.redraw(true);
  this.parent = hero_view;
  this.canvas = new Raphael(this.x(0), this.y(0), this.parentWidth(), this.parentWidth());
  this.canvas.defaultCustomAttributes()

  this.tableOffsetTop = 74;
  this.tableOffsetLeft = 146;

  this.selectedTab = 1;
  this.redraw();

  this.tabs = [];
};

HeroInventoryView.prototype.redraw = function() {
  this.canvas.clear();
  if(this.selectedTab == 1 && this.data_source.items.length == 0) {
    this.showHeroInventory();
  }
  this.canvas.fillBackground('#eee').opaque();
  this.renderTable(this.selectedTab == 0 ? this.buyLink : this.sellLink);
  this.canvas.image('images/heroes/' + this.hero.image, 4, 4, 128, 128).attr({parent: this}).link(this.closeInventory);
  this.canvas.text(142, 20, this.hero.name).defaults({'font-weight': 'bold'});
  this.tabs = [];
  this.addTab(142, 50, 15, 'Inventory', true).defaults({parent: this}).link(this.showHeroInventory);
  if(this.selectedTab == 1 || this.hero.wishlist.items.length > 0) {
    this.addTab(142, 50, 15, 'Wants to buy', true).defaults({parent: this}).link(this.showHeroWishlist);
  }
  this.tabs[this.selectedTab].attr({'font-weight': 'bold'});

};

HeroInventoryView.prototype.closeInventory = function(event) {
  this.attrs.parent.parent.removeHeroDetails();
  this.attrs.parent.parent.redraw();
}
HeroInventoryView.prototype.sellLink = function(row, item) {
  if(this.game_view.game.player.inventory.find(item.name)) {
    row.attr({fill: '#00A', parent: this.hero_view, row: item}).link(this.hero_view.sellItem);
  }
}
HeroInventoryView.prototype.buyLink = function(row, item) {
  if(!item.forSale) { return false; };
  row.attr({fill: '#080', parent: this.hero_view, row: item}).link(this.hero_view.buyItem);
}

HeroInventoryView.prototype.addTab = function(x,y, margin, text, horizontal) {
  if (this.tabs.length > 0) {
    if (horizontal) { x += this.tabs.slice(-1,1)[0][0].getBBox().width + margin; }
    else { y += this.tabs.slice(-1,1)[0][0].getBBo<x().top + margin; }
  }

  var tab = this.canvas.text(x, y, text);
  this.tabs.push(tab);
  return tab;
}

HeroInventoryView.prototype.showHeroWishlist = function(event) {
  var p = this.attrs.parent;
  p.selectedTab = 1; // TODO constants?
  p.data_source = p.hero.wishlist;
  p.redraw();
};
HeroInventoryView.prototype.showHeroInventory = function(event) {
  var p = (this.attrs ? this.attrs.parent : this);

  p.selectedTab = 0; // TODO constants?
  p.data_source = p.hero.inventory;
  p.redraw();
};

HeroInventoryView.prototype.selectRow = function(event) {
  // TODO
};
