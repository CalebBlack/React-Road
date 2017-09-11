function get(req,res,models,sanitize,user){
  res.success(user.created);
}
module.exports = {get};
