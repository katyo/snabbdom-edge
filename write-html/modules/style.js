module.exports = function(vnode, addAttribute) {
  var style = vnode.data.style;

  if (style) {
    var styleList = [];

    for (var styleProp in style) {
      if (styleProp && style.hasOwnProperty(styleProp) && style[styleProp]) {
        var styleName =
        styleProp.replace(/[A-Z]/g, function(_1) {
          return "-" + _1.toLowerCase();
        });
        styleList.push(styleName + ":" + style[styleProp]);
      }
    }

    if (styleList.length > 0) {
      addAttribute("style", styleList.join(";"));
    }
  }
};
