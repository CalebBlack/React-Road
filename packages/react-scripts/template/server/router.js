const models = require('./models');
const routemap = require('./routes/map');
const secureroutemap = require('./routes/securemap');
const setupResponse = require('./functions/setupresponse');
const config = require('./config');
const APIRoute = config.APIRoute || '/api';
const validateAuthToken = require('./functions/validateauthtoken');
const find = require('./functions/findinmodel');
const sanitation = require('./functions/sanitize');
const methods = config.methods || ['get','post','delete','put','patch'];
const CompileFunction = require('./functions/compilefunctions');
const unmountedRoute = new CompileFunction(sanitation,models);
function precompileRoute(res) {
  return unmountedRoute.chain.apply(unmountedRoute,setupResponse.setup(res));
}
function setupRoute(responseFunction,secure=false){
  if (secure === true) {
    return (req,res)=>{
      validateAuthToken(req).then(token=>{
        find(models.User,{username:token.owner}).then(user=>{
          precompileRoute(res).compile(responseFunction)(req,user,token);
        }).catch(err=>{
          response.internal(res,err);
        });
      }).catch(err=>{
        response.error(res,'Invalid Token');
      });
    }
  } else {
    return (req,res)=>{
      precompileRoute(res).compile(responseFunction)(req);
    }
  }
}
function setupRoutes(app,map,secure=false){
  for (var routename in map) {
    var route = map[routename];
    var path = route.url || '/'+routename.toLowerCase();
    for (var methodname in route) {
      if (methodname !== 'url' && methods.includes(methodname) && app[methodname] && typeof route[methodname] === 'function') {
        console.log((secure === true ? "Securely ":"")+"Registering "+methodname.toUpperCase()+" on route "+routename);
        app[methodname](path,setupRoute(route[methodname],secure));
      }
    }
  }
}
function setupRouter(app){
  setupRoutes(app,routemap);
  setupRoutes(app,secureroutemap,true);
}
module.exports = setupRouter;
