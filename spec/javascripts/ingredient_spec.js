describe("Ingredient", function() {
  beforeEach(function() {
    oak_wood = new Ingredient('Oak wood', 'Wood');
    leather = new Ingredient('Leather');
  });
  it("should have name", function() {
    expect(oak_wood.name).toEqual('Oak wood');
  });
  it("should have category", function() {
    expect(oak_wood.category).toEqual('Wood');
  });
  it("should use name as fall-back category", function() {
    expect(new Ingredient('Something').category).toEqual('Something');
  });

  describe("pre-defined ingredients", function() {
    describe("woods", function() {
      it("should have oak wood", function() {
        expect(Ingredient.oak_wood().name).toEqual('Oak Wood');
      });
    });
  });
  describe("amount", function() {
    it("should be 0 by default", function() {
      // should be 0 b
      expect(oak_wood.amount).toEqual(0);
    });
  });
});