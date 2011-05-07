###
   Trollbridge-Armours/Money
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Money
  transfer: (target, amount) ->
    if @money < amount then return false
    @money -= amount
    target.money += amount