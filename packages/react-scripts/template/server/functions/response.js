function setupRoute(functionin) {
  return function(req,res,models){
    functionin(req,setupResponse(res),models)
  }
}
function setupResponse(res){
  output = {res};
  output.success = function(details,status){
    success(output.res,details,status);
  }
  output.error = function(details,status){
    error(output.res,details,status);
  }
  output.internal = function(details,status){
    internal(output.res,details,status);
  }
  return output;
}

function success(res,details,status=200) {
  res.status(status);
  res.json({status:'success',details});
}
function error(res,details,status=400){
  res.status(status);
  res.json({status:'error',details});
}
function internal(res,details,status=500){
  res.status(500);
  res.json({status:'internal error',details})
}
module.exports = setupRoute;
