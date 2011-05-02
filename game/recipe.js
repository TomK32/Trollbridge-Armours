var Recipe = function(attr) {
  this.name = attr.name||attr.products[0].name;
  this.ingredients = attr.ingredients || [];
  this.products = attr.products || [];
}

Recipe.prototype.match = function(other_ingredients) {
  var o = this.fuzzyMatch(other_ingredients);
  return(o && o.items.length == 0);
}

Recipe.prototype.fuzzyMatch = function(other_ingredients) {
  var o = new Inventory($.extend([], other_ingredients));
  for(var ingredient in this.ingredients) {
    if(!o.remove(this.ingredients[ingredient])) {
      return false;
    }
  }
  return o;
}

Recipe.prototype.to_s = function() {
  s = [];
  for(c in this.ingredients) {
    s.push(this.ingredients[c].amount + 'x ' + this.ingredients[c].name);
  }
  return this.name + ' (' + s.join(', ') + ')';
};


Recipe.define = function(name, defaults) {
  this[name] = function() {
    return new this(defaults);
  }
};
