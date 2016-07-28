/* Build up set of attributes on the elm. */

function readAttrs(data, elm, opts) {
  var attributes = elm.attributes;
  
  for (var i = 0; i < attributes.length; i++) {
    var attr = attributes.item(i);
    var key = attr.name;
    
    if ((opts.style || key !== 'style') &&
        (opts["class"] || key !== 'class') &&
        (opts.dataset || !(/^data-/.test(key)))) {
      
      if (!data.attrs) {
        data.attrs = {};
      }
      
      data.attrs[key] = attr.value;
    }
  }
}

var defs = {
  style: false,
  "class": false,
  dataset: false
};

module.exports = function(opts) {
  opts = opts || defs;
  
  return function(data, elm) {
    readAttrs(data, elm, opts);
  };
};
