var Product = function(attr) {
  this.name = attr.name;
}

Product.prototype.to_s = function() {
  return this.amount + "x " + this.name;
};


Product.define = function(name, defaults) {
  this[name] = function(amount) {
    var p = new this(defaults);
    p.amount = amount||1;
    return p;
  }
};

var products = {
  wooden_sword: { name: 'Wooden Sword', category: 'Sword' },
  wooden_shield: { name: 'Wooden Shield', category: 'Shield' },
  mask: { name: 'Mask', category: 'Headgear' }
}

for(var key in products) {
  Product.define(key, products[key]);
}
