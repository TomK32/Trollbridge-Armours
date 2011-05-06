/*
   Trollbridge-Armours/Recipe
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Recipe;
Recipe = (function() {
  Recipe.all = [];
  function Recipe(attr) {
    this.name = attr.name || attr.products[0].name;
    this.ingredients = attr.ingredients || [];
    this.products = attr.products || [];
    this.requirements = attr.requirements || [];
    this.children = attr.children || [];
    this.counter = 0;
    this.satisfied = false;
  }
  Recipe.prototype.match = function(other_ingredients) {
    var o;
    o = this.fuzzyMatch(other_ingredients);
    return o && o.items.length === 0;
  };
  Recipe.prototype.fuzzyMatch = function(other_ingredients) {
    var ingredient, o, _i, _len, _ref;
    o = new Inventory($.extend([], other_ingredients));
    _ref = this.ingredients;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ingredient = _ref[_i];
      if (!o.remove(ingredient)) {
        return false;
      }
    }
    return o;
  };
  Recipe.prototype.incrementCounter = function(amount) {
    this.counter += amount;
    return this;
  };
  Recipe.prototype.childrenAvailable = function() {
    var child, result, _i, _len, _ref;
    result = [];
    _ref = this.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child.available()) {
        result.push(child);
      }
    }
    return result;
  };
  Recipe.prototype.available = function() {
    var requirement, _i, _len, _ref;
    if (this.satisfied) {
      return true;
    }
    _ref = this.requirements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      requirement = _ref[_i];
      if (requirement[0].counter < requirement[1]) {
        return false;
      }
    }
    this.satisfied = true;
    return this;
  };
  Recipe.prototype.to_s = function() {
    var ingredient, s, _i, _len, _ref;
    s = [];
    _ref = this.ingredients;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ingredient = _ref[_i];
      s.push(ingredient.amount + 'x ' + ingredient.name);
    }
    return this.name + ' (' + s.join(', ') + ')';
  };
  Recipe.define = function(name, defaults) {
    return Recipe.all[name] = new Recipe(defaults);
  };
  return Recipe;
})();