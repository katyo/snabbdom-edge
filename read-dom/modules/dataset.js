/* Read set of datas from the elm. */

module.exports = function(data, elm) {
  var dataset = elm.dataset;

  for (var key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      var value = dataset[key];

      if (!data.dataset) {
        data.dataset = {};
      }

      data.dataset[key] = value;
    }
  }
};
