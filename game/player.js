var Player = function(name) {
  this.name = name||'Thomas';
  this.inventory = new Inventory();
  this.money = 10;
}