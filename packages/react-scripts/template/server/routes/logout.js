const findInModel = require('../functions/findinmodel');
function get(req,res,models,sanitize,user){
  findInModel(models.Session,{owner:user.username}).then(data=>{
    if (data) {
      data.remove().then(()=>{
        res.success('Logged Out Successfully');
      }).catch(err=>{
        res.internal();
      });
    } else {
      res.internal();
    }
  }).catch(err=>{
    res.internal();
  });
}
module.exports = {get};
