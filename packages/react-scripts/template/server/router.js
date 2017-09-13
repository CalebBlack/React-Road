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
const setupBasicRoute = function(req,res){Function.prototype.bind.call(CombineFunctions,[sanitation,models].concat(setupResponse(res))))};

function setupRoute(responseFunction,secure=false){
  var route = setupBasicRoute.chain(setupResponse(res)).compile(responseFunction);
  return (req,res)=>{
    if (secure){
      validateAuthToken(models,req).then(token=>{
        find(models.User,{username:token.owner}).then(user=>{
            setupBasicRoute.chain(req,res,user,token);
          }
        }).catch(err=>{
          res.internal(err);
        });
      });
    } else {
      route(req,res);
    }
  }
}
function setupRoutes(app,map,secure=false){
  for (var routename in map) {
    var route = map[routename];
    var path = route.url || '/'+routename.toLowerCase();
    for (var methodname in route) {
      if (methodname !== 'url' && methods[methodname] && app[methodname] && typeof route[methodname] === 'function') {
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
