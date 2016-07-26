/* Build up set of attributes on the elm. */

module.exports = function(data, elm) {
  var attributes = elm.attributes;

  for (var i = 0; i < attributes.length; i++) {
    var attr = attributes.item(i);
    var key = attr.name;

    if (key !== 'style' &&
        key !== 'class') {
      
      if (!data.attrs) {
        data.attrs = {};
      }

      data.attrs[key] = attr.value;
    }
  }
};
