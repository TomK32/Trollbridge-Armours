describe("Recipe", function() {
  beforeEach(function() {
    recipe = new Recipe({name: 'Wooden Sword', ingredients: [Ingredient.oak_wood(3), Ingredient.leather(1)], products: [Product.wooden_sword]});
  });
  it("should have name", function() {
    expect(recipe.name).toEqual('Wooden Sword');
  });
  it("should use product's name as fallback", function() {
    var r = new Recipe({ingredients: [Ingredient.oak_wood(2)], products: [Ingredient.oak_plank(1)]});
    expect(r.name).toEqual('Oak Plank');
  });
  it("should have ingredients", function() {
    expect(recipe.ingredients).toEqual([Ingredient.oak_wood(3), Ingredient.leather(1)]);
  });
  it("#to_s", function() {
    expect(recipe.to_s()).toEqual('Wooden Sword (3x Oak Wood, 1x Leather)');
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
  describe("#incrementCounter", function() {
    beforeEach(function() {
      for (c in Recipe) {
        Recipe[c].counter = 0;
      }
    });
    it("should increment counter", function() {
      expect(recipe.incrementCounter(4).counter).toEqual(4);
      expect(recipe.incrementCounter(2).counter).toEqual(6);
    });
    it("should return new recipes", function() {
      var lark_plank = Recipe.define('lark_plank', {name: 'Lark Plank', requirements: [[Recipe.oak_plank, 10]]});
      expect(Recipe.oak_plank.children()).toContain(lark_plank);
      Recipe.oak_plank.incrementCounter(10);
      expect(Recipe.oak_plank.childrenAvailable()).toContain(lark_plank);
    });
    it("should return new recipes for complicated tree", function() {
      var wooden_shield = Recipe.define('wooden_shield', {name: 'Wooden Shield', requirements: [[Recipe.oak_plank, 10], [Recipe.wooden_sword, 1]]});
      Recipe.oak_plank.incrementCounter(10);
      expect(Recipe.oak_plank.childrenAvailable()).not.toContain(Recipe.wooden_shield);
      Recipe.wooden_sword.incrementCounter(1);
      expect(Recipe.oak_plank.childrenAvailable()).toContain(Recipe.wooden_shield);
    });
  });
  describe("tech tree", function() {
    it("should have requirements", function() {
      expect(recipe.requirements).toBeDefined();
      expect(recipe.requirements).toEqual([]);
    });
    it("should have children", function() {
      expect(recipe.children()).toBeDefined();
    });
    it("should have counter", function() {
      expect(new Recipe({name:'Beer'}).counter).toEqual(0);
    });
  });
  it("#roots", function() {
    var p,c;
    p = Recipe.define('parent', {name: 'parent'})
    c = Recipe.define('child', {name: 'child', requirements: [[p, 1]]})
    expect(Recipe.roots()).toContain(p);
    expect(Recipe.roots()).not.toContain(c);
  });
});