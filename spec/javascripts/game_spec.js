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
});
