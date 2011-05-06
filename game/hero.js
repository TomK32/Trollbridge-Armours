var Hero;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Hero = (function() {
  function Hero(attr) {
    this.name = attr.name;
    this.image = attr.image || (attr.name + '.png');
    this.inventory = new Inventory(attr.items);
    this.money = 20;
    this.present = true;
    this.wishlist = new Inventory;
  }
  __extends(Hero, Money);
  Hero.prototype.leave = function() {
    if (this.wishlist.items.length > 0 && Math.random < 0.1) {
      this.wishlist.items[Math.floor(this.wishlist.items.length * Math.random)];
    }
    this.present = false;
    return this;
  };
  Hero.prototype.arrive = function() {
    this.present = true;
    this.inventory.add(Ingredient.random());
    this.wishlist.add(Product.random());
    return this;
  };
  Hero.define = function(name, defaults) {
    return Hero[name] = function() {
      return new Hero(defaults);
    };
  };
  Hero.random = function() {
    var keys;
    keys = Object.keys(Hero.allHeroes);
    return Hero[keys[Math.floor(Math.random() * keys.length)]];
  };
  return Hero;
})();