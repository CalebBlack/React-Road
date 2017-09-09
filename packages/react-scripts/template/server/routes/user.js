const genHash = require('../functions/genhash');
const sanitize = require('../functions/sanitize');
const response = require('../functions/response');
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
