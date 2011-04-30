var Recipe = function(attr) {
  this.name = attr.name;
  this.ingredients = attr.ingredients || [];
  this.products = attr.products || [];
}

Recipe.define = function(name, defaults) {
  this[name] = function() {
    return new this(defaults);
  }
};
Recipe.prototype.to_s = function() {
  return this.name;
}
var recipes = {
  oak_plank: { ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank(1)]},
  wooden_sword: { ingredients: [Ingredient.oak_plank(1), Ingredient.leather(1)],
        products: [Product.wooden_sword(1)]}
}

for(var key in recipes) {
  Recipe.define(key, recipes[key]);
}