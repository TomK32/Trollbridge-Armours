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
});