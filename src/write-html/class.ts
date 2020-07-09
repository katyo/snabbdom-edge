import {VNodeData} from 'snabbdom/build/package/vnode';
import {Module, AddAttribute} from './module';

export const classModule: Module = function(data: VNodeData, addAttribute: AddAttribute): void {
  const {class: classes} = data;

  if (classes) {
    const classList = [];

    for (let className in classes) {
      if (className && classes.hasOwnProperty(className) && classes[className]) {
        classList.push(className);
      }
    }

    if (classList.length > 0) {
      addAttribute("class", classList.join(" "));
    }
  }
};

export default classModule;
