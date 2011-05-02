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
    expect(game.recipes).toBeDefined();
    expect(game.player.recipes).toBeDefined();
  });
  it("should have heroes", function() {
    expect(game.heroes).toBeDefined();
  });
  describe("combine", function() {
    it("should for one ingredient", function() {
      game.inventory.add(Ingredient.oak_wood(4));
      expect(game.inventory.find('Oak Plank')).toBeFalsy();
      // by default it should use up make only 1
      expect(game.combine(Recipe.oak_plank())).toBeTruthy();
      expect(game.inventory.find('Oak Wood').amount).toEqual(2);
      expect(game.inventory.find('Oak Plank').amount).toEqual(1);
    });
    it("should for two ingredients", function() {
      game.inventory.add(Ingredient.oak_plank(1));
      game.inventory.add(Ingredient.leather(3));
      expect(game.inventory.find('Wooden Sword')).toBeFalsy();
      // by default it should use up make only 1
      expect(game.combine(Recipe.wooden_sword())).toBeTruthy();
      expect(game.inventory.find('Oak Plank')).toBeFalsy();
      expect(game.inventory.find('Leather').amount).toEqual(2);
      expect(game.inventory.find('Wooden Sword').amount).toEqual(1);
    });
    it("should not work if not enough ingredients", function() {
      game.inventory.items = [];
      expect(game.combine(Recipe.oak_plank())).toBeFalsy();
      game.inventory.add(Ingredient.oak_wood(1))
      expect(game.combine(Recipe.oak_plank())).toBeFalsy()
    });
  });
  describe("findRecipeFor", function() {
    beforeEach(function() {
      game.player.recipes = [Recipe.oak_plank(), Recipe.wooden_sword()];
    });
    it("should match", function() {
      expect(game.findRecipeFor([Ingredient.oak_wood(2)])).toEqual(Recipe.oak_plank());
    });
    it("should not match", function() {
      expect(game.findRecipeFor([Ingredient.oak_wood(1)])).toBeFalsy();
    });
    it("should match if too many ingredients", function() {
      expect(game.findRecipeFor([Ingredient.oak_wood(3)])).toEqual(Recipe.oak_plank());
    });
    it("should match if too many ingredients", function() {
      expect(game.findRecipeFor([Ingredient.oak_plank(1), Ingredient.oak_wood(3)])).toEqual(Recipe.oak_plank());
    });
  });
  describe("#sellItem", function() {
    beforeEach(function() {
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
