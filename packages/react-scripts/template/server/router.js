const models = require('./models.js');
const routemap = require('./routes/map.js');
const config = require('./config.js');

const APIRoute = config.apiroute || "/api";
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
      let target = APIRoute+'/'+path;
      console.log("Registering",method,'on',target)
      if (app[method] && route[method]) {
        app[method](target,sendModels(route[method]))
      }
    }
  }
}
module.exports = setupRouter
