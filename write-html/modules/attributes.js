var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
                "truespeed", "typemustmatch", "visible"];

var booleanAttrsDict = {};
for(var i=0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}

module.exports = function(vnode, addAttribute) {
  var attrs = vnode.data.attrs;

  if (attrs) {
    for (var key in attrs) {
      if (key && attrs.hasOwnProperty(key) &&
        key != "style" && key != "class") {
        if (booleanAttrsDict[key]) {
          if (attrs[key]) {
            addAttribute(key);
          }
        } else {
          addAttribute(key, attrs[key]);
        }
      }
    }
  }
};
