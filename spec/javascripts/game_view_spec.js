describe("GameView", function() {
  beforeEach(function() {
    $("#jasmine_content").html('<div id="game_view"></div>');
    game = new Game();
    game.inventory.add(Ingredient.oak_wood(20));
    game.inventory.add(Ingredient.leather(10));
    game_view = new GameView('game_view', game);
  });
  afterEach(function() {
    $("svg").remove();
  });
  it("should work", function() {
    expect(game_view).toBeDefined();
  });
  it("should have inventory view", function() {
    expect(game_view.inventory_view).toBeDefined();
  });
  it("should have inventory view", function() {
    expect(game_view.workbench_view).toBeDefined();
  });
  describe("selectIngredient", function() {
    it("should add item to workbench", function() {
      game_view.selectIngredient(Ingredient.oak_wood(1));
      expect(game_view.workbench_view.inventory.find('Oak Wood', 1).amount).toEqual(1);
      game_view.selectIngredient(Ingredient.oak_wood(14));
      expect(game_view.workbench_view.inventory.find('Oak Wood').amount).toEqual(15);
      game_view.selectIngredient(Ingredient.oak_wood(1));
      expect(game_view.workbench_view.inventory.find('Oak Wood').amount).toEqual(16);
    });
    it("should respect availability", function() {
      game_view.selectIngredient(Ingredient.oak_wood(19));
      game_view.selectIngredient(Ingredient.oak_wood(2));
      expect(game_view.workbench_view.inventory.find('Oak Wood').amount).toEqual(20);
    });
  });
});
