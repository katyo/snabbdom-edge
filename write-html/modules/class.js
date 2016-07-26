module.exports = function(vnode, addAttribute) {
  var classes = vnode.data["class"];

  if (classes) {
    var classList = [];

    for (var className in classes) {
      if (className && classes.hasOwnProperty(className) && classes[className]) {
        classList.push(className);
      }
    }

    if (classList.length > 0) {
      addAttribute("class", classList.join(" "));
    }
  }
};
