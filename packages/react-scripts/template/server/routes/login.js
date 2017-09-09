const bcrypt = require('bcrypt');
const response = require('../functions/response');
const decodeAuth = require('../functions/decodeauth');
function get(req,res,models) {
  var auth = decodeAuth(req);
  if (!auth) {
    return response.error(res,'Improperly Formatted Auth');
  }
  models.User.find({username:auth.username.toLowerCase()}).then(users=>{
    if (users[0]){
      var user = users[0];
      console.log(auth);
      bcrypt.compare(auth.password, user.hash, function(err, match) {
          if (err || match !== true) {
            response.error(res,'Login Failure');
          } else {
            getToken(user,res,models);
          }
      });
    } else {
      response.error(res,"User not found.");
    }
  }).catch(err=>{
    response.error(res,"Internal Error");
  });
  //return response.success(res,auth);
}
function getToken(user,res,models){
  models.Session.find({owner:user.username}).then(data=>{
    if (data[0]){
      response.success(res,sanitizeToken(data[0]));
    } else {
      expires = new Date();
      expires.setMonth( expires.getMonth( ) + 1 );
      token = new models.Session({owner:user.username,expires,key:Math.random().toString(36),secret:Math.random().toString(36)});
      console.log('NEW TOKEN',token);
      token.save().then(data=>{
        response.success(res,sanitizeToken(token));
      }).catch(err=>{
        console.log(err);
        response.internal(res);
      })
    }
  }).catch(err=>{
    console.log(err);
    response.internal(res);
  })
}
function sanitizeToken(dbtoken){
  return {owner:dbtoken.owner,created:dbtoken.created,expires:dbtoken.expires,key:dbtoken.key,secret:dbtoken.secret}
}
module.exports = {get};
