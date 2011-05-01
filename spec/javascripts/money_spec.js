describe("Money", function() {
  beforeEach(function() {
    accountA = new Player({name: 'Account A'});
    accountA.money = 10;
    accountB = new Hero({name: 'Account B'});
    accountB.money = 30;
  });
  describe("#transfer", function() {
    it("with enough deposit", function() {
      expect(accountB.transfer(accountA, 20)).toBeTruthy();
    });
    it("should transfer money", function() {
      accountB.transfer(accountA, 15);
      expect(accountA.money).toEqual(25);
      expect(accountB.money).toEqual(15);
    });
    it("should not transfer if not enough deposit", function() {
      expect(accountB.transfer(accountA, 35)).toBeFalsy();
      expect(accountA.money).toEqual(10);
      expect(accountB.money).toEqual(30);
    });
  });
});