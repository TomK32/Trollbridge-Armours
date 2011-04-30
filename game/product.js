var Product = function(attr) {
  this.name = attr.name;
}

Product.define = function(name, defaults) {
  this[name] = function(amount) {
    var p = new this(defaults);
    p.amount = amount;
    return p;
  }
};

var products = {
  wooden_sword: { name: 'Wooden Sword' }
}

for(var key in products) {
  Product.define(key, products[key]);
}