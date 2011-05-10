/*
   Trollbridge-Armours/Game
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Game;
Game = (function() {
  Game.version = '0.2';
  function Game() {
    this.player = new Player();
    this.inventory = this.player.inventory;
    this.heroes = [];
    this.timer = this.startLoop();
    this.game_view = false;
  }
  Game.prototype.toggleLoop = function() {
    if (this.timer) {
      return this.stopLoop();
    } else {
      return this.startLoop();
    }
  };
  Game.prototype.startLoop = function() {
    if (this.timer) {
      return false;
    }
    return this.timer = setInterval(this.tick, 50, this);
  };
  Game.prototype.stopLoop = function() {
    clearInterval(this.timer);
    return this.timer = false;
  };
  Game.prototype.tick = function(game) {
    var hero;
    if (!game.game_view) {
      return false;
    }
    if (Math.random() < 0.1) {
      hero = game.heroes[Math.floor(Math.random() * game.heroes.length)];
      if (hero) {
        if (hero.present) {
          hero.leave();
        } else {
          hero.arrive();
        }
        game.game_view.redraw(true);
        return game.game_view.heroes_view.redraw();
      }
    }
  };
  Game.prototype.sellItem = function(item, hero) {
    var o, player_item;
    if (!hero.wishlist.find(item, 0) || !this.player.inventory.find(item, 0)) {
      return false;
    }
    player_item = this.player.inventory.find(item, 0);
    if (!player_item) {
      return false;
    }
    o = $.extend(new item.constructor({}), item);
    o.amount = Math.min(player_item.amount, item.amount);
    this.player.money += player_item.value * o.amount;
    this.player.lastSale = [item.name, item.value * o.amount];
    this.player.inventory.remove(o);
    hero.wishlist.remove(o);
    hero.inventory.add(o);
    if (this.game_view) {
      this.game_view.player_view.redraw();
      this.game_view.inventory_view.redraw();
    }
    return true;
  };
  Game.prototype.buyItem = function(item, hero) {
    var o;
    o = $.extend(new item.constructor({}), item);
    if (!item.forSale || !item.value) {
      return false;
    }
    o.amount = Math.min(item.amount, Math.floor(this.player.money / item.value));
    if (isNaN(o.amount) || o.amount < 1) {
      return false;
    }
    this.player.inventory.add(o);
    this.player.money -= o.amount * o.value;
    this.player.lastSale = [o.name, -o.amount * o.value];
    hero.inventory.remove(o);
    if (this.game_view) {
      this.game_view.player_view.redraw();
      this.game_view.inventory_view.redraw();
    }
    return true;
  };
  Game.prototype.findRecipesFor = function(ingredients) {
    var recipe, result, _i, _len, _ref;
    result = [];
    _ref = this.player.recipes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      recipe = _ref[_i];
      if (recipe.fuzzyMatch(ingredients)) {
        result.push(recipe);
      }
    }
    return result;
  };
  Game.prototype.combine = function(recipe, amount) {
    var child, ingredient, product, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
    amount = amount || 1;
    _ref = recipe.ingredients;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ingredient = _ref[_i];
      if (!this.inventory.find(ingredient, ingredient.amount * amount)) {
        return false;
      }
    }
    _ref2 = recipe.ingredients;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      ingredient = _ref2[_j];
      this.inventory.remove(ingredient, ingredient.amount * amount);
    }
    _ref3 = recipe.products;
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      product = _ref3[_k];
      this.inventory.add(product, product.amount * amount);
    }
    recipe.incrementCounter(amount);
    _ref4 = recipe.childrenAvailable();
    for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
      child = _ref4[_l];
      if (this.player.recipes.indexOf(child) === -1) {
        this.player.recipes.push(child);
      }
    }
    this.inventory.compact();
    return true;
  };
  return Game;
})();