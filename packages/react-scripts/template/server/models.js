/*
This file generates your modules for you automatically.
*/
var mongoose = require('mongoose');
// END OF PACKAGE IMPORTS
const schemamap = require('../schemas/map');
// END OF LOCAL IMPORTS

var output = {};
for (var schemaname in schemamap) {
  output[schemaname.charAt(0).toUpperCase()+schemaname.substring(1)+'s'] = new mongoose.Schema(schemamap[schemaname]);
}
module.exports = output;
