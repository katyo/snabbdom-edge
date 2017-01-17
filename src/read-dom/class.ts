/* Builds the class object for the VNode. */
import {Module} from './module';

export const classModule: Module = function(data, elm) {
  const {className} = elm;

  if (className !== null && className.length > 0) {
    var list = className.split(/ /g);

    if (list.length > 0) {
      data.class = {};

      for (var i = 0; i < list.length; i++) {
        data.class[list[i]] = true;
      }
    }
  }
};

export default classModule;
