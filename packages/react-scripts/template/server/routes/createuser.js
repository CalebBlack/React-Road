const userManager = require('../managers/users');
const sanitize = require('../functions/sanitize');
const response = require('../functions/response');
function post(req,res,models){
  if (req.body) {
    if (req.body.email && req.body.username && req.body.password ) {
      var userInput = sanitize(req.body,{email:'email',username:'username',password:'password'});
      if (userInput.email && userInput.username && userInput.password) {
        userManager.create(models,userInput.username,userInput.password,userInput.email).then(user=>{
          response.success(res,'Account Created');
        }).catch(err=>{
          response.internal(res);
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
