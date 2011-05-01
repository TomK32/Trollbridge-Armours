describe("Hero", function() {
  beforeEach(function() {
    hero = new Hero('Thomas the Wellfed');
  });

  it("should have name", function() {
    expect(hero.name).toBe('Thomas the Wellfed');
  });
  it("should have empty inventory", function() {
    expect(hero.inventory).toBeDefined();
    expect(new Hero('Earth', [42]).inventory.items[0]).toEqual(42);
  });
  it("should have image", function() {
    expect(hero.image).toEqual('Thomas the Wellfed.png');
  });
});