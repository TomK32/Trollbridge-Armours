var Inventory = function() {
  this.items = [];
};

// returns item if found and matching the (optional) amount
Inventory.prototype.find = function(what, amount) {
  if(typeof(what) == "object") {
    if(what.amount) {
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
  if(stock) {
    stock.amount -= other.amount;
    return this;
  } else { return false; }
};