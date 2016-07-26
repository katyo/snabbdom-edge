exports.writeHTML = require("./write-html").init([ // Init HTML render function with all available modules
  require("./write-html/modules/class"), // makes it support toggled classes
  // the props is only on client-side
  require("./write-html/modules/style"), // handles styling on elements
  require("./write-html/modules/attributes") // handles all other attributes
]);

exports.readDOM = require("./read-dom").init([ // Init DOM reader function with all available modules
  require("./read-dom/modules/class"), // makes it support toggled classes
  // the props is only on client-side
  require("./read-dom/modules/style"), // handles styling on elements
  require("./read-dom/modules/attributes") // handles all other attributes
]);
