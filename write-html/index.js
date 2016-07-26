var entities = require("html-entities/lib/html5-entities").prototype;

function writeNode(stm, vnode, hooks) {
  if (!vnode.sel && !vnode.data && vnode.text) {
    stm.write(entities.encode(vnode.text));
    return;
  }

  var content = "<" + vnode.sel;

  function addAttribute(name, value) {
    content += name;

    if (value != null) {
      content += "=\"" + entities.encode(value) + "\"";
    }
  }

  for (var i = 0; i < hooks.length; i++) {
    hooks[i](vnode, addAttribute);
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

function writeHtml(hooks, vnode, stm) {
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

  writeNode(stm, vnode, hooks);

  return res;
}

exports.init = function(modules) {
  return function(vnode, stm) {
    writeHtml(modules, vnode, stm);
  };
};
