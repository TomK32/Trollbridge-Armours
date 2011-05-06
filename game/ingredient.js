/*
   Trollbridge-Armours/Ingredient
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Ingredient;
Ingredient = (function() {
  function Ingredient(attrs) {
    this.name = attrs.name;
    this.category = attrs.category || 'Something';
    this.amount = attrs.amount || 1;
    this.value = attrs.value || 1;
    this.forSale = attrs.sale || true;
  }
  Ingredient.define = function(name, defaults) {
    return Ingredient[name] = function(amount) {
      var i;
      i = new Ingredient(defaults);
      i.amount = amount || 1;
      return i;
    };
  };
  Ingredient.prototype.to_s = function() {
    if (this.amount > 0) {
      return this.amount + "x " + this.name + " (" + this.category + ")";
    } else {
      return this.name + " (" + this.category + ")";
    }
  };
  Ingredient.random = function() {
    var keys;
    keys = Object.keys(Ingredient.allIngredients);
    return Ingredient[keys[Math.floor(Math.random() * keys.length)]].call();
  };
  return Ingredient;
})();