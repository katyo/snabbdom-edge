import {VNodeData} from 'snabbdom/vnode';

export interface AddAttribute {
  (key: string): void;
  (key: string, value: string): void;
}

export interface Module {
  (data: VNodeData, addAttribute: AddAttribute): void;
}
