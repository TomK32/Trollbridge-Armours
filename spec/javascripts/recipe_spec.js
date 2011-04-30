describe("Recipe", function() {
  beforeEach(function() {
    recipe = new Recipe('Wooden Sword', [Ingredient.oak_wood(3), Ingredient.leather(1)]);
  });
  it("should have name", function() {
    expect(recipe.name).toEqual('Wooden Sword');
  });
  it("should have ingredients", function() {
    expect(recipe.ingredients).toEqual([Ingredient.oak_wood(1), Ingredient.leather(3)]);
  });
});