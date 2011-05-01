describe("Ingredient", function() {
  beforeEach(function() {
    oak_wood = new Ingredient({name: 'Oak Wood', category: 'Wood'});
    leather = new Ingredient({name: 'Leather'});
  });
  it("should have name", function() {
    expect(oak_wood.name).toEqual('Oak Wood');
  });
  it("should have category", function() {
    expect(oak_wood.category).toEqual('Wood');
  });
  it("should use name as fall-back category", function() {
    expect(new Ingredient({name: 'Something'}).category).toEqual('Something');
  });
  it("#to_s", function() {
    oak_wood.amount = 0;
    expect(oak_wood.to_s()).toEqual('Oak Wood (Wood)');
    oak_wood.amount = 5;
    expect(oak_wood.to_s()).toEqual('5x Oak Wood (Wood)');
  });

  describe("pre-defined ingredients", function() {
    describe("woods", function() {
      it("should have oak wood", function() {
        expect(Ingredient.oak_wood().name).toEqual('Oak Wood');
      });
      it("should have leather", function() {
        expect(Ingredient.leather().category).toEqual('Leather');
      });
    });
  });
  describe("amount", function() {
    it("should be 1 by default", function() {
      expect(oak_wood.amount).toEqual(1);
    });
  });
  it("should be for sale", function() {
    expect(new Ingredient({name: 'Air'}).forSale).toBeTruthy();
  });
});