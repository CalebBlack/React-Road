const sanitizers = require('./sanitizers/map');
var validators = require('./validators/map');
validators = validators.map((validator)=>{return function(str){if(validator(str){return str})}});
function sanitize(query,format,customSanitizers={}){
  var output = null;
  if (validators[format]) {
    output = validators[format](query) || null;
  } else if (sanitizers[format]) {
    output = sanitizers[format](query) || null;
  } else if (customSanitizers[format]) {
    output = customSanitizers[format](query) || null;
  } else if (typeof query === format || (typeof query === 'object' && (typeof format === 'object' || format === "array"))) {
    if (Array.isArray(query) && format === 'array'){
      output = [];
      for (var i = 0; i < query.length; i++) {
        if (typeof query[i] !== 'object' && typeof query[i] !== 'function') {
          output[i] = query[i];
        }
      }
    } else if (typeof query === 'object') {
      output = {};
      for (var queryProp in query) {
        if (format[queryProp]) {
          var check = sanitize(query[queryProp],format[queryProp],sanitizers);
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
module.exports = sanitize
