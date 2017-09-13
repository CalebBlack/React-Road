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
          var responder = setupBasicRoute.chain(setupResponse(res)).compile(responseFunction);
          return function(req,res){
            responder(req,res,user,token);
          }
        }).catch(err=>{
          res.internal(err);
        });
      });
    } else {
      return setupBasicRoute.chain(setupResponse(res)).compile(responseFunction);
    }
  }
}
function setupRoutes(app,map,secure=false){
  for (var routename in map) {
    var route = map[routename];
    for (var methodname in route) {
      if (methods[methodname] && app[methodname]) {
        app[methodname]()
      }
    }
  }
}
module.exports = setupRouter
