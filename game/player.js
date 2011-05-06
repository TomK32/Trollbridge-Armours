/*
   Trollbridge-Armours/Player
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Player;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Player = (function() {
  function Player(args) {
    this.name = name || 'Thomas';
    this.inventory = new Inventory();
    this.money = 10;
    this.recipes = [];
  }
  __extends(Player, Money);
  return Player;
})();