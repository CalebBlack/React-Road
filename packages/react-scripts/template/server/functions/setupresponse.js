const config = require('../config');
function setup(res) {
  var outSuccess = function(details,status){
    success(res,details,status);
  }
  var outError = function(details,status){
    error(res,details,status);
  }
  var outInternal = function(details,status) {
    internal(res,details,status);
  }
  Object.defineProperty(outSuccess, "name", { value: "success" });
  Object.defineProperty(outError, "name", { value: "error" });
  Object.defineProperty(outInternal, "name", { value: "internal" });
  return [outSuccess,outError,outInternal];
}
function success(res,details=null,status=200) {
  res.status(status);
  res.json({status:'success',details});
}
function error(res,details=null,status=400){
  res.status(status);
  res.json({status:'error',details});
}
function internal(res,details=null,status=500){
  res.status(status);
  if (details && config.debug === true) {
    console.log('###INTERNAL ERROR');
    console.log(details);
  }
  res.json({status:'internal error',{})
}
module.exports = {setup,success,error,internal};
