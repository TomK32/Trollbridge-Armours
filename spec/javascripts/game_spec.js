describe("Game", function() {
  beforeEach(function() {
    game = new Game();
  });
  it("should init", function() {
    expect(new Game()).toBeDefined();
  });
  it("should have player", function() {
    expect(game.player).toBeDefined();
  })
});
