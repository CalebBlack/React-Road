const userManager = require('../managers/users');
function post(req){
  if (req.body) {
    if (req.body.email && req.body.username && req.body.password ) {
      var userInput = this.sanitize(req.body,{email:'email',username:'username',password:'password'});
      if (userInput.email && userInput.username && userInput.password) {
        userManager.signup(models,userInput.username,userInput.password,userInput.email).then(user=>{
          userManager.login(models,user).then(token=>{
            this.success(sanitation(token,"token"));
          }).catch(err=>{
            this.internal(err);
          })
        }).catch(err=>{
          this.internal(err);
        });
      } else {
        this.error('Invalid Parameters');
      }
    } else {
      this.error('Missing Parameters');
    }
  } else {
    this.error('Missing Body');
  }
}
module.exports = {post}
