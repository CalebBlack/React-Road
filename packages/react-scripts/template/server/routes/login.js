const userManager = require('../managers/users');

const validateAuth = require('../functions/validateauth');
function get(req,res,models) {
  validateAuth(req,models).then(user=>{
    userManager.login(models,user).then(token=>{
      res.success(sanitizeToken(token));
    }).catch(err=>{
      res.internal();
    });
  }).catch(err=>{
    response.error(res,'Auth Validation Error');
  });
}
function sanitizeToken(dbtoken){
  return {owner:dbtoken.owner,created:dbtoken.created,expires:dbtoken.expires,key:dbtoken.key,secret:dbtoken.secret}
}
module.exports = {get};
