var Ingredient = function (attr) {
  this.name = attr.name;
  this.category = attr.category||attr.name;
  this.amount = attr.amount||1;
};

Ingredient.define = function(name, defaults) {
  this[name] = function(amount) {
    i = new this(defaults);
    i.amount = amount;
    return i;
  }
};

Ingredient.prototype.to_s = function() {
  return (this.amount ? this.amount + "x " : '') + this.name + " (" + this.category + ")";
};

var ingredients = {
  oak_wood: { name: 'Oak Wood', category: 'Wood'},
  oak_plank: { name: 'Oak Plank', category: 'Plank'},
  leather: { name: 'Leather', category: 'Leather'}
}

for(var key in ingredients) {
  Ingredient.define(key, ingredients[key]);
}