
Raphael.fn.defaultCustomAttributes = function() {
  this.customAttributes.parent = function (parent) { return parent; }
  this.customAttributes.row = function (row) { return row; }
}
Raphael.fn.fillBackground = function(color) {
  return this.rect(0,0,this.width, this.height).attr({fill: color});
}
Raphael.el.opaque = function(opacity) {
  return this.attr({'fill-opacity': opacity||0.6});
}

Raphael.el.button = function(method) {
  this.withHighlight().attr({'text-anchor': 'middle'});
  this.link(method);
  var r = this.paper.rect(
      this[0].getBBox().x-6,this[0].getBBox().y-3,
      this[0].getBBox().width+12,this[0].getBBox().height+6
  ).attr({'fill': '#eee'}).link(method);
  this.toFront();
  return r;
}

Raphael.el.reposition = function(where) {
  switch(where) {
    case 'l':
      return this.translate(this[0].getBBox().width/2,0); // move down a little. stupid svg
    case 'r':
      return this.translate(-this[0].getBBox().width/2,0); // move down a little. stupid svg
    case 'c':
    default:
      return this.translate(0, this[0].getBBox().height/2); // move down a little. stupid svg
  }
}

Raphael.el.defaults = function(other){
  return this.attr($.extend({'text-anchor': 'start', 'font-size': '15'}, other||{}))
};

Raphael.el.link = function(method) {
  return this.attr({cursor: 'pointer'}).click(method);
}

Raphael.el.withHighlight = function() {
  var toggleHighlight = function(event) {
    $(event.target).css('font-weight',
      ($(event.target).css('font-weight') == 'bold') ? 'normal' : 'bold');
  }
  return this.hover(toggleHighlight).mouseout(toggleHighlight);
}

Raphael.el.highlight = function(color) {
  var old_fill = this.attr('fill');
  this.attr({fill: color});
  this.animate({fill: old_fill}, 1000);
  return this;
}
Raphael.el.errorHighlight = function() {
  return this.highlight('#F00');
}