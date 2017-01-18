/* Build up set of attributes on the elm. */

import {VNodeData} from 'snabbdom/vnode';
import {Module} from './module';
import {booleanAttrsRegex} from '../util';

export interface Options {
  style: boolean;
  class: boolean;
  dataset: boolean;
}

function readAttrs(data: VNodeData, elm: Element, opts: Options): void {
  const {attributes} = elm;
  
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes.item(i);
    const {name, value} = attr;
    
    if ((opts.style || name !== 'style') &&
        (opts.class || name !== 'class') &&
        (opts.dataset || !(/^data-/.test(name)))) {
      
      if (!data.attrs) {
        data.attrs = {};
      }
      
      data.attrs[name] = booleanAttrsRegex.test(name) ? true : value;
    }
  }
}

export const defaults: Options = {
  style: false,
  class: false,
  dataset: false
};

export interface AttributesModule {
  (opts: Options): Module;
}

export const attributesModule: AttributesModule = function(opts: Options = defaults): Module {
  return function(data: VNodeData, elm: Element): void {
    readAttrs(data, elm, opts);
  };
};

export default attributesModule;
