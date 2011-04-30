describe("Hero", function() {
  beforeEach(function() {
    hero = new Hero('Thomas the Wellfed');
  });

  it("should have name", function() {
    expect(hero.name).toBe('Thomas the Wellfed');
  });
});