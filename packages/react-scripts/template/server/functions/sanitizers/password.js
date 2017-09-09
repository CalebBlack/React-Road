const validator = require('../validators/password.js');
module.exports = function(str){if (validator(str)){return str}};
