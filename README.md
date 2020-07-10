# Snabbdom Edge

[![npm version](https://badge.fury.io/js/snabbdom-edge.svg)](https://badge.fury.io/js/snabbdom-edge)
[![npm downloads](https://img.shields.io/npm/dm/snabbdom-edge.svg)](https://www.npmjs.com/package/snabbdom-edge)
[![Build Status](https://travis-ci.com/katyo/snabbdom-edge.svg?branch=master)](https://travis-ci.com/katyo/snabbdom-edge)

This package includes two functions, which useful for client-server applications built with **snabbdom**.
Like the **snabbdom** this library is focused on simplicity, modularity, powerful features and performance.

## Modules

This package implements next **snabbdom** modules:

* Element attributes (*snabbdom-edge/__component__/attributes.js*)
* Embedded styles (*snabbdom-edge/__component__/style.js*)
* Toggleable classes (*snabbdom-edge/__component__/class.js*)
* Dataset attributes (*snabbdom-edge/__component__/dataset.js*)

The element properties module (snabbdom-edge/__component__/*props.js*) does not
implemented here because properties exists exclusively on client-side.

## Write HTML

On the server side you usually want produce HTML output from virtual nodes.
The `writeHTML` function does this thing for you.

The supported features includes attributes, style and class.

The another way to do this is using `snabbdom-to-html` package.
This package is a simple and clean alternative for it.

Typical usage:

**TypeScript**:

```typescript

import {init as initHTMLWriter} from 'snabbdom-edge/write-html';
import {classModule} from 'snabbdom-edge/write-html/class';
import {styleModule} from 'snabbdom-edge/write-html/style';
import {datasetModule} from 'snabbdom-edge/write-html/dataset';
import {attributesModule} from 'snabbdom-edge/write-html/attributes';

// Init HTML render function with all available modules
const writeHTML = initHTMLWriter([
  classModule, // makes it support toggled classes
  // the props is only on client-side
  styleModule, // handles styling on elements
  datasetModule, // handles data-attributes
  attributesModule // handles all other attributes
]);

// in request handler we generate virtual DOM
let vnode = render_tree();

// write HTML to response body directly to use lesser RAM
writeHTML(vnode, response);

// OR generate HTML string to write
const html = writeHTML(vnode);
response.write(html);

```

**JavaScript**:

```javascript

// Init HTML render function with all available modules
var writeHTML = require('snabbdom-edge/write-html').init([
  require('snabbdom-edge/write-html/class').default, // makes it support toggled classes
  // the props is only on client-side
  require('snabbdom-edge/write-html/style').default, // handles styling on elements
  require('snabbdom-edge/write-html/dataset').default, // handles data-attributes
  require('snabbdom-edge/write-html/attributes').default // handles all other attributes
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

**TypeScript**:

```typescript

import {init as initDOMReader} from 'snabbdom-edge/read-dom';
import {classModule} from 'snabbdom-edge/read-dom/class';
import {styleModule} from 'snabbdom-edge/read-dom/style';
import {datasetModule} from 'snabbdom-edge/read-dom/dataset';
import {attributesModule} from 'snabbdom-edge/read-dom/attributes';

// Init DOM reader function with all available modules
const readDOM = initDOMReader([
  classModule, // makes it support toggled classes
  // the props is only on client-side
  styleModule, // handles styling on elements
  datasetModule, // handles data-attributes
  attributesModule() // handles all other attributes
]);

//before starting application on client
// we would like to read initial DOM

// now we can read global DOM node (i.e. <html>)
const _vnode = readDOM(document.documentElement);

// OR we can read only <body> as soon
const _vnode = readDOM(document.body);

// render the first virtual DOM
const vnode = render_tree();

// initiate the first patch
patch(_vnode, vnode);

```

**JavaScript**:

```javascript

// Init DOM reader function with all available modules
var readDOM = require('snabbdom-edge/read-dom').init([
  require('snabbdom-edge/read-dom/class'), // makes it support toggled classes
  // the props is only on client-side
  require('snabbdom-edge/read-dom/style'), // handles styling on elements
  require('snabbdom-edge/read-dom/dataset'), // handles data-attributes
  require('snabbdom-edge/read-dom/attributes')() // handles all other attributes
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

### Attributes module options

As you seen above the attributes module instantiated by calling as function. It implemented so in order to have possibility of transferring options to it. Available options is below:

* Use *style: true* to read style attribute to `attrs` field.
* Use *class: true* to read class attribute to `attrs` field.
* Use *dataset: true* to read data- attributes to `attrs` field.

**TypeScript**:

```typescript

import {init as initDOMReader} from 'snabbdom-edge/read-dom';
import {attributesModule} from 'snabbdom-edge/read-dom/attributes';

// Init DOM reader function with all available modules
const readDOM = initDOMReader([
  attributesModule({ // handles all attributes
    style: true,
    class: true,
    dataset: true
  })
]);
  
```

**JavaScript**:

```typescript

// Init DOM reader function with all available modules
const readDOM = require('snabbdom-edge/read-dom').init([
  require('snabbdom-edge/read-dom/attributes').default({ // handles all attributes
    style: true,
    class: true,
    dataset: true
  })
]);
  
```
