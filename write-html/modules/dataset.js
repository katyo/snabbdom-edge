module.exports = function(vnode, addAttribute) {
  var dataset = vnode.data.dataset;

  if (dataset) {
    for (var key in dataset) {
      if (dataset.hasOwnProperty(key)) {
        addAttribute("data-" + key, dataset[key]);
      }
    }
  }
};
