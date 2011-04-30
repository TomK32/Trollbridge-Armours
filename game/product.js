var Product = function(attr) {
  this.name = attr.name;
}

Product.define = function(name, defaults) {
  this[name] = function(amount) {
    var p = new this(defaults);
    p.amount = amount||1;
    return p;
  }
};

Product.prototype.to_s = function() {
  return this.amount + "x " + this.name;
};

var products = {
  wooden_sword: { name: 'Wooden Sword' }
}

for(var key in products) {
  Product.define(key, products[key]);
}