const userManager = require('../managers/users');
const validateAuth = require('../functions/validateauth');

function get(req,models) {
  validateAuth(req,models).then(user=>{
    userManager.login(models,user).then(token=>{
      this.success(this.sanitize(token,'token'));
    }).catch(err=>{
      this.internal(err);
    });
  }).catch(err=>{
    this.error('Auth Validation Error');
  });
}

module.exports = {get};
