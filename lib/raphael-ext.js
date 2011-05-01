
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
      this[0].offsetLeft-6,this[0].offsetTop-3,
      this[0].offsetWidth+12,this[0].offsetHeight+6
  ).attr({'fill': '#eee'}).link(method);
  this.toFront();
  return r;
}

Raphael.el.reposition = function() {
  return this.translate(0, this[0].offsetHeight/2); // move down a little. stupid svg
}

Raphael.el.default = function(other){
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

Raphael.el.errorHighlight = function() {
  var old_fill = this.attr('fill');
  this.attr({fill: '#F00'});
  this.animate({fill: old_fill}, 1000);
}