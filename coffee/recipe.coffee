###
   Trollbridge-Armours/Recipe
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Recipe
  @all = []

  constructor: (attr) ->
    @name = attr.name||attr.products[0].name
    @ingredients = attr.ingredients || []
    @products = attr.products || []
    @requirements = attr.requirements||[]
    @children = attr.children||[]
    @counter = 0
    @satisfied = false

  match: (other_ingredients) ->
    o = @fuzzyMatch(other_ingredients)
    return(o && o.items.length == 0)


  fuzzyMatch: (other_ingredients) ->
    o = new Inventory($.extend([], other_ingredients))
    for ingredient in @ingredients
      if !o.remove(ingredient) then return false
    o

  incrementCounter: (amount) ->
    @counter += amount
    @

  childrenAvailable: ->
    result = []
    for child in @children
      result.push child if child.available()
    result

  available: ->
    if @satisfied then return true
    for requirement in @requirements
      if requirement[0].counter < requirement[1] then return false

    @satisfied = true
    @

  to_s: ->
    s = []
    for ingredient in @ingredients
      s.push(ingredient.amount + 'x ' + ingredient.name)

    return @name + ' (' + s.join(', ') + ')'

  @define: (name, defaults) ->
    Recipe.all[name] = new Recipe(defaults)
