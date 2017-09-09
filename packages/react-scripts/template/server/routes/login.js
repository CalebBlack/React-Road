const bcrypt = require('bcrypt');
const response = require('../functions/response');

const validateAuth = require('../functions/validateauth');
function get(req,res,models) {
  validateAuth(req,models).then(user=>{
    getToken(user,res,models);
  }).catch(err=>{
    console.log(err);
    response.error(res);
  });
}
function getToken(user,res,models){
  models.Session.find({owner:user.username}).then(data=>{
    if (data[0] && new Date(data[0].expires) > new Date()){
      response.success(res,sanitizeToken(data[0]));
    } else {
      if (data[0]) {
        data[0].remove().then(()=>{
          genToken(user.username,models).then(token=>{
            response.success(res, sanitizeToken(token));
          }).catch(err=>{
            response.internal(res);
          });
        }).catch(err=>{
          response.internal(res);
        });
      } else {
        genToken(user.username,models).then(token=>{
          response.success(res, sanitizeToken(token));
        }).catch(err=>{
          response.internal(res);
        });
      }

    }
  }).catch(err=>{
    console.log(err);
    response.internal(res);
  })
}
function genToken(username,models){
  return new Promise((resolve,reject)=>{
  expires = new Date();
  expires.setMonth( expires.getMonth( ) + 1 );
  token = new models.Session({owner:username,expires,key:Math.random().toString(36),secret:Math.random().toString(36)});
  console.log('NEW TOKEN',token);
  token.save().then(data=>{
    resolve(token);
  }).catch(err=>{
    reject(err);
  });
  });
}
function sanitizeToken(dbtoken){
  return {owner:dbtoken.owner,created:dbtoken.created,expires:dbtoken.expires,key:dbtoken.key,secret:dbtoken.secret}
}
module.exports = {get};
