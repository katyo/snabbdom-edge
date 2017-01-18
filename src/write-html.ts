/// <reference path="../foreign.d.ts"/>

import {VNode, VNodeData} from 'snabbdom/vnode';
import {prototype as entities} from 'html-entities/lib/html5-entities';
import {Module} from './write-html/module';

function writeNode(stm: WritableStream, vnode: VNode, hooks: Array<Module>): void {
  if (!vnode.sel && !vnode.data && vnode.text) {
    stm.write(entities.encode(vnode.text));
    return;
  }

  let content = `<${vnode.sel}`;

  function addAttribute(name: string, value?: string): void {
    content += ` ${name}`;

    if (value != null) {
      content += `="${entities.encode(`${value}`)}"`;
    }
  }

  for (let hook of hooks) {
    hook(<VNodeData>vnode.data, addAttribute);
  }

  const hasChildren = vnode.children && vnode.children.length > 0;

  stm.write(`${content}>`);

  if (hasChildren) {
    const {children = []} = vnode;
    
    for (let child of children) {
      writeNode(stm, <VNode>child, hooks);
    }
  } else if (vnode.text) {
    stm.write(entities.encode(vnode.text));
  }

  stm.write(`</${vnode.sel}>`);
}

function writeHtml(hooks: Array<Module>, vnode: VNode, stm?:WritableStream): string | undefined {
  if (!vnode) {
    throw new Error("The first arg can be a valid virtual node");
  }

  let res: string | undefined;

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

export interface Writer {
  //(vnode: VNode, stm: WritableStream): void;
  //(vnode: VNode): string;
  (vnode: VNode, stm?: WritableStream): string | undefined;
}

export function init(modules: Array<Module>): Writer {
  return function(vnode: VNode, stm?: WritableStream): string | undefined {
    return writeHtml(modules, vnode, stm);
  };
};
