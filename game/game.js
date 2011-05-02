var Game = function() {
  // some defaults
  this.player = new Player();
  this.inventory = this.player.inventory;
  this.recipes = this.player.recipes;
  this.heroes = [];
  this.timer = this.startLoop();
  this.game_view = null;
}

Game.version = '0.1';

Game.prototype.toggleLoop = function() {
  if (this.timer) { this.stopLoop(); }
  else { return this.startLoop(); }
}
Game.prototype.startLoop = function() {
  if (this.timer) { return false; }
  return this.timer = setInterval(this.tick, 333); // ~ 3/sec
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
  this.player.money += (item.value * item.amount);
  this.player.lastSale = [item.name, item.value * item.amount];
  hero.wishlist.remove(item);
  hero.inventory.add(item);
  if(this.game_view) {
    this.game_view.player_view.redraw();
    this.game_view.inventory_view.redraw();
  }
  return true;
}

Game.prototype.buyItem = function(item, hero) {
  var o = $.extend({}, item);
  if(!item.forSale || !item.value) { return }
  o.amount = Math.min(item.amount, Math.floor(this.player.money / item.value));
  if(isNaN(o.amount) || o.amount < 1) { return false; }
  this.player.inventory.add(o);
  this.player.money -= (o.amount * o.value);
  this.player.lastSale = [o.name, -o.amount * o.value];
  hero.inventory.remove(o);
  if(this.game_view) {
    this.game_view.player_view.redraw();
    this.game_view.inventory_view.redraw();
  }
  return true;
}

// return only the first matching
Game.prototype.findRecipeFor = function(ingredients) {
  for(var c in this.player.recipes) {
    if(this.player.recipes[c].fuzzyMatch(ingredients)) { return(this.player.recipes[c]); }
  }
  return false
};

Game.prototype.combine = function(recipe, amount) {
  var amount = amount||1; // default to 1

  for(var c in recipe.ingredients) {
    if(!this.inventory.find(recipe.ingredients[c], recipe.ingredients[c].amount * amount)) {
      return false;
    }
  }
  // all ingredients found
  for(var c in recipe.ingredients) {
    this.inventory.remove(recipe.ingredients[c], recipe.ingredients[c].amount * amount);
  }
  for(var c in recipe.products) {
    this.inventory.add(recipe.products[c], recipe.products[c].amount * amount);
  }
  recipe.incrementCounter(amount);
  this.recipes.concat(recipe.childrenAvailable());
  this.inventory.compact();
  return true;
}