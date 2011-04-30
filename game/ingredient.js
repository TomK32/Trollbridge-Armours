var Ingredient = function (name, category, amount) {
  this.name = name;
  this.category = category||name;
  this.amount = amount||0;
};

Ingredient.oak_wood = function() { return new Ingredient('Oak Wood', 'Wood'); };
Ingredient.leather = function() { return new Ingredient('Leather', 'Leather'); };