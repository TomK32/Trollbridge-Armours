describe("Player", function() {
  beforeEach(function(){
    player = new Player();
  });

  it("should init", function() {
    expect(new Player()).toBeDefined();
  });

  it("should have name", function() {
    expect(player.name).toBe('Thomas');
  })
  it("should have inventory", function() {
    expect(player.inventory).toBeDefined();
  });
});
