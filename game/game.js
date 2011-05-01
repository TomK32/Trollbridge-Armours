var Game = function() {
  // some defaults
  this.player = new Player();
  this.inventory = new Inventory();
  this.recipes = [];
}

Game.version = '0.1';

// return only the first matching
Game.prototype.findRecipeFor = function(ingredients) {
  for(c in this.recipes) {
    if(this.recipes[c].fuzzyMatch(ingredients)) { return(this.recipes[c]); }
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