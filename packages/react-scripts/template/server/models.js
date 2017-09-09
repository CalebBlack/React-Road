/*
This file generates your modules for you automatically.
*/
const mongoose = require('mongoose');
// END OF PACKAGE IMPORTS
const schemamap = require('./schemas/map');
const config = require('./config');
// END OF LOCAL IMPORTS
mongoose.connect(config.mongoaddress || 'mongodb://localhost/test')
var output = {};
for (var schemaname in schemamap) {
  let modelName = schemaname.charAt(0).toUpperCase()+schemaname.substring(1)+'s';
  console.log('Creating Model '+modelName)
  output[modelName] = new mongoose.Schema(schemamap[schemaname]);
}
module.exports = output;
