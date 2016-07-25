var VNode = require("snabbdom/vnode");
var entities = require("html-entities/lib/html5-entities").prototype;

function readNode(elm) {
  /* If our node is a text node, then we only want to set the `text` part of the VNode. */
  if (elm.nodeType === Node.TEXT_NODE) {
    return VNode(undefined, undefined, undefined, entities.decode(elm.textContent), elm);
  }

  /* If not a text node, then build up a VNode based on the elm's tag name, class and style attributes, and remaining attributes. */

  /* Special values: style, class. We don't include these in the attrs hash of the VNode. */
  var data = {};
  
  { /* Builds the class object for the VNode. */
    var className = elm.className;
    
    if (className !== null && className.length > 0) {
      var classList = className.split(/ /g);
      
      if (classList.length > 0) {
        var classes = data["class"] = {};
        
        for (var i = 0; i < classList.length; i++) {
          classes[classList[i]] = true;
        }
      }
    }
  }

  { /* Builds the style object for the VNode. */
    var style = elm.style;
    
    if (style.length > 0) {
      var styles = data.style = {};
      
      for (var i = 0; i < style.length; i++) {
        var styleName = style.item(i);
        
        /* Replace -a with A to help camel case style property names. */
        var styleProp =
          styleName.replace(/-(\w)/g, function (_1, _2) {
            return _2.toUpperCase();
          });
        /* Handle properties that start with a -. */
        styleProp = styleProp.charAt(0).toLowerCase() + styleProp.substring(1);
        
        styles[styleProp] = style.getPropertyValue(styleName);
      }
    }
  }

  { /* Build up set of attributes on the elm. */
    var attributes = elm.attributes;
    
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes.item(i);
      var attrName = attr.name;
      
      if (attrName !== 'style' && attrName !== 'class') {
        if (!data.attrs) {
          data.attrs = {};
        }
        data.attrs[attrName] = attr.value;
      }
    }
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

module.exports = function(elm) {
  if (!elm) {
    return null;
  }
  return readNode(elm);
}
