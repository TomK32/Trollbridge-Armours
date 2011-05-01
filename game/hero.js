var Hero = function(attr) {
  $.extend(this.__proto__, Money);
  this.name = attr.name;
  this.image = attr.image || (attr.name + '.png');
  this.inventory = new Inventory(attr.items);
  this.money = 20;
  this.present = true;
  this.wishlist = new Inventory();
  this.present = true;
}

Hero.prototype.leave = function() {
  if(this.wishlist.items.length > 0 && Math.random() < 0.1) {
    this.wishlist.items.splice(Math.floor(this.wishlist.items.length*Math.random),1);
  }
  this.present = false;
  return this;
}

// hero has a new wish
Hero.prototype.arrive = function() {
  this.present = true;
  this.inventory.add(Ingredient.random());
  this.wishlist.add(Product.random());
  return this;
}

Hero.define = function(name, defaults) {
  Hero[name] = function() {
    return new Hero(defaults);
  }
};

Hero.random = function() {
  var keys = Object.keys(Hero.allHeroes);
  return Hero[keys[Math.floor(Math.random() * keys.length)]];
}

Hero.allHeroes = {
  wendy: { name: 'Windy Wendy', items: [Product.wooden_sword(1), Product.wooden_shield(1)]},
  cagua: { name: 'Cagua', items: []},
  riel: { name: 'Louis David Riel', items: [Product.wooden_sword(1)]},
  picasse: { name: 'Picasse', items: [Product.wooden_sword(2)]}
};

for(var key in Hero.allHeroes) {
  Hero.define(key, Hero.allHeroes[key]);
};
