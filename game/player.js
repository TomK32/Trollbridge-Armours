var Player = function(name) {
  $.extend(this.__proto__, Money);
  this.name = name||'Thomas';
  this.inventory = new Inventory();
  this.money = 10;
}