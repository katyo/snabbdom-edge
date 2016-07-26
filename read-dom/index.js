var VNode = require("snabbdom/vnode");
var entities = require("html-entities/lib/html5-entities").prototype;

function readNode(hooks, elm) {
  /* If our node is a text node, then we only want to set the `text` part of the VNode. */
  if (elm.nodeType === Node.TEXT_NODE) {
    return VNode(undefined, undefined, undefined, entities.decode(elm.textContent), elm);
  }

  /* If not a text node, then build up a VNode based on the elm's tag name, class and style attributes, and remaining attributes. */

  /* Special values: style, class. We don't include these in the attrs hash of the VNode. */
  var data = {};

  for (var i = 0; i < hooks.length; i++) {
    hooks[i](data, elm);
  }

  var children = undefined, text = undefined;

  { /* Build up set of children. */
    var childNodes = elm.childNodes;

    if (childNodes.length > 0) {
      children = [];

      for (var i = 0; i < childNodes.length; i++) {
        children.push(readNode(childNodes.item(i)));
      }
    }

    if (children.length == 1) { /* Set single text node as text property */
      var child = children[0];
      if (!child.sel && !child.data && child.text) {
        children = undefined;
        text = child.text;
      }
    }
  }

  return VNode((elm.tagName || "").toLowerCase(), data, children, text, elm);
}

function readDOM(elm, hooks) {
  if (!elm) {
    throw new Error("The DOM node required.");
  }

  return readNode(hooks, elm);
}

exports.init = function(modules) {
  return function(element) {
    readDOM(element, modules);
  };
};
