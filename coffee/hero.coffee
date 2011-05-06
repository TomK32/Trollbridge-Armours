class Hero extends Money
  constructor: (attr) ->
    @name = attr.name
    @image = attr.image || (attr.name + '.png')
    @inventory = new Inventory attr.items
    @money = 20
    @present = true
    @wishlist = new Inventory


  leave: ->
    if @wishlist.items.length > 0 and Math.random < 0.1
      @wishlist.items[Math.floor(@wishlist.items.length*Math.random)]
    @present = false
    @

  arrive: ->
    @present = true
    @inventory.add Ingredient.random()
    @wishlist.add Product.random()
    @

  @define: (name, defaults) ->
    Hero[name] = ->
      new Hero(defaults)

  @random: ->
    keys = Object.keys Hero.allHeroes
    Hero[keys[Math.floor(Math.random() * keys.length)]]
