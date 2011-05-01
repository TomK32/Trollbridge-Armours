var Product = function(attr) {
  this.name = attr.name;
  this.value = Math.abs(attr.value)||0;
}

Product.prototype.to_s = function() {
  return this.amount + "x " + this.name;
};


Product.define = function(name, defaults) {
  this[name] = function(amount) {
    var p = new Product(defaults);
    p.amount = amount||1;
    return p;
  }
};

Product.random = function() {
  var keys = Object.keys(Product.allProducts);
  return Product[keys[Math.floor(Math.random() * keys.length)]].call();
};

Product.allProducts = {
  wooden_sword: { name: 'Wooden Sword', category: 'Sword' },
  wooden_shield: { name: 'Wooden Shield', category: 'Shield' },
  mask: { name: 'Mask', category: 'Headgear' }
};

for(var key in Product.allProducts) {
  Product.define(key, Product.allProducts[key]);
};
