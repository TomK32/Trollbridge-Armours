describe("Recipe", function() {
  beforeEach(function() {
    recipe = new Recipe({name: 'Wooden Sword', ingredients: [Ingredient.oak_wood(3), Ingredient.leather(1)], products: [Product.wooden_sword()]});
  });
  it("should have name", function() {
    expect(recipe.name).toEqual('Wooden Sword');
  });
  it("should have ingredients", function() {
    expect(recipe.ingredients).toEqual([Ingredient.oak_wood(3), Ingredient.leather(1)]);
  });
  it("#to_s", function() {
    expect(recipe.to_s()).toEqual('Wooden Sword');
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
  describe("#fuzzy_match", function() {
    it("should match against ingredients", function() {
      expect(recipe.fuzzy_match([Ingredient.oak_wood(3), Ingredient.leather(1)])).toBeTruthy();
    });
    it("should fuzzy_match if too much of one ingredient", function() {
      expect(recipe.fuzzy_match([Ingredient.oak_wood(3), Ingredient.leather(2)])).toBeTruthy();
    });
    it("should not fuzzy_match if not enough of one ingredient", function() {
      expect(recipe.fuzzy_match([Ingredient.oak_wood(2), Ingredient.leather(2)])).toBeFalsy();
    });
    it("should not fuzzy_match if ingredient is missing", function() {
      expect(recipe.fuzzy_match([Ingredient.oak_wood(3)])).toBeFalsy();
    });
    it("should fuzzy_match if unused ingredient", function() {
      expect(recipe.fuzzy_match([Ingredient.oak_wood(3), Ingredient.leather(1), Ingredient.oak_plank(1)])).toBeTruthy();
    });
  });
});