var Recipe = function(attr) {
  this.name = attr.name;
  this.ingredients = attr.ingredients || [];
  this.products = attr.products || [];
}

Recipe.define = function(name, defaults) {
  this[name] = function(amount) {
    return new this(defaults);
  }
};

var recipes = {
  oak_plank: { ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank(1)]}
}

for(var key in recipes) {
  Recipe.define(key, recipes[key]);
}