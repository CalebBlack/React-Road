const decodeAuth = require('./decodeauth');
module.exports = function(req,models){
  var auth = decodeAuth(req);
  return new Promise((resolve,reject)=>{
    if (!auth) {
      reject('invalid auth');
    } else {
      models.Session.find({key:auth.username,secret:auth.password}).then(data=>{
        if (data[0]) {
          resolve(data[0]);
        } else {
          reject('token not found');
        }
      }).catch(err=>{
        reject(err);
      });
    }
  });
}
