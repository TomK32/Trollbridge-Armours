var Game = function() {
  // some defaults
  this.player = new Player();
  this.inventory = this.player.inventory;
  this.recipes = [];
  this.heroes = [];
  this.timer = this.startLoop();
  this.game_view = null;
}

Game.version = '0.1';

Game.prototype.toggleLoop = function() {
  if(this.timer) { this.stopLoop(); }
  else { var t = this.startLoop(); }
  this.game_view.redraw(true);
  return t;
}
Game.prototype.startLoop = function() {
  if (this.timer) { return false; }
  return this.timer = setInterval(this.tick, 33); // ~ 3/sec
}
Game.prototype.stopLoop = function() {
  clearInterval(this.timer);
  this.timer = false;
}

// the loopy thing
Game.prototype.tick = function() {
  if(Math.random()<0.1) {
    var hero = game.heroes[Math.floor(Math.random()*game.heroes.length)];
    if(hero) {
      if(hero.present) { hero.leave(); }
      else { hero.arrive(); }
      if(this.game_view) { this.game_view.redraw(true); this.game_view.heroes_view.redraw(); }
    }
  }
}

Game.prototype.sellItem = function(item, hero) {
  if(!hero.wishlist.find(item,0) || !this.player.inventory.find(item,0)) { return false; }
  this.player.inventory.remove(item);
  hero.wishlist.add(item);
  hero.inventory.add(item);
  return true;
}
// return only the first matching
Game.prototype.findRecipeFor = function(ingredients) {
  for(c in this.player.recipes) {
    if(this.player.recipes[c].fuzzyMatch(ingredients)) { return(this.player.recipes[c]); }
  }
  return false
};

Game.prototype.combine = function(recipe, amount) {
  amount = amount||1; // default to 1
  for(var c in recipe.ingredients) {
    if(!this.inventory.find(recipe.ingredients[c])) {
      return false;
    }
  }
  // all ingredients found
  for(var c in recipe.ingredients) {
    this.inventory.remove(recipe.ingredients[c]);
  }
  for(var c in recipe.products) {
    this.inventory.add(recipe.products[c]);
  }
  this.inventory.compact();
  return true;
}