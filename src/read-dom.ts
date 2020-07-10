/// <reference path="../foreign.d.ts"/>

import {vnode, VNode, VNodeData} from 'snabbdom/vnode';
import {Html5Entities as entities} from 'html-entities';
import {Module} from './read-dom/module';

function readNode(hooks: Array<Module>, elm: Element): VNode {
  /* If our node is a text node, then we only want to set the `text` part of the VNode. */
  if (elm.nodeType === Node.TEXT_NODE) {
    return (vnode as any)(undefined, undefined, undefined, entities.decode(<string>elm.textContent), elm);
  }

  /* If not a text node, then build up a VNode based on the elm's tag name, class and style attributes, and remaining attributes. */

  /* Special values: style, class. We don't include these in the attrs hash of the VNode. */
  const data: VNodeData = {};
  
  for (let hook of hooks) {
    hook(data, elm);
  }

  var children: Array<VNode> | undefined;
  var text: string | undefined;

  { /* Build up set of children. */
    const childNodes: NodeList = elm.childNodes;

    if (childNodes.length > 0) {
      children = [];

      for (let i = 0; i < childNodes.length; i++) {
        children.push(readNode(hooks, <Element>childNodes.item(i)));
      }
    }

    if (children && children.length == 1) {
      /* Set single text node as text property */
      var child: VNode = children[0];
      if (!child.sel && !child.data && child.text) {
        children = undefined;
        text = child.text;
      }
    }
  }

  return vnode((elm.tagName || "").toLowerCase(), data, children, text, elm);
}

function readDOM(elm: Element, hooks: Array<Module>): VNode {
  if (!elm) {
    throw new Error("The DOM node required.");
  }
  
  return readNode(hooks, elm);
}

export interface Reader {
  (element: Element): VNode;
}

export function init(modules: Array<Module>): Reader {
  return function(element: Element) {
    return readDOM(element, modules);
  };
};
