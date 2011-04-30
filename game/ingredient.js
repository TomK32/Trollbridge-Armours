var Ingredient = function (name, category, amount) {
  this.name = name;
  this.category = category||name;
  this.amount = amount||0;
};

Ingredient.define = function(name, defaults) {
  this[name] = function(amount) {
    i = new this();
    i.amount = amount;
    for(var key in defaults) {
      i[key] = defaults[key];
    }
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