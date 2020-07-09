var assert = require('assert');

var readDOM = require('../read-dom').init([
  require("../read-dom/class").default, // makes it support toggled classes
  // the props is only on client-side
  require("../read-dom/style").default, // handles styling on elements
  require("../read-dom/dataset").default, // handles dataset attributes
  require("../read-dom/attributes").default() // handles all other attributes
]);

var h = require('snabbdom/build/package/h').h;

describe('read-dom html', function() {
  var elm;
  beforeEach(function() {
    elm = document.createElement('html');
  });
  it('generic document tree', function(){
    elm.innerHTML = '<head><title>Front page</title><script>alert();</script></head><body><div>Very short content.</div></body>';
    var vnode = readDOM(elm);
    assert.strictEqual(vnode.sel, 'html');
    assert.strictEqual(vnode.children.length, 2);
    assert.deepEqual(vnode.data, {});
    assert.strictEqual(vnode.children[0].sel, 'head');
    assert.strictEqual(vnode.children[1].sel, 'body');
  });
});

describe('read-dom attributes', function() {
  var elm;
  beforeEach(function() {
    elm = document.createElement('div');
  });
  it('attrs with values', function() {
    elm.innerHTML = '<div href="/foo" minlength="1" value="true"></div>';
    var vnode = readDOM(elm).children[0];
    assert.deepEqual(vnode.data, {attrs: {href: '/foo', minlength: "1", value: "true"}});
  });

  it('boolean attrs', function() {
    elm.innerHTML = '<button autofocus>Click me</button>';
    var vnode = readDOM(elm).children[0];
    assert.deepEqual(vnode.data.attrs, {autofocus: true});
  });
});

describe('read-dom class', function() {
  var elm;
  beforeEach(function() {
    elm = document.createElement('div');
  });
  it('class lists', function() {
    elm.innerHTML = '<a class="active" href="/">my link</a>';
    var vnode = readDOM(elm).children[0];
    assert.deepEqual(vnode.data.class, {active: true});
  });
});

describe('read-dom style', function() {
  var elm;
  beforeEach(function() {
    elm = document.createElement('div');
  });
  it('styles', function() {
    elm.innerHTML = '<span style="display:block;visibility:visible;width:100%;height:64px"></span>';
    var vnode = readDOM(elm).children[0];
    assert.deepEqual(vnode.data.style, {display: 'block', visibility: 'visible', width: '100%', height: '64px'});
  });
});

describe('read-dom dataset', function() {
  var elm;
  beforeEach(function() {
    elm = document.createElement('div');
  });
  it('data attributes', function() {
    elm.innerHTML = '<div data-key="id123" data-weight="-22" id="tag123"></div>';
    var vnode = readDOM(elm).children[0];
    assert.deepEqual(vnode.data.dataset, {key: 'id123', weight: -22});
  });
});
