function success(res,details,status=200) {
  res.status(status);
  res.json({status:'success',details});
}
function error(res,details,status=400){
  res.status(status);
  res.json({status:'error',details});
}
module.exports = {success,error};
