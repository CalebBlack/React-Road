/*
This file generates your modules for you automatically, don't edit this unless you know what you are doing.
*/
var mongoose = require('mongoose');
// END OF PACKAGE IMPORTS
const schemamap = require('../schemas/map');
// END OF LOCAL IMPORTS

var output = {};
for (var schemaname in schemamap) {
  output[schemaname] = new mongoose.Schema(schemamap[schemaname]);
}
module.exports = output;
