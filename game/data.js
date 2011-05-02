Ingredient.allIngredients = {
  oak_wood: { name: 'Oak Wood', category: 'Wood'},
  oak_plank: { name: 'Oak Plank', category: 'Plank', value: 2},
  leather: { name: 'Leather', category: 'Leather'},
  iron_ore: { name: 'Iron Ore', category: 'Ore', value: 2},
  iron: { name: 'Iron', category: 'Metal', value: 4}
}

for(var key in Ingredient.allIngredients) {
  Ingredient.define(key, Ingredient.allIngredients[key]);
}



Product.allProducts = {
  wooden_sword: { name: 'Wooden Sword', category: 'Sword', value: 5 },
  wooden_shield: { name: 'Wooden Shield', category: 'Shield', value: 5 },
  iron_sword: { name: 'Iron Sword', category: 'Sword', value: 10 },
  mask: { name: 'Mask', category: 'Headgear', value: 4 }
};

for(var key in Product.allProducts) {
  Product.define(key, Product.allProducts[key]);
};



Recipe.allRecipes = {
  oak_plank: { ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank(1)]},
  wooden_sword: { ingredients: [Ingredient.oak_plank(1), Ingredient.leather(1)],
        products: [Product.wooden_sword(1)]},
  iron: {ingredients: [Ingredient.iron_ore(2)], products: [Ingredient.iron(1)]},
  iron_sword: {ingredients: [Ingredient.iron(3), Ingredient.leather(1)], products: [Product.iron_sword(1)]},
  mask: {ingredients: [Ingredient.oak_plank(1), Ingredient.oak_wood(1)], products: [Product.mask(1)]}
};

for(var key in Recipe.allRecipes) {
  Recipe.define(key, Recipe.allRecipes[key]);
};



Hero.allHeroes = {
  wendy: { name: 'Windy Wendy', items: [Product.iron_sword(1), Product.wooden_shield(1)]},
  cagua: { name: 'Cagua', items: []},
  riel: { name: 'Louis David Riel', items: [Product.wooden_sword(1)]},
  picasse: { name: 'Picasse', items: [Product.wooden_sword(1)]}
};

for(var key in Hero.allHeroes) {
  Hero.define(key, Hero.allHeroes[key]);
};
