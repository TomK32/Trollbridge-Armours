Ingredient.allIngredients =
  oak_wood: { name: 'Oak Wood', category: 'Wood', value: 1}
  oak_plank: { name: 'Oak Plank', category: 'Plank', value: 3}
  leather: { name: 'Leather', category: 'Leather', value: 2}
  copper_ore: { name: 'Copper Ore', category: 'Ore', value: 2}
  copper: { name: 'Copper', category: 'Metal', value: 7}
  tin: { name: 'Tin', category: 'Ore', value: 3}
  bronze: { name: 'Bronze', category: 'Metal', value: 3 }
  iron_ore: { name: 'Iron Ore', category: 'Ore', value: 2}
  iron: { name: 'Iron', category: 'Metal', value: 7 }

for key in Object.keys Ingredient.allIngredients
  Ingredient.define(key, Ingredient.allIngredients[key]);

Product.allProducts =
  club: { name: 'Club', category: 'Club', value: 2}
  leather_boots: { name: 'Leather Boots', category: 'Boots', value: 3 }
  wooden_sword: { name: 'Wooden Sword', category: 'Sword', value: 10 }
  wooden_shield: { name: 'Wooden Shield', category: 'Shield', value: 8 }
  bow: { name: 'Bow', category: 'Bow', value: 5 }
  long_bow: { name: 'Long Bow', category: 'Bow', value: 8 }
  arrow: { name: 'Arrow', category: value: 1 }
  bronze_sword: { name: 'Bronze Sword', category: 'Sword', value: 15 }
  iron_sword: { name: 'Iron Sword', category: 'Sword', value: 25 }
  iron_helmet: { name: 'Iron Helmet', category: 'Headgear', value: 20 }
  axe: { name: 'Axe', category: 'Axe', value: 20 }
  halberd: { name: 'Halberd', category: 'Infantry', value: 22 }
  pike: { name: 'Pike', category: 'Infantry', value: 22 }
  mask: { name: 'Wooden Mask', category: 'Headgear', value: 8 }

for key in Object.keys Product.allProducts
  Product.define(key, Product.allProducts[key]);

allRecipes =
  oak_plank:
    ingredients: [Ingredient.oak_wood(3)]
    products: [Ingredient.oak_plank(1)]
  leather_boots:
    ingredients: [Ingredient.leather(1)]
    products: [Product.leather_boots(1)]
  club:
    ingredients: [Ingredient.oak_wood(1)]
    products: [Product.club(1)]
  wooden_sword:
    ingredients: [Ingredient.oak_plank(2), Ingredient.leather(1)]
    products: [Product.wooden_sword(1)]
    requirements: [['Recipe.club', 2], ['Recipe.oak_plank', 3]]
  wooden_shield:
    ingredients: [Ingredient.oak_plank(2)]
    products: [Product.wooden_shield(1)]
    requirements: [['Recipe.oak_plank', 2]]
  bow:
    ingredients: [Ingredient.oak_wood(2), Ingredient.leather(1)]
    products: [Product.bow(1)]
  long_bow:
    ingredients: [Ingredient.oak_plank(2), Ingredient.leather(1)]
    products: [Product.long_bow(1)]
    requirements: [['Recipe.bow', 2]]
  arrows:
    name: '10 Arrows'
    ingredients: [Ingredient.oak_wood(4)]
    products: [Product.arrow(10)]
    requirements: [['Recipe.bow', 1]]
  copper:
    ingredients: [Ingredient.copper_ore(3)]
    products: [Ingredient.copper(1)]
  bronze:
    ingredients: [Ingredient.copper(3), Ingredient.tin(1)]
    products: [Ingredient.bronze(1)],
    requirements: [['Recipe.copper', 4]]
  bronze_sword:
    ingredients: [Ingredient.bronze(3), Ingredient.leather(1)]
    products: [Product.bronze_sword(1)]
    requirements: [['Recipe.bronze', 3]]
  iron:
    ingredients: [Ingredient.iron_ore(3)]
    products: [Ingredient.iron(1)]
    requirements: [['Recipe.bronze', 2]]
  iron_sword:
    ingredients: [Ingredient.iron(3), Ingredient.leather(1)]
    products: [Product.iron_sword(1)]
    requirements: [['Recipe.iron', 3], ['Recipe.wooden_sword', 2]]
  iron_helmet:
    ingredients: [Ingredient.iron(2), Ingredient.leather(1)]
    products: [Product.iron_helmet(1)]
    requirements: [['Recipe.iron_sword', 1]]
  pike:
    ingredients: [Ingredient.oak_wood(4), Ingredient.iron(1)]
    products: [Product.pike(1)]
    requirements: [['Recipe.club', 3], ['Recipe.iron', 1]]
  axe:
    ingredients: [Ingredient.oak_wood(1), Ingredient.iron(2)]
    products: [Product.axe(1)]
    requirements: [['Recipe.club', 3], ['Recipe.iron', 1]]
  halberd:
    ingredients: [Product.axe(1), Ingredient.oak_plank(1)]
    products: [Product.halberd(1)]
    requirements: [['Recipe.axe', 2]]
  mask:
    requirements: [['Recipe.oak_plank', 10]]
    ingredients: [Ingredient.oak_plank(1), Ingredient.oak_wood(1)]
    products: [Product.mask(1)]


for key in Object.keys allRecipes
  Recipe.define(key, allRecipes[key]);


Hero.allHeroes = {
  wendy: { name: 'Windy Wendy', items: [Product.iron_sword(1), Product.wooden_shield(1)]},
  cagua: { name: 'Cagua', items: []},
  riel: { name: 'Louis David Riel', items: [Product.wooden_sword(1)]},
  picasse: { name: 'Picasse', items: [Product.wooden_sword(1)]}
};

for key in Object.keys Hero.allHeroes
  Hero.define(key, Hero.allHeroes[key]);
