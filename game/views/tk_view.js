var TKView = { };

TKView.x = function(other) {
  return this.parent.canvas.canvas.offsetLeft + other;
}
TKView.y = function(other) {
  return this.parent.canvas.canvas.offsetTop + other;
}
TKView.parentWidth = function() {
  return this.parent.canvas.canvas.offsetWidth;
}
TKView.parentHeight = function() {
  return this.parent.canvas.canvas.offsetHeight;
}
