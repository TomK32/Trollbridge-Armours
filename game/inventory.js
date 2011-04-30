var Inventory = function() {
  this.items = [];
}

Inventory.prototype.find = function(what) {
  for(var c in this.items) {
    if(this.items[c].name == what) { return this.items[c]; }
  }
  return false;
}

Inventory.prototype.add = function(other) {
  var stock = this.find(other.name);
  if(stock) {
    stock.amount += other.amount
  } else {
    this.items.push(other);
  }
  return this;
}
Inventory.prototype.remove = function(other) {
  var stock = this.find(other.name);
  if(stock) {
    stock.amount -= other.amount;
    return this;
  } else { return false; }
}