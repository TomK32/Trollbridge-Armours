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
  Recipe.prototype.children = function() {
    var child, req, result, _i, _j, _len, _len2, _ref, _ref2;
    result = [];
    _ref = Recipe.all;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _ref2 = child.requirements;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        req = _ref2[_j];
        if (typeof req[0] === 'string') {
          req[0] = eval(req[0]);
        }
        if (req[0].name === this.name) {
          result.push(child);
        }
      }
    }
    return result;
  };
  Recipe.prototype.childrenAvailable = function() {
    var child, result, _i, _len, _ref;
    result = [];
    _ref = this.children();
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
      if (typeof requirement[0] === 'string') {
        requirement[0] = eval(requirement[0]);
      }
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
  Recipe.roots = function() {
    var recipe, result, _i, _len, _ref;
    result = [];
    _ref = this.all;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      recipe = _ref[_i];
      if (recipe.requirements.length === 0) {
        result.push(recipe);
      }
    }
    return result;
  };
  Recipe.define = function(name, attr) {
    var recipe;
    recipe = new Recipe(attr);
    Recipe.all.push(recipe);
    return Recipe[name] = recipe;
  };
  return Recipe;
})();