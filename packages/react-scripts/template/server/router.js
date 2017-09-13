const models = require('./models');
const routemap = require('./routes/map');
const secureroutemap = require('./routes/securemap');
const setupResponse = require('./functions/response');
const config = require('./config');
const APIRoute = config.APIRoute || '/api';
const validateAuthToken = require('./functions/validateauthtoken');
const find = require('./functions/findinmodel');
const sanitation = require('./functions/sanitize');
const methods = config.methods || ['get','post','delete','put','patch'];
const CompileFunction = require('./functions/compilefunctions');
const setupBasicRoute = new CompileFunction(sanitation,models);

function setupRoute(responseFunction,secure=false){
  var route = setupBasicRoute.compile(responseFunction);
  return (req,res)=>{
    if (secure){
      validateAuthToken(models,req).then(token=>{
        find(models.User,{username:token.owner}).then(user=>{
          setupBasicRoute.chain(setupResponse(res)).compile(responseFunction)(req,res,user,token);
        }).catch(err=>{
          console.log(err);
          res.internal();
        });
      });
    } else {
      return route(req,res);
    }
  }
}
function sendModels(functionin){
  return (req,res)=>{functionin(req,res,models)};
}
function setupRouter(app) {
  if (typeof APIRoute !== "string"){
    throw new Error("Invalid API Route, got "+APIRoute+", but a string is required.");
  }
  for (var routename in routemap) {
    var route = routemap[routename];
    var path = route.url || routename;
    for (var i = 0; i < methods.length; i++) {
      let method = methods[i];
      if (app[method] && route[method]) {
        let target = APIRoute+'/'+path;
        console.log("Registering",method.toUpperCase(),'on',target);
        app[method](target,sendModels(setupResponse(setupSanitation(route[method]))));
      }
    }
  }
  for (var routename in secureroutemap) {
    var route = secureroutemap[routename];
    var path = route.url || routename;
    for (var i = 0; i < methods.length; i++) {
      let method = methods[i];
      if (app[method] && route[method]) {
        let target = APIRoute+'/'+path;
        console.log("Securely Registering",method.toUpperCase(),'on',target);
        app[method](target,sendModels(setupResponse(setupSanitation(secureRoute(route[method])))));
      }
    }
  }
}
function setupSanitation(functionin){
  return function(req,res,models){
    functionin(req,res,models,sanitation);
  }
}
function secureRoute(functionin) {
  return function(req,res,models,sanitation){
      validateAuthToken(models,req).then(token=>{
        find(models.User,{username:token.owner}).then(user=>{
          functionin(req,res,models,sanitation,user);
        }).catch(err=>{
          console.log(err)
          res.internal();
        });
      }).catch(err=>{
        res.error('Invalid Auth');
      });
  }
}
module.exports = setupRouter
