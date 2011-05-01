var Recipe = function(attr) {
  this.name = attr.name;
  this.ingredients = attr.ingredients || [];
  this.products = attr.products || [];
}

Recipe.prototype.match = function(other_ingredients) {
  var o = new Inventory($.extend([], other_ingredients));
  for(var ingredient in this.ingredients) {
    if(!o.remove(this.ingredients[ingredient])) {
      return false;
    }
  }
  return(o.items.length == 0);
}

Recipe.prototype.to_s = function() {
  return this.name;
};


Recipe.define = function(name, defaults) {
  this[name] = function() {
    return new this(defaults);
  }
};

var recipes = {
  oak_plank: { ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank(1)]},
  wooden_sword: { ingredients: [Ingredient.oak_plank(1), Ingredient.leather(1)],
        products: [Product.wooden_sword(1)]}
};

for(var key in recipes) {
  Recipe.define(key, recipes[key]);
};
