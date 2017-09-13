function get(req,res,models,sanitize,user) {
  res.success({username:user.displayname});
}
module.exports = {get};
