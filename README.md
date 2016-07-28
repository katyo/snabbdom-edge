# Snabbdom Edge

This package includes two functions, which useful for client-server applications built with **snabbdom**.
Like the **snabbdom** this library is focused on simplicity, modularity, powerful features and performance.

## Modules

This package implements next **snabbdom** modules:

* Element attributes (*snabbdom-edge/__component__/modules/attributes.js*)
* Embedded styles (*snabbdom-edge/__component__/modules/style.js*)
* Toggleable classes (*snabbdom-edge/__component__/modules/class.js*)
* Dataset attributes (*snabbdom-edge/__component__/modules/dataset.js*)

The element properties module (snabbdom-edge/<component>/modules/*props.js*) does not
implemented here because properties exists exclusively on client-side.

## Write HTML

On the server side you usually want produce HTML output from virtual nodes.
The `writeHTML` function does this thing for you.

The supported features includes attributes, style and class.

The another way to do this is using `snabbdom-to-html` package.
This package is a simple and clean alternative for it.

Typical usage:

```javascript

// Init HTML render function with all available modules
var writeHTML = require("snabbdom-edge/write-html").init([
  require("snabbdom-edge/write-html/modules/class"), // makes it support toggled classes
  // the props is only on client-side
  require("snabbdom-edge/write-html/modules/style"), // handles styling on elements
  require("snabbdom-edge/write-html/modules/attributes") // handles all other attributes
]);

// in request handler we generate virtual DOM
var vnode = render_tree();

// write HTML to response body directly to use lesser RAM
writeHTML(vnode, response);

// OR generate HTML string to write
var html = writeHTML(vnode);
response.write(html);

```

## Read DOM

On the client side you may read initial DOM before first `patch` when initializing your application.
The `readDOM` function does this thing.

This piece of code has been ported from `snabbdom-virtualize` with key differences:

1. Event listeners has been removed because this is useless for our purposes.
2. Decoding HTML entities using `html-entities` package instead of DOM API calls.
3. Added support of the single text child in non-text vnode.

Usage example:

```javascript

// Init DOM reader function with all available modules
var readDOM = require("snabbdom-edge/read-dom").init([
  require("snabbdom-edge/read-dom/modules/class"), // makes it support toggled classes
  // the props is only on client-side
  require("snabbdom-edge/read-dom/modules/style"), // handles styling on elements
  require("snabbdom-edge/read-dom/modules/attributes")() // handles all other attributes
]);

//before starting application on client
// we would like to read initial DOM

// now we can read global DOM node (i.e. <html>)
var _vnode = readDOM(document.documentElement);

// OR we can read only <body> as soon
var _vnode = readDOM(document.body);

// render the first virtual DOM
var vnode = render_tree();

// initiate the first patch
patch(_vnode, vnode);

```
