import {VNodeData} from 'snabbdom/vnode';

export interface Module {
  (data: VNodeData, elm: Element): void;
}
