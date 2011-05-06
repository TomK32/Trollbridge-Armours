var Money;
Money = (function() {
  function Money() {}
  Money.transfer = function(target, amount) {
    if (this.money < amount) {
      return false;
    }
    this.money -= amount;
    target.money += amount;
    return this;
  };
  return Money;
})();