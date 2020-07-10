import {VNodeData} from 'snabbdom/vnode';
import {Module, AddAttribute} from './module';

export const styleModule: Module = function(data: VNodeData, addAttribute: AddAttribute): void {
  const {style} = data;

  if (style) {
    const styleList = [];

    for (let styleProp in style) {
      if (styleProp && style.hasOwnProperty(styleProp) && style[styleProp]) {
        const styleName = styleProp.replace(/[A-Z]/g, (_1) => "-" + _1.toLowerCase());
        styleList.push(styleName + ":" + style[styleProp]);
      }
    }

    if (styleList.length > 0) {
      addAttribute("style", styleList.join(";"));
    }
  }
};

export default styleModule;
