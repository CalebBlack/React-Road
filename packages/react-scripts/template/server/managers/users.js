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
function signup(models,username,email,password) {
  return new Promise((resolve,reject)=>{
    genHash(userInput.password).then(hash=>{
      var user = new models.User({username:username.toLowerCase(),displayname:username,email,hash});
      user.save().then(()=>{
        resolve(user);
      }).catch(err=>{
        reject(err);
      });
    }).catch(err=>{
      reject(err);
    });
  });
}
/*

function post(req,res,models){
  if (req.body) {
    if (req.body.email && req.body.username && req.body.password ) {
      var userInput = sanitize(req.body,{email:'email',username:'username',password:'password'});
      if (userInput.email && userInput.username && userInput.password) {
        userInput.displayname = userInput.username;
        userInput.username = userInput.username.toLowerCase();
        userInput.email = userInput.email.toLowerCase();
        genHash(userInput.password).then(hash=>{
          userInput.hash = hash;
          var user = new models.User(userInput);
          user.save(err=>{
            if (err) {
              console.log(err);
              response.error(res,'Creation Error');
            } else {
              response.success(res);
            }
          });
        }).catch((err)=>{
          console.log(err);
          response.error(res,'Creation Error');
        });
      } else {
        response.error(res,'Invalid Parameters');
      }
    } else {
      response.error(res,'Missing Parameters');
    }
  } else {
    response.error(res,'Missing Body');
  }
}
module.exports = {post}


*/

module.exports = {login,create};
