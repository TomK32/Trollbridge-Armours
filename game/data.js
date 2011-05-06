var allRecipes, key, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
Ingredient.allIngredients = {
  oak_wood: {
    name: 'Oak Wood',
    category: 'Wood'
  },
  oak_plank: {
    name: 'Oak Plank',
    category: 'Plank',
    value: 2
  },
  leather: {
    name: 'Leather',
    category: 'Leather'
  },
  iron_ore: {
    name: 'Iron Ore',
    category: 'Ore',
    value: 2
  },
  iron: {
    name: 'Iron',
    category: 'Metal',
    value: 4
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
    ingredients: [Ingredient.oak_wood(2)],
    products: [Ingredient.oak_plank(1)]
  },
  wooden_sword: {
    ingredients: [Ingredient.oak_plank(1), Ingredient.leather(1)],
    products: [Product.wooden_sword(1)]
  },
  wooden_shield: {
    ingredients: [Ingredient.oak_plank(2)],
    products: [Product.wooden_sword(1)],
    requirements: [Ingredient.oak_plank(), 10]
  },
  iron: {
    ingredients: [Ingredient.iron_ore(2)],
    products: [Ingredient.iron(1)]
  },
  iron_sword: {
    ingredients: [Ingredient.iron(3), Ingredient.leather(1)],
    products: [Product.iron_sword(1)]
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