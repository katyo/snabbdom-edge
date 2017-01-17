/* Read set of datas from the elm. */
import {VNodeData} from 'snabbdom/vnode';
import {Module} from './module';

export const datasetModule: Module = function(data: VNodeData, elm: Element): void {
  const {dataset} = <HTMLElement>elm;

  if (dataset) {
    for (const key in dataset) {
      if (dataset.hasOwnProperty(key)) {
        const {[key]: value} = dataset;
        
        if (!data.dataset) {
          data.dataset = {};
        }
        
        data.dataset[key] = value;
      }
    }
  }
};

export default datasetModule;
