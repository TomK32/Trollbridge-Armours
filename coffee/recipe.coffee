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
    @counter = 0
    @satisfied = false

  fuzzyMatch: (other_ingredients) ->
    i = new Inventory($.extend([], other_ingredients))
    for ingredient in @ingredients
      if !i.find(ingredient) then return false
    i

  incrementCounter: (amount) ->
    @counter += amount
    @

  children: ->
    result = []
    for child in Recipe.all
      for req in child.requirements
        if typeof(req[0]) == 'string'
          req[0] = eval(req[0])
        if req[0].name == @.name then result.push child
    result

  childrenAvailable: ->
    result = []
    for child in @children()
      result.push child if child.available()
    result

  available: ->
    if @satisfied then return true
    for requirement in @requirements
      if typeof(requirement[0]) == 'string'
        requirement[0] = eval(requirement[0])
      if requirement[0].counter < requirement[1] then return false
    @satisfied = true
    @

  to_s: ->
    s = []
    if @satisfied || @requirements.length == 0
      prefix = ""
      for ingredient in @ingredients
        s.push(ingredient.amount + 'x ' + ingredient.name)
    else
      prefix = "make "
      for requirement in @requirements
        s.push(requirement[1] + 'x ' + requirement[0].name)
    return @name + ' (' + prefix + s.join(', ') + ')'

  @roots: ->
    result = []
    for recipe in @all
      if recipe.requirements.length == 0 then result.push recipe
    result

  @define = (name, attr) ->
    recipe = new Recipe(attr)
    Recipe.all.push recipe
    Recipe[name] = recipe
