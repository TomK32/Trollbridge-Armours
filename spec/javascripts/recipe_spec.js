describe("Recipe", function() {
  beforeEach(function() {
    recipe = new Recipe({name: 'Wooden Sword', ingredients: [Ingredient.oak_wood(3), Ingredient.leather(1)], products: [Product.wooden_sword()]});
  });
  it("should have name", function() {
    expect(recipe.name).toEqual('Wooden Sword');
  });
  it("should use product's name as fallback", function() {
    var r = new Recipe({ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank()]});
    expect(r.name).toEqual('Oak Plank');
  });
  it("should have ingredients", function() {
    expect(recipe.ingredients).toEqual([Ingredient.oak_wood(3), Ingredient.leather(1)]);
  });
  it("#to_s", function() {
    expect(recipe.to_s()).toEqual('Wooden Sword (3x Oak Wood, 1x Leather)');
  });
  describe("pre-defined recipes", function() {
    it("should have oak_plank", function() {
      var recipe = Recipe.oak_plank();
      expect(recipe.ingredients).toEqual([Ingredient.oak_wood(2)]);
      expect(recipe.products).toEqual([Ingredient.oak_plank(1)]);
    });
  });
  describe("#match", function() {
    it("should match against ingredients", function() {
      expect(recipe.match([Ingredient.oak_wood(3), Ingredient.leather(1)])).toBeTruthy();
    });
    it("should not match if too much of one ingredient", function() {
      expect(recipe.match([Ingredient.oak_wood(3), Ingredient.leather(2)])).toBeFalsy();
    });
    it("should not match if not enough of one ingredient", function() {
      expect(recipe.match([Ingredient.oak_wood(2), Ingredient.leather(2)])).toBeFalsy();
    });
    it("should not match if ingredient is missing", function() {
      expect(recipe.match([Ingredient.oak_wood(3)])).toBeFalsy();
    });
    it("should not match if unused ingredient", function() {
      expect(recipe.match([Ingredient.oak_wood(3), Ingredient.leather(1), Ingredient.oak_plank(1)])).toBeFalsy();
    });
  });
  describe("#fuzzyMatch", function() {
    it("should match against ingredients", function() {
      expect(recipe.fuzzyMatch([Ingredient.oak_wood(3), Ingredient.leather(1)])).toBeTruthy();
    });
    it("should fuzzyMatch if too much of one ingredient", function() {
      expect(recipe.fuzzyMatch([Ingredient.oak_wood(3), Ingredient.leather(2)])).toBeTruthy();
    });
    it("should not fuzzyMatch if not enough of one ingredient", function() {
      expect(recipe.fuzzyMatch([Ingredient.oak_wood(2), Ingredient.leather(2)])).toBeFalsy();
    });
    it("should not fuzzyMatch if ingredient is missing", function() {
      expect(recipe.fuzzyMatch([Ingredient.oak_wood(3)])).toBeFalsy();
    });
    it("should fuzzyMatch if unused ingredient", function() {
      expect(recipe.fuzzyMatch([Ingredient.oak_wood(3), Ingredient.leather(1), Ingredient.oak_plank(1)])).toBeTruthy();
    });
  });
});