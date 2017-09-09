var mongoose = require('mongoose');
// END OF PACKAGE IMPORTS
const schemamap = require('../schemas/map');
// END OF LOCAL IMPORTS

var output = {};
for (var schemaname in schemamap) {
  output[schemaname] = new mongoose.Schema(schemamap[schemaname]);
}
module.exports = output;
