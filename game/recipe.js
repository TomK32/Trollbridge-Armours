var Recipe = function(attr) {
  this.name = attr.name||attr.products[0].name;
  this.ingredients = attr.ingredients || [];
  this.products = attr.products || [];
  this.requirements = attr.requirements||[];
  this.children = attr.children||[];
  this.counter = 0;
  this.satisfied = false;
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

Recipe.prototype.incrementCounter = function(amount) {
  this.counter += amount;
  return this;
}

Recipe.prototype.childrenAvailable = function() {
  var result = [];
  for(var c in this.children) {
    if(this.children[c] && this.children[c].available()) { result.push(this.children[c]); }
  }
  return result;
}
Recipe.prototype.available = function() {
  if(this.satisfied) { return true; }
  for(var c in this.requirements) {
    if(this.requirements[c][0].counter < this.requirements[c][1]) { return false; }
  }
  this.satisfied = true;
  return this;
}

Recipe.prototype.to_s = function() {
  s = [];
  for(var c in this.ingredients) {
    s.push(this.ingredients[c].amount + 'x ' + this.ingredients[c].name);
  }
  return this.name + ' (' + s.join(', ') + ')';
};


Recipe.define = function(name, defaults) {
  this[name] = function() {
    return new this(defaults);
  }
};
