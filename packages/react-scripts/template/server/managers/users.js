const bcrypt = require('bcrypt');
function create(models,username,password,email){
  var userData = {username:username.toLowerCase(),displayname:username,email};
}
function login(models,user){
  return new Promise((resolve,reject)=>{
    models.Session.find({owner:user.username}).then(data=>{
      if (data[0]) {
        var token = data[0];
        if (new Date(token.expires) > new Date()){
          resolve(token);
        } else {
          token.remove().then(()=>{
            genToken(models,user.username).then(token=>{
              resolve(token);
            }).catch(err=>{
              reject(err);
            })
          }).catch(err=>{
            reject(err);
          });
        }
      } else {
        genToken(models,user.username).then(token=>{
          resolve(token);
        }).catch(err=>{
          reject(err);
        })
      }
    }).catch(err=>{
      reject(err);
    });
  });
}

function genToken(models,username){
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


module.exports = {login,create};
