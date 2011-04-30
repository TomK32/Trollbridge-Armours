var Product = function() {
}

Product.define = function(name, defaults) {
  this[name] = function(amount) {
    return new this(defaults);
  }
};

var products = {
  wooden_sword: { name: 'Wooden sword' }
}

for(var key in products) {
  Product.define(key, products[key]);
}