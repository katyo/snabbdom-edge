/* Builds the style object for the VNode. */
import {VNodeData} from 'snabbdom/vnode';
import {Module} from './module';

export const styleModule: Module = function(data: VNodeData, elm: Element): void {
  var {style} = <HTMLElement>elm;

  if (style && style.length > 0) {
    data.style = {};

    for (let i = 0; i < style.length; i++) {
      const key = style.item(i);

      /* Replace -a with A to help camel case style property names. */
      let name = key.replace(/-(\w)/g, function (_1, _2) {
        return _2.toUpperCase();
      });
      /* Handle properties that start with a -. */
      name = name.charAt(0).toLowerCase() + name.substring(1);

      data.style[name] = style.getPropertyValue(key);
    }
  }
};

export default styleModule;
