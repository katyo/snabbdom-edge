var entities = require("html-entities/lib/html5-entities").prototype;

function writeNode(stm, vnode) {
  if (!vnode.sel && !vnode.data && vnode.text) {
    stm.write(entities.encode(vnode.text));
    return;
  }

  var content = "<" + vnode.sel;

  var data = vnode.data;

  {
    var classes = data["class"];
    
    if (classes) {
      var classList = [];
      
      for (var className in classes) {
        if (className && classes.hasOwnProperty(className) && classes[className]) {
          classList.push(className);
        }
      }
      
      if (classList.length > 0) {
        content += " class=\"" + entities.encode(classList.join(" ")) + "\"";
      }
    }
  }

  {
    var style = data.style;
    
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
        content += " style=\"" + entities.encode(styleList.join(";")) + "\"";
      }
    }
  }

  {
    var attrs = data.attrs;

    if (attrs) {
      var attrList = [];
      
      for (var attrName in attrs) {
        if (attrName && attrs.hasOwnProperty(attrName) && attrName != "style" && attrName != "class") {
          attrList.push(" " + attrName + "=\"" + entities.encode(attrs[attrName]) + "\"");
        }
      }

      if (attrList.length > 0) {
        content += attrList.join("");
      }
    }
  }

  var hasChildren = vnode.children && vnode.children.length > 0;
  
  stm.write(content + ">");

  if (hasChildren) {
    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
      writeNode(stm, children[i]);
    }
  } else if (vnode.text) {
    stm.write(entities.encode(vnode.text));
  }

  stm.write("</" + vnode.sel + ">");
}

module.exports = function(vnode, stm) {
  if (!vnode) {
    throw new Error("The first arg can be a valid virtual node");
  }

  var res;
  
  if (typeof stm != "object" || typeof stm.write != "function") {
    res = "";
    stm = {
      write: function(str) {
        res += str;
      }
    };
  }
  
  writeNode(stm, vnode);

  return res;
};
