const saltHash = require('../functions/salthash');
const sanitize = require('../functions/sanitize');
const response = require('../functions/response');
function get(req,res,models) {
  res.send('success')
}
function post(req,res,models){
  if (req.body) {
    if (req.body.email && req.body.username && req.body.password ) {
      var userInput = sanitize(req.body,{email:'email',username:'username',password:'password'});
      if (userInput.email && userInput.username && userInput.password) {
        var userData = {email:userInput.email,username:userInput.username.toLowerCase(),displayname:userInput.username};

        saltHash(userInput.password).then(salthash=>{
          userData.salt = salthash[0];
          userData.hash = salthash[1];
          var user = new models.User(userData);
          user.save(err=>{
            if (err) {
              console.log(err);
              response.error(res,'Creation Error');
            } else {
              response.success(res);
            }
          });
        }).catch(()=>{
          response.error(res,'Creation Error')
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
module.exports = {get,post}
