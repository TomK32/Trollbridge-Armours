class Ingredient

  constructor: (attrs) ->
    @name = attrs.name
    @category = attrs.category||'Something'
    @amount = attrs.amount||1
    @value =  attrs.value||1
    @forSale = attrs.sale||true
  @define: (name, defaults) ->
    Ingredient[name] = (amount) ->
      i = new Ingredient(defaults)
      i.amount = amount||1;
      i
  to_s: ->
    if @amount > 0
      @amount + "x " + @name + " (" + @category + ")"
    else
      @name + " (" + @category + ")"

  @random: ->
    keys = Object.keys Ingredient.allIngredients
    Ingredient[keys[Math.floor(Math.random() * keys.length)]].call()
