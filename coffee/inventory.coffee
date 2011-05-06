###
   Trollbridge-Armours/Inventory
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Inventory
  constructor: (items) ->
    @items = items||[]

  # returns item if found and matching the (optional) amount
  find: (what, amount) ->
    if typeof(what) == "object"
      if typeof(amount) == "undefined" && what.amount
        amount = what.amount
      what = what.name

    for item in this.items
      if item.name == what
        if amount
          if item.amount >= amount
            n = jQuery.extend(true, {}, item)
            n.amount = amount
            return n
          else return false
        else
          return item
    false

  add: (other) ->
    stock = this.find(other.name)
    if stock
      stock.amount += other.amount
    else
      this.items.push($.extend(true, {}, other))

    return this


  remove: (other) ->
    stock = this.find(other.name)
    if(stock && stock.amount >= other.amount)
      stock.amount -= other.amount
      if(stock.amount == 0)
        this.items.splice(this.items.indexOf(stock),1)
        return true
      return this
    else return false

  compact: ->
    for item in this.items
      if(item.amount == 0) then item = _ref.splice(_i,1) # stupid hack...

