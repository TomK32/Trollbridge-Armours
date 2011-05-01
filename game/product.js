var Product = function(attr) {
  this.name = attr.name;
  this.value = Math.abs(attr.value)||1;
  this.amount = attr.amount||1;
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
  wooden_sword: { name: 'Wooden Sword', category: 'Sword', value: 2 },
  wooden_shield: { name: 'Wooden Shield', category: 'Shield', value: 2 },
  mask: { name: 'Mask', category: 'Headgear', value: 2 }
};

for(var key in Product.allProducts) {
  Product.define(key, Product.allProducts[key]);
};
