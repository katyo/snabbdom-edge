# Snabbdom Edge

This package includes two functions, which useful for client-server applications built with **snabbdom**.

## Write HTML

At first you may want to produce HTML output from virtual nodes on server-side.
The `writeHTML` function do this thing.

The supported features includes attributes, style and class.

The another way to do this is using `snabbdom-to-html` package.
This package has simple and clean alternative for it.

Usage example:

```javascript

var writeHTML = require("snabbdom-edge/write-html");

# in request handler we generate virtual DOM
var vnode = render_tree();

# write HTML to response body directly to use lesser RAM
writeHTML(vnode, response);

# OR generate HTML string to write
var html = writeHTML(vnode);
response.write(html);

```

## Read DOM

At second you may want to read initial DOM before first `patch` call on initializing your application on client-side.
The `readDOM` function does this thing.

This piece of code is ported from `snabbdom-virtualize` with key differences:

1. Reading event listeners is missing because this feature is useless for our purposes.
2. No DOM calls for decoding HTML entities, instead we use `html-entities` package.
3. Single text child in vnode are supported.

Usage example:

```javascript

var readDOM = require("snabbdom-edge/read-dom");

# before starting application on client
# we would like to read initial DOM

# now we can read global DOM node (i.e. <html>)
var _vnode = readDOM(document.documentElement);

# OR we can read only <body> as soon
var _vnode = readDOM(document.body);

# render the first virtual DOM
var vnode = render_tree();

# initiate the first patch
patch _vnode, vnode

```
