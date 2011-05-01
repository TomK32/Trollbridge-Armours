describe("Inventory", function() {
  beforeEach(function() {
    inventory = new Inventory();
  });
  it("should have items", function() {
    expect(inventory.items).toBeDefined();
  });
  describe("find", function() {
    it("should find items by name", function() {
      expect(inventory.find('Oak Wood')).toEqual(false);
      inventory.items = [Ingredient.oak_wood(2)];
      expect(inventory.find('Oak Wood').name).toEqual('Oak Wood');
      expect(inventory.find('Oak Wood').amount).toEqual(2);
    });
    it("should find items by name and amount", function() {
      inventory.items = [Ingredient.oak_wood(2)];
      expect(inventory.find('Oak Wood', 1)).toEqual(Ingredient.oak_wood(1));
      expect(inventory.find('Oak Wood', 2)).toEqual(Ingredient.oak_wood(2));
      expect(inventory.find('Oak Wood', 3)).toEqual(false);
    });
    it("should find items and ignore item's amout if second argument is 0", function() {
      inventory.items = [Ingredient.oak_wood(3)];
      expect(inventory.find('Oak Wood', 0)).toEqual(Ingredient.oak_wood(3));
      expect(inventory.find(Ingredient.oak_wood(1), 0)).toEqual(Ingredient.oak_wood(3));
      expect(inventory.find('Oak Wood', 4)).toEqual(false);
    });
    it("should find by other Ingredient", function() {
      expect(inventory.find('Oak Wood')).toBeFalsy();
      inventory.items = [Ingredient.oak_wood(2)];
      expect(inventory.find(Ingredient.oak_wood(1)).amount).toEqual(1);
      expect(inventory.find(Ingredient.oak_wood(2))).toBeTruthy();
      expect(inventory.find(Ingredient.oak_wood(3))).toBeFalsy();
    });
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
    it("should remove item if amount 0", function() {
      inventory.add(Ingredient.oak_wood(2));
      expect(inventory.remove(Ingredient.oak_wood(1)).find('Oak Wood').amount).toEqual(1);
      expect(inventory.remove(Ingredient.oak_wood(1))).toBeTruthy();
      expect(inventory.find('Oak Wood')).toEqual(false);
    });
    it("should not allow negative amounts", function() {
      expect(inventory.items.length).toEqual(0);
      expect(inventory.remove(Ingredient.oak_wood(2))).toEqual(false);
      expect(inventory.items.length).toEqual(0);
    });
  });
  it("#compact", function() {
    inventory.items = [new Ingredient('Air', 0)];
    expect(inventory.find('Air')).toBeDefined();
    inventory.compact();
    expect(inventory.find('Air')).toBeFalsy();
  });
});