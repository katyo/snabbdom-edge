import {VNodeData} from 'snabbdom/vnode';
import {Module, AddAttribute} from './module';

interface LookupAttrs {
  [key: string]: number;
};

const booleanAttrs: LookupAttrs = {
  allowfullscreen: 1,
  async: 1,
  autofocus: 1,
  autoplay: 1,
  checked: 1,
  compact: 1,
  controls: 1,
  declare: 1,
  default: 1,
  defaultchecked: 1,
  defaultmuted: 1,
  defaultselected: 1,
  defer: 1,
  disabled: 1,
  draggable: 1,
  enabled: 1,
  formnovalidate: 1,
  hidden: 1,
  indeterminate: 1,
  inert: 1,
  ismap: 1,
  itemscope: 1,
  loop: 1,
  multiple: 1,
  muted: 1,
  nohref: 1,
  noresize: 1,
  noshade: 1,
  novalidate: 1,
  nowrap: 1,
  open: 1,
  pauseonexit: 1,
  readonly: 1,
  required: 1,
  reversed: 1,
  scoped: 1,
  seamless: 1,
  selected: 1,
  sortable: 1,
  spellcheck: 1,
  translate: 1,
  truespeed: 1,
  typemustmatch: 1,
  visible: 1
};

export const attributesModule: Module = function(data: VNodeData, addAttribute: AddAttribute): void {
  var {attrs} = data;

  if (attrs) {
    for (let key in attrs) {
      if (key && attrs.hasOwnProperty(key) &&
          key != "style" && key != "class") {
        if (booleanAttrs[key]) {
          if (attrs[key]) {
            addAttribute(key);
          }
        } else {
          addAttribute(key, attrs[key]);
        }
      }
    }
  }
};

export default attributesModule;
