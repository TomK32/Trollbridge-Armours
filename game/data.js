var allRecipes, key, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
Ingredient.allIngredients = {
  oak_wood: {
    name: 'Oak Wood',
    category: 'Wood',
    value: 1
  },
  oak_plank: {
    name: 'Oak Plank',
    category: 'Plank',
    value: 2
  },
  bronze: {
    name: 'Bronze',
    category: 'Metal',
    value: 3
  },
  iron: {
    name: 'Iron',
    category: 'Metal',
    value: 4
  },
  leather: {
    name: 'Leather',
    category: 'Leather',
    value: 2
  },
  tin: {
    name: 'Tin',
    category: 'Ore',
    value: 3
  },
  copper_ore: {
    name: 'Copper Ore',
    category: 'Ore',
    value: 2
  },
  copper: {
    name: 'Copper',
    category: 'Metal',
    value: 5
  },
  iron_ore: {
    name: 'Iron Ore',
    category: 'Ore',
    value: 3
  }
};
_ref = Object.keys(Ingredient.allIngredients);
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  key = _ref[_i];
  Ingredient.define(key, Ingredient.allIngredients[key]);
}
Product.allProducts = {
  wooden_sword: {
    name: 'Wooden Sword',
    category: 'Sword',
    value: 5
  },
  wooden_shield: {
    name: 'Wooden Shield',
    category: 'Shield',
    value: 5
  },
  bronce_sword: {
    name: 'Bronce Sword',
    category: 'Sword',
    value: 8
  },
  iron_sword: {
    name: 'Iron Sword',
    category: 'Sword',
    value: 10
  },
  mask: {
    name: 'Mask',
    category: 'Headgear',
    value: 4
  }
};
_ref2 = Object.keys(Product.allProducts);
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  key = _ref2[_j];
  Product.define(key, Product.allProducts[key]);
}
allRecipes = {
  oak_plank: {
    ingredients: [Ingredient.oak_wood(3)],
    products: [Ingredient.oak_plank(1)]
  },
  wooden_sword: {
    ingredients: [Ingredient.oak_plank(2), Ingredient.leather(1)],
    products: [Product.wooden_sword(1)]
  },
  wooden_shield: {
    ingredients: [Ingredient.oak_plank(2)],
    products: [Product.wooden_shield(1)],
    requirements: [['Recipe.oak_plank', 2]]
  },
  copper: {
    ingredients: [Ingredient.copper_ore(3)],
    products: [Ingredient.copper(1)]
  },
  bronze: {
    ingredients: [Ingredient.copper(3), Ingredient.tin(1)],
    products: [Ingredient.bronze(1)],
    requirements: [['Recipe.copper', 4]]
  },
  iron: {
    ingredients: [Ingredient.iron_ore(4)],
    products: [Ingredient.iron(1)]
  },
  iron_sword: {
    ingredients: [Ingredient.iron(3), Ingredient.leather(1)],
    products: [Product.iron_sword(1)],
    requirements: [['Recipe.iron', 3]]
  },
  mask: {
    requirements: [['Recipe.oak_plank', 10]],
    ingredients: [Ingredient.oak_plank(1), Ingredient.oak_wood(1)],
    products: [Product.mask(1)]
  }
};
_ref3 = Object.keys(allRecipes);
for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
  key = _ref3[_k];
  Recipe.define(key, allRecipes[key]);
}
Hero.allHeroes = {
  wendy: {
    name: 'Windy Wendy',
    items: [Product.iron_sword(1), Product.wooden_shield(1)]
  },
  cagua: {
    name: 'Cagua',
    items: []
  },
  riel: {
    name: 'Louis David Riel',
    items: [Product.wooden_sword(1)]
  },
  picasse: {
    name: 'Picasse',
    items: [Product.wooden_sword(1)]
  }
};
_ref4 = Object.keys(Hero.allHeroes);
for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
  key = _ref4[_l];
  Hero.define(key, Hero.allHeroes[key]);
}