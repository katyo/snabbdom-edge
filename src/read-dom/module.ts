import {VNodeData} from 'snabbdom/build/package/vnode';

export interface Module {
  (data: VNodeData, elm: Element): void;
}
