/* Builds the style object for the VNode. */

module.exports = function(data, elm) {
  var style = elm.style;

  if (style.length > 0) {
    var styles = data.style = {};

    for (var i = 0; i < style.length; i++) {
      var key = style.item(i);

      /* Replace -a with A to help camel case style property names. */
      var name = key.replace(/-(\w)/g, function (_1, _2) {
        return _2.toUpperCase();
      });
      /* Handle properties that start with a -. */
      name = name.charAt(0).toLowerCase() + name.substring(1);

      styles[name] = style.getPropertyValue(key);
    }
  }
};
