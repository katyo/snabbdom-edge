import {VNodeData} from 'snabbdom/build/package/vnode';
import {Module, AddAttribute} from './module';
import {booleanAttrsRegex} from '../util';

export const attributesModule: Module = function(data: VNodeData, addAttribute: AddAttribute): void {
  var {attrs} = data;

  if (attrs) {
    for (let key in attrs) {
      if (key && attrs.hasOwnProperty(key) &&
          key != "style" && key != "class") {
        if (booleanAttrsRegex.test(key)) {
          if (attrs[key]) {
            addAttribute(key);
          }
        } else {
          addAttribute(key, attrs[key] as string);
        }
      }
    }
  }
};

export default attributesModule;
