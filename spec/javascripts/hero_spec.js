describe("Hero", function() {
  beforeEach(function() {
    hero = new Hero({name: 'Thomas the Wellfed'});
  });

  it("should have name", function() {
    expect(hero.name).toBe('Thomas the Wellfed');
  });
  it("should have empty inventory", function() {
    expect(hero.inventory).toBeDefined();
    expect(new Hero({name: 'Earth', items: [42]}).inventory.items[0]).toEqual(42);
  });
  it("should have image", function() {
    expect(hero.image).toEqual('Thomas the Wellfed.png');
  });
  it("should have money", function() {
    expect(hero.money).toBeDefined();
  });
  it("shoulve have wishlist", function() {
    expect(hero.wishlist).toBeDefined();
  });
  it("should be present", function() {
    expect(hero.present).toBeTruthy();
  });
  it("#leave", function() {
    hero.leave();
    expect(hero.present).toBeFalsy();
  });
  it("#arrive", function() {
    expect(hero.wishlist.length).toEqual(0);
    hero.leave().arrive();
    expect(hero.wishlist.length).toEqual(1);
    expect(typeof(hero.wishlist[0])).toEqual('object');
  });
});