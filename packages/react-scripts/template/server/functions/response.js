function success(res,details) {
  res.json({status:'success',details});
}
function error(res,details){
  res.json({status:'error',details});
}
module.exports = {success,error};
