function success(res,details=null,status=200) {
  res.status(status);
  res.json({status:'success',details});
}
function error(res,details=null,status=400){
  res.status(status);
  res.json({status:'error',details});
}
function internal(res,details=null,log = false,status=500){
  res.status(status);
  if (details && log) {
    console.log('###INTERNAL ERROR');
    console.log(details);
  }
  res.json({status:'internal error',{})
}
module.exports = {success,error,internal};
