var TKView = { };

TKView.x = function(other) {
  return $(this.parent.canvas.canvas).offset().left + other;
}
TKView.y = function(other) {
  return $(this.parent.canvas.canvas).offset().top + other;
}
TKView.parentWidth = function() {
  return this.parent.canvas.canvas.offsetWidth;
}
TKView.parentHeight = function() {
  return this.parent.canvas.canvas.offsetHeight;
}
