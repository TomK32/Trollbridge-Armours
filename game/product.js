/*
   Trollbridge-Armours/Product
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Product;
Product = (function() {
  function Product(attr) {
    this.name = attr.name;
    this.value = Math.abs(attr.value) || 1;
    this.amount = attr.amount || 1;
  }
  Product.prototype.to_s = function() {
    return this.amount + "x " + this.name;
  };
  Product.define = function(name, defaults) {
    return Product[name] = function(amount) {
      var p;
      p = new Product(defaults);
      p.amount = amount || 1;
      return p;
    };
  };
  Product.random = function() {
    var keys;
    keys = Object.keys(Product.allProducts);
    return Product[keys[Math.floor(Math.random() * keys.length)]].call();
  };
  return Product;
})();