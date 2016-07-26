/* Builds the class object for the VNode. */

module.exports = function(data, elm) {
  var name = elm.className;

  if (name !== null && name.length > 0) {
    var list = name.split(/ /g);

    if (list.length > 0) {
      var classes = data["class"] = {};

      for (var i = 0; i < list.length; i++) {
        classes[list[i]] = true;
      }
    }
  }
};
