import {VNodeData} from 'snabbdom/vnode';
import {Module, AddAttribute} from './module';

/* Boolean attributes regexp generator (elisp)
   You can edit list of properties and re-evaluate expression

   (replace-regexp "\\(booleanAttrsRegex = \\)[^;]*;"
   (concat "\\1/^" (replace-regexp-in-string "\\\\" "" (regexp-opt '(
   "allowfullscreen" "async" "autofocus" "autoplay" "checked" "compact" "controls" "declare"
   "default" "defaultchecked" "defaultmuted" "defaultselected" "defer" "disabled" "draggable"
   "enabled" "formnovalidate" "hidden" "indeterminate" "inert" "ismap" "itemscope" "loop" "multiple"
   "muted" "nohref" "noresize" "noshade" "novalidate" "nowrap" "open" "pauseonexit" "readonly"
   "required" "reversed" "scoped" "seamless" "selected" "sortable" "spellcheck" "translate"
   "truespeed" "typemustmatch" "visible"
   ))) "$/;"))
*/

export const booleanAttrsRegex = /^(?:a(?:llowfullscreen|sync|uto(?:focus|play))|c(?:hecked|o(?:mpact|ntrols))|d(?:e(?:clare|f(?:ault(?:(?:check|(?:mu|selec)t)ed)?|er))|isabled|raggable)|enabled|formnovalidate|hidden|i(?:n(?:determinate|ert)|smap|temscope)|loop|mu(?:ltiple|ted)|no(?:href|resize|shade|validate|wrap)|open|pauseonexit|re(?:adonly|(?:quir|vers)ed)|s(?:coped|e(?:amless|lected)|ortable|pellcheck)|t(?:r(?:anslate|uespeed)|ypemustmatch)|visible)$/;

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
          addAttribute(key, attrs[key]);
        }
      }
    }
  }
};

export default attributesModule;
