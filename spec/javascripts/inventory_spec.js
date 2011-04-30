describe("Inventory", function() {
  beforeEach(function() {
    inventory = new Inventory();
  });
  it("should have items", function() {
    expect(inventory.items).toBeDefined();
  });
  it("should find items", function() {
    expect(inventory.find('Oak Wood')).toEqual(false);
    inventory.items = [Ingredient.oak_wood(2)];
    expect(inventory.find('Oak Wood').name).toEqual('Oak Wood');
    expect(inventory.find('Oak Wood').amount).toEqual(2);
  });
  describe("stock management", function() {
    it("should add Ingredient", function() {
      expect(inventory.items.length).toEqual(0);
      expect(inventory.add(Ingredient.oak_wood(3)).find('Oak Wood').amount).toEqual(3);
      expect(inventory.add(Ingredient.oak_wood(2)).find('Oak Wood').amount).toEqual(5);
      expect(inventory.items.length).toEqual(1);
    });
    it("should remove Ingredient", function() {
      expect(inventory.items.length).toEqual(0);
      expect(inventory.add(Ingredient.oak_wood(3)).find('Oak Wood').amount).toEqual(3);
      expect(inventory.remove(Ingredient.oak_wood(2)).find('Oak Wood').amount).toEqual(1);
      expect(inventory.items.length).toEqual(1);
    });
    it("should not allow negative amounts", function() {
      expect(inventory.items.length).toEqual(0);
      expect(inventory.remove(Ingredient.oak_wood(2))).toEqual(false);
      expect(inventory.items.length).toEqual(0);
    });
  });
  describe("combine", function() {

  });
});