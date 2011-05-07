describe("Game", function() {
  beforeEach(function() {
    game = new Game();
  });
  it("should init", function() {
    expect(new Game()).toBeDefined();
  });
  it("should have player", function() {
    expect(game.player).toBeDefined();
  })
  it("should have inventory", function() {
    expect(game.inventory).toBeDefined();
  });
  it("should have recipes", function() {
    expect(game.player.recipes).toBeDefined();
  });
  it("should have heroes", function() {
    expect(game.heroes).toBeDefined();
  });
  describe("combine", function() {
    beforeEach(function() {
      game.inventory.items = [];
    });
    it("should for one ingredient", function() {
      game.inventory.add(Ingredient.oak_wood(6));
      expect(game.inventory.find('Oak Plank')).toBeFalsy();
      // by default it should use up make only 1
      expect(game.combine(Recipe.oak_plank)).toBeTruthy();
      expect(game.inventory.find('Oak Wood').amount).toEqual(3);
      expect(game.inventory.find('Oak Plank').amount).toEqual(1);
    });
    it("should for two ingredients", function() {
      game.inventory.add(Ingredient.oak_plank(2));
      game.inventory.add(Ingredient.leather(1));
      expect(game.inventory.find('Wooden Sword')).toBeFalsy();
      // by default it should use up make only 1
      expect(game.combine(Recipe.wooden_sword)).toBeTruthy();
      expect(game.inventory.find('Oak Plank')).toBeFalsy();
      expect(game.inventory.find('Leather')).toBeFalsy();
      expect(game.inventory.find('Wooden Sword').amount).toEqual(1);
    });
    it("should not work if not enough ingredients", function() {
      game.inventory.items = [];
      expect(game.combine(Recipe.oak_plank)).toBeFalsy();
      game.inventory.add(Ingredient.oak_wood(1))
      expect(game.combine(Recipe.oak_plank)).toBeFalsy()
    });
    it("for a higher amount", function() {
      game.inventory.add(Ingredient.oak_wood(6));
      expect(game.inventory.find('Oak Plank')).toBeFalsy();
      expect(game.combine(Recipe.oak_plank, 3)).toBeFalsy();
      expect(game.combine(Recipe.oak_plank, 2)).toBeTruthy();
      
    });
  });
  describe("findRecipesFor", function() {
    beforeEach(function() {
      game.player.recipes = [Recipe.oak_plank, Recipe.wooden_sword, Recipe.wooden_shield];
    });
    it("should match", function() {
      expect(game.findRecipesFor([Ingredient.oak_wood(3)])).toEqual([Recipe.oak_plank]);
    });
    it("should match all", function() {
      expect(game.findRecipesFor([Ingredient.oak_plank(10), Ingredient.leather(2)])).toEqual([Recipe.wooden_sword, Recipe.wooden_shield]);
    });
    it("should not match", function() {
      expect(game.findRecipesFor([Ingredient.oak_wood(1)])).toEqual([]);
    });
    it("should match if too many ingredients", function() {
      expect(game.findRecipesFor([Ingredient.oak_wood(3)])).toEqual([Recipe.oak_plank]);
    });
    it("should match if too many ingredients", function() {
      expect(game.findRecipesFor([Ingredient.oak_plank(1), Ingredient.oak_wood(3)])).toEqual([Recipe.oak_plank]);
    });
  });
  describe("#sellItem", function() {
    beforeEach(function() {
      game.player = new Player();
      game.player.inventory.add(Product.wooden_sword(2));
      hero = new Hero({name: 'Hulk'});
      hero.wishlist.add(Product.wooden_sword(1));
    });
    it("should move item to hero", function() {
      expect(game.sellItem(Product.wooden_sword(1), hero)).toBeTruthy();
      expect(hero.inventory.find('Wooden Sword',1)).toBeTruthy();
    });
    it("should not if player has no stock", function() {
      hero.wishlist.add(Product.wooden_shield(1));
      expect(game.sellItem(Product.wooden_shield(1), hero)).toBeFalsy();
    });
    it("should limit to match player's stock", function() {
      expect(game.sellItem(Product.wooden_sword(3), hero)).toBeTruthy();
      expect(game.player.inventory.find('Wooden Sword')).toBeFalsy();
      expect(hero.inventory.find('Wooden Sword').amount).toEqual(2);
    });
    it("should not if hero doesn't want it", function() {
      game.player.inventory.add(Product.wooden_shield(1));
      expect(game.sellItem(Product.wooden_shield(1), hero)).toBeFalsy();
    });
  });
  describe("#buyItem", function() {
    beforeEach(function() {
      game.player.inventory.items = [];
      game.player.money = 10;
      hero = new Hero({name: 'Hulk'});
      hero.inventory.add(Ingredient.oak_plank(1));
      hero.inventory.add(Ingredient.oak_wood(5));
    });
    it("should move item to player", function() {
      expect(game.buyItem(Ingredient.oak_wood(1), hero)).toBeTruthy();
      expect(game.inventory.find('Oak Wood',1)).toBeTruthy();
    });
    it("should subtrack money from player", function() {
      expect(game.player.money).toEqual(10);
      expect(game.buyItem(Ingredient.oak_wood(1), hero)).toBeTruthy();
      expect(game.player.money).toEqual(9);
      
    });
    it("should fail if not enough money", function() {
      game.player.money = 0;
      expect(game.buyItem(Ingredient.oak_wood(1), hero)).toBeFalsy();
    });
    it("should fail if item is not for sale", function() {
      game.player.money = 20;
      var oak = Ingredient.oak_wood(1);
      oak.forSale = false;
      expect(game.buyItem(oak, hero)).toBeFalsy();
    });
  });
});
