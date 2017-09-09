function sanitize(query,format){
  var output = null;
  if (typeof query === format || (typeof query === 'object' && typeof format === 'object')) {
    if (typeof query === 'object') {
      output = {};
      for (var queryProp in query) {
        if (format[queryProp]) {
          var check = sanitize(query[queryProp],format[queryProp]);
          if (check) {
            output[queryProp] = check;
          }
        }
      }
    } else {
      output = query;
    }
  }
  return output;
}
module.exports = sanitize;
