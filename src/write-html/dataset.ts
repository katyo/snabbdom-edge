import {VNodeData} from 'snabbdom/build/package/vnode';
import {Module, AddAttribute} from './module';

export const datasetModule: Module = function(data: VNodeData, addAttribute: AddAttribute): void {
  const {dataset} = data;

  if (dataset) {
    for (let key in dataset) {
      if (dataset.hasOwnProperty(key)) {
        addAttribute("data-" + key, dataset[key]);
      }
    }
  }
};

export default datasetModule;
