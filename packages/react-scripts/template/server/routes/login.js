const userManager = require('../managers/users');

const validateAuth = require('../functions/validateauth');
function get(req,res,models) {
  validateAuth(req,models).then(user=>{
    userManager.login(models,user).then(token=>{
      this.success(this.sanitize(token,'token'));
    }).catch(err=>{
      this.internal();
    });
  }).catch(err=>{
    this.error(res,'Auth Validation Error');
  });
}

module.exports = {get};
