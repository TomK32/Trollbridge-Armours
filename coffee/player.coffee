###
   Trollbridge-Armours/Player
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Player extends Money

  constructor: (args) ->
    @name = name||'Thomas'
    @inventory = new Inventory()
    @money = 10
    @recipes = []