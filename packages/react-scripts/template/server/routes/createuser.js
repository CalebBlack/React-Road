const userManager = require('../managers/users');
const response = require('../functions/response');
function post(req,res,models,sanitation){
  if (req.body) {
    if (req.body.email && req.body.username && req.body.password ) {
      var userInput = sanitation(req.body,{email:'email',username:'username',password:'password'});
      console.log(userInput);
      if (userInput.email && userInput.username && userInput.password) {
        userManager.signup(models,userInput.username,userInput.password,userInput.email).then(user=>{
          userManager.login(models,user).then(token=>{
            console.log('token',sanitation(token,"token"));
            res.success(sanitation(token,"token"));
          }).catch(err=>{
            console.log(err);
            res.internal();
          })
        }).catch(err=>{
          console.log(err);
          res.internal();
        });
      } else {
        res.error('Invalid Parameters');
      }
    } else {
      res.error('Missing Parameters');
    }
  } else {
    res.error('Missing Body');
  }
}
module.exports = {post}
