###
   Trollbridge-Armours/Game
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Game
  @version = '0.1.1'
  constructor: ->
    @player = new Player()
    @inventory = @player.inventory
    @heroes = []
    @timer = @startLoop()
    @game_view = false


  toggleLoop: ->
    if @timer then @stopLoop() else @startLoop()


  startLoop: ->
    if @timer then false
    @timer = setInterval(@tick, 333, @) # ~ 3/sec

  stopLoop: ->
    clearInterval(@timer)
    @timer = false

  tick: (game) ->
    if !game.game_view then return false
    if Math.random() <0.1
      hero = game.heroes[Math.floor(Math.random()*game.heroes.length)]
      if hero
        if hero.present then hero.leave() else hero.arrive()
        game.game_view.redraw(true)
        game.game_view.heroes_view.redraw()

  sellItem: (item) ->
    if !hero.wishlist.find(item,0) || !@player.inventory.find(item,0) then return false
    @player.inventory.remove(item)
    @player.money += (item.value * item.amount)
    @player.lastSale = [item.name, item.value * item.amount]
    hero.wishlist.remove(item)
    hero.inventory.add(item)
    if @game_view
      @game_view.player_view.redraw()
      @game_view.inventory_view.redraw()
    true

  buyItem: (item) ->
    o = $.extend({}, item)
    if !item.forSale || !item.value then return false
    o.amount = Math.min(item.amount, Math.floor(@player.money / item.value))
    if isNaN(o.amount) || o.amount < 1 then return false 
    @player.inventory.add(o)
    @player.money -= (o.amount * o.value)
    @player.lastSale = [o.name, -o.amount * o.value]
    hero.inventory.remove(o)
    if(@game_view)
      @game_view.player_view.redraw()
      @game_view.inventory_view.redraw()
    return true

  # return only the first matching
  findRecipeFor: (ingredients) ->
    for recipe in @player.recipes
      if recipe.fuzzyMatch(ingredients) then return(recipe) 
    return false


  combine: (recipe, amount) ->
    amount = amount||1 # default to 1

    for ingredient in recipe.ingredients
      if !@inventory.find(ingredient, ingredient.amount * amount)
        return false
    # all ingredients found
    for ingredient in recipe.ingredients
      @inventory.remove(ingredient, ingredient.amount * amount)

    for product in recipe.products
      @inventory.add(product, product.amount * amount)

    recipe.incrementCounter amount
    @recipes.concat recipe.childrenAvailable()
    @inventory.compact()
    return true
