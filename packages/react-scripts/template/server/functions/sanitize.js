function sanitize(query,format){
  var output = null;
  if (typeof query === typeof format) {
    if (typeof query === 'object') {
      output = {};
      for (var queryProp in query) {
        if (format[queryProp]) {
          output[queryProp] = sanitize(query[queryProp],format[queryProp]);
        }
      }
    } else {
      output = query;
    }
  }
  output;
}
