var assert = require('assert');

var writeHTML = require('../write-html').init([
  require("../write-html/class").default, // makes it support toggled classes
  // the props is only on client-side
  require("../write-html/style").default, // handles styling on elements
  require("../write-html/dataset").default, // handles dataset attributes
  require("../write-html/attributes").default // handles all other attributes
]);

var h = require('snabbdom/h').h;

describe('write-html html', function() {
  it('generic document tree', function(){
    var vnode = h('html', [
      h('head', [
        h('title', 'Front page'),
        h('script', 'alert();')
      ]),
      h('body', [
        h('div', 'Very short content.')
      ])
    ]);
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<html><head><title>Front page</title><script>alert();</script></head><body><div>Very short content.</div></body></html>');
  });
});

describe('write-html attributes', function() {
  it('attrs with values', function() {
    var vnode = h('div', {attrs: {href: '/foo', minlength: 1, value: true}});
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<div href="/foo" minlength="1" value="true"></div>');
  });

  it('boolean attrs', function() {
    var vnode = h('button', {attrs: {disabled: false, autofocus: true}}, 'Click me');
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<button autofocus>Click me</button>');
  });
});

describe('write-html class', function() {
  it('class lists', function() {
    var vnode = h('a', {attrs: {href: '/'}, class: {active: true, hidded: false}}, 'my link');
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<a class="active" href="/">my link</a>');
  });
});

describe('write-html style', function() {
  it('styles', function() {
    var vnode = h('span', {style: {display: 'block', visibility: 'visible', width: '100%', height: 64}});
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<span style="display:block;visibility:visible;width:100%;height:64"></span>');
  });
});

describe('write-html dataset', function() {
  it('data attributes', function() {
    var vnode = h('div', {attrs: {id: "tag123"}, dataset: {key: 'id123', weight: -22}});
    var html = writeHTML(vnode);
    assert.strictEqual(html, '<div data-key="id123" data-weight="-22" id="tag123"></div>');
  });
});
