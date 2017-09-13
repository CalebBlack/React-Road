function get(req,models,user,token){
  var self = this;
  token.remove().then(()=>{
    self.success('logged out');
  }).catch(err=>{
    self.internal(err);
  });
}
module.exports = {get};
