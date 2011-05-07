/*
   Trollbridge-Armours/Money
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Money;
Money = (function() {
  function Money() {}
  Money.prototype.transfer = function(target, amount) {
    if (this.money < amount) {
      return false;
    }
    this.money -= amount;
    return target.money += amount;
  };
  return Money;
})();