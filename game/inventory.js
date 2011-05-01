var Inventory = function(items) {
  this.items = items||[];
};

// returns item if found and matching the (optional) amount
Inventory.prototype.find = function(what, amount) {
  if(typeof(what) == "object") {
    if(typeof(amount) == "undefined" && what.amount) {
      var amount = what.amount;
    }
    var what = what.name;
  }
  for(var c in this.items) {
    if(this.items[c].name == what) {
      if(amount) {
        if(this.items[c].amount >= amount) {
          var n = jQuery.extend(true, {}, this.items[c]);
          n.amount = amount
          return n;
        } else { return false; }
      } else {
        return this.items[c];
      }
    }
  }
  return false;
};

Inventory.prototype.add = function(other) {
  var stock = this.find(other.name);
  if(stock) {
    stock.amount += other.amount
  } else {
    this.items.push(other);
  }
  return this;
};

Inventory.prototype.remove = function(other) {
  var stock = this.find(other.name);
  if(stock && stock.amount >= other.amount) {
    stock.amount -= other.amount;
    if(stock.amount == 0) { this.items.splice(this.items.indexOf(stock),1); return true; }
    return this;
  } else { return false; }
};

Inventory.prototype.compact = function() {
  for(c in this.items) {
    if(this.items[c].amount == 0) { this.items.splice(c,1) }
  }
}