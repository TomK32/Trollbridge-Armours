/*
   Trollbridge-Armours/Game
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Game;
Game = (function() {
  Game.version = '0.1.1';
  function Game() {
    this.player = new Player();
    this.inventory = this.player.inventory;
    this.recipes = this.player.recipes;
    this.heroes = [];
    this.timer = this.startLoop();
    this.game_view = false;
    this.timeStarted = 0;
    this.timeElapsed = 0;
  }
  Game.prototype.toggleLoop = function() {
    if (this.timer) {
      return this.stopLoop();
    } else {
      return this.startLoop();
    }
  };
  Game.prototype.startLoop = function() {
    if (this.timeStarted) {
      this.timeElapsed = new Date() - this.timeStarted;
    }
    this.timeStarted = new Date();
    if (this.timer) {
      false;
    }
    return this.timer = setInterval(this.tick, 333, this);
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
    game.game_view.redrawTimer();
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
  Game.prototype.timeElapsedHuman = function() {
    var e, t;
    t = "";
    e = (new Date() - this.timeStarted) / 1000;
    if (e > 3600) {
      t += Math.floor(e / 3600) + ':';
    }
    if (e > 60) {
      t += Math.floor(e / 60 % 60) + ':';
    }
    return t += Math.floor(e % 60);
  };
  Game.prototype.sellItem = function(item) {
    if (!hero.wishlist.find(item, 0) || !this.player.inventory.find(item, 0)) {
      return false;
    }
    this.player.inventory.remove(item);
    this.player.money += item.value * item.amount;
    this.player.lastSale = [item.name, item.value * item.amount];
    hero.wishlist.remove(item);
    hero.inventory.add(item);
    if (this.game_view) {
      this.game_view.player_view.redraw();
      this.game_view.inventory_view.redraw();
    }
    return true;
  };
  Game.prototype.buyItem = function(item) {
    var o;
    o = $.extend({}, item);
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
  Game.prototype.findRecipeFor = function(ingredients) {
    var recipe, _i, _len, _ref;
    _ref = this.player.recipes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      recipe = _ref[_i];
      if (recipe.fuzzyMatch(ingredients)) {
        return recipe;
      }
    }
    return false;
  };
  Game.prototype.combine = function(recipe, amount) {
    var ingredient, product, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
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
    this.recipes.concat(recipe.childrenAvailable());
    this.inventory.compact();
    return true;
  };
  return Game;
})();