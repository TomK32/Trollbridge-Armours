/*
   Trollbridge-Armours/Inventory
   (C) 2011 by Thomas R. Koll, ananasblau.com
*/var Inventory;
Inventory = (function() {
  function Inventory(items) {
    this.items = items || [];
  }
  Inventory.prototype.find = function(what, amount) {
    var item, n, _i, _len, _ref;
    if (typeof what === "object") {
      if (typeof amount === "undefined" && what.amount) {
        amount = what.amount;
      }
      what = what.name;
    }
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.name === what) {
        if (amount) {
          if (item.amount >= amount) {
            n = jQuery.extend(true, new item.constructor({}), item);
            n.amount = amount;
            return n;
          } else {
            return false;
          }
        } else {
          return item;
        }
      }
    }
    return false;
  };
  Inventory.prototype.add = function(other) {
    var stock;
    stock = this.find(other.name);
    if (stock) {
      stock.amount += other.amount;
    } else {
      this.items.push($.extend(true, new other.constructor({}), other));
    }
    return this;
  };
  Inventory.prototype.remove = function(other) {
    var stock;
    stock = this.find(other.name);
    if (stock && stock.amount >= other.amount) {
      stock.amount -= other.amount;
      if (stock.amount === 0) {
        this.items.splice(this.items.indexOf(stock), 1);
        return true;
      }
      return this;
    } else {
      return false;
    }
  };
  Inventory.prototype.compact = function() {
    var item, _i, _len, _ref, _results;
    _ref = this.items;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push(item.amount === 0 ? item = _ref.splice(_i, 1) : void 0);
    }
    return _results;
  };
  Inventory.prototype.clear = function() {
    return this.items = [];
  };
  Inventory.prototype.ingredientsValue = function() {
    var item, result, _i, _len, _ref;
    result = 0;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item instanceof Ingredient) {
        result += item.amount * item.value;
      }
    }
    return result;
  };
  Inventory.prototype.productsValue = function() {
    var item, result, _i, _len, _ref;
    result = 0;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item instanceof Product) {
        result += item.amount * item.value;
      }
    }
    return result;
  };
  return Inventory;
})();