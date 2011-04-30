describe("Inventory", function() {
  beforeEach(function() {
    inventory = new Inventory();
  });
  it("should have items", function() {
    expect(inventory.items).toBeDefined();
  });
});