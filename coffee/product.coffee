###
   Trollbridge-Armours/Product
   (C) 2011 by Thomas R. Koll, ananasblau.com
###
class Product
  constructor: (attr) ->
    this.name = attr.name;
    this.value = Math.abs(attr.value)||1;
    this.amount = attr.amount||1;

  to_s: ->
    this.amount + "x " + this.name

  @define: (name, defaults) ->
    Product[name] = (amount) ->
      p = new Product(defaults);
      p.amount = amount||1;
      p

  @random: ->
    keys = Object.keys(Product.allProducts)
    Product[keys[Math.floor(Math.random() * keys.length)]].call()
