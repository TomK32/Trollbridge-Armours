var Ingredient = function (attr) {
  this.name = attr.name;
  this.category = attr.category||attr.name;
  this.amount = attr.amount||0;
};

Ingredient.define = function(name, defaults) {
  this[name] = function(amount) {
    i = new this(defaults);
    i.amount = amount;
    return i;
  }
};

var ingredients = {
  oak_wood: { name: 'Oak Wood', category: 'Wood'},
  leather: { name: 'Leather', category: 'Leather'}
}

for(var ingredient in ingredients) {
  Ingredient.define(ingredient, ingredients[ingredient]);
}