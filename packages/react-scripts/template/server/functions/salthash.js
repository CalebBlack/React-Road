bcrypt = require('bcrypt');
function genSaltHash(password,saltRounds=10) {
  return new Promise((resolve,reject)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve([salt,hash]);
            }
        });
      }
    });
  });
}
module.exports = genSaltHash;
