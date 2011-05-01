var Hero = function(name, items, image) {
  this.name = name;
  this.image = image || (name + '.png');
  this.inventory = new Inventory(items);
}


Hero.define = function(name, defaults) {
  Hero[name] = function() {
    return new Hero(defaults);
  }
};

Hero.allHeroes = {
  wendy: { name: 'Windy Wendy', items: [Product.wooden_sword(1), Product.wooden_shield(1)]},
  cagua: { name: 'Cague', items: []},
  picasse: { name: 'Picasse', items: [Product.wooden_sword(2)]}
};

console.log();
Hero.random = function() {
  var keys = Object.keys(Hero.allHeroes);
  console.log(Hero[keys[Math.floor(Math.random() * keys.length)]]);
}

for(var key in Hero.allHeroes) {
  Hero.define(key, Hero.allHeroes[key]);
};
