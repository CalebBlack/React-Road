function get(req,models,user) {
  this.success({username:user.displayname});
}
module.exports = {get};
