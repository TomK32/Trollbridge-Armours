describe("Recipe", function() {
  beforeEach(function() {
    recipe = new Recipe('Wooden Sword');
  });
  it("should have name", function() {
    expect(recipe.name).toEqual('Wooden Sword');
  });
  it("should have ingredients", function() {
    expect(recipe.ingredients).toEqual([new Ingredient('Wood'), new Ingredient('Leather')]);
  });
});