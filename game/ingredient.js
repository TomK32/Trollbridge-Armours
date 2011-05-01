var Ingredient = function (attr) {
  this.name = attr.name;
  this.category = attr.category||attr.name;
  this.amount = attr.amount||1;
  this.forSale = attr.sale||true;
};

Ingredient.define = function(name, defaults) {
  this[name] = function(amount) {
    i = new Ingredient(defaults);
    i.amount = amount;
    return i;
  }
};

Ingredient.random = function() {
  var keys = Object.keys(Ingredient.allIngredients);
  return Ingredient[keys[Math.floor(Math.random() * keys.length)]].call();
};


Ingredient.prototype.to_s = function() {
  return (this.amount ? this.amount + "x " : '') + this.name + " (" + this.category + ")";
};

Ingredient.allIngredients = {
  oak_wood: { name: 'Oak Wood', category: 'Wood'},
  oak_plank: { name: 'Oak Plank', category: 'Plank'},
  leather: { name: 'Leather', category: 'Leather'}
}

for(var key in Ingredient.allIngredients) {
  Ingredient.define(key, Ingredient.allIngredients[key]);
}