const models = require('./models.js');
const routemap = require('./routes/map.js');
const config = require('./config.js');

const APIRoute = config.APIRoute || "/api";
const methods = config.methods || ['get','post','delete','put','patch'];
function sendModels(functionin){
  return (req,res)=>{functionin(req,res,models)};
}
function setupRouter(app,APIRoute="") {
  if (typeof APIRoute !== "string"){
    throw new Error("Invalid API Route, got "+APIRoute+", but a string is required.");
  }
  for (var routename in routemap) {
    var route = routemap[routename];
    var path = route.url || routename;
    for (var i = 0; i < methods.length; i++) {
      let method = methods[i];
      if (app[method] && route[method]) {
        app[method](APIRoute+'/'+path,sendModels(route[method]))
      }
    }
  }
}
module.exports = setupRouter
