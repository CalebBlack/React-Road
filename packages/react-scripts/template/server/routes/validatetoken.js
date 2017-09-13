function get(req,user) {
  this.success({username:user.displayname});
}
module.exports = {get};
