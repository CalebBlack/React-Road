const decodeAuth = require('../functions/decodeauth');

module.exports = function(req,models) {
  return new Promise((resolve,reject)=>{
    var auth = decodeAuth(req);
    if (!auth) {
      reject('Improperly Formatted Auth');
    }
    models.User.find({username:auth.username.toLowerCase()}).then(users=>{
      if (users[0]){
        var user = users[0];
        bcrypt.compare(auth.password, user.hash, function(err, match) {
          if (err || match !== true) {
              reject(err);
            } else {
              resolve(user);
            }
        });
      } else {
        reject("User not found.");
      }
    }).catch(err=>{
      reject(err);
    });
  });
}
