var TKView = { };

TKView.x = function(other) {
  return this.parent.canvas.canvas.offsetLeft + other;
}
TKView.y = function(other) {
  return this.parent.canvas.canvas.offsetTop + other;
}
