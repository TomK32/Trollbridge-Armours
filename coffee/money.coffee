class Money
  @transfer: (target, amount) ->
    if this.money < amount then return false
    this.money -= amount
    target.money += amount
    @