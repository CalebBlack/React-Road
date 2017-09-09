const validateAuthToken = require('../functions/validateauthtoken');
const response = require('../functions/response');
const find = require('../functions/findinmodel');

function get(req,res,models){
  validateAuthToken(req).then(token=>{
    find(models.User,{username:token.owner}).then(user=>{
      response.success(res,user.created);
    }).catch(err=>{
      response.internal(res);
    });
  }).catch(err=>{
    response.error(res,'Invalid Auth');
  });
}
module.exports = {get};
