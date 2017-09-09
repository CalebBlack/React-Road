/*
This file generates your modules for you automatically.
*/
var mongoose = require('mongoose');
// END OF PACKAGE IMPORTS
const schemamap = require('./schemas/map');
// END OF LOCAL IMPORTS

var output = {};
for (var schemaname in schemamap) {
  let modelName = schemaname.charAt(0).toUpperCase()+schemaname.substring(1)+'s';
  console.log('Creating Model '+modelName)
  output[modelName] = new mongoose.Schema(modelName,schemamap[schemaname]);
}
module.exports = output;
