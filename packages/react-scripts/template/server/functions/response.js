function setupResponse(res){
  output = []
  var outsuccess = function(details,status){
    success(output.res,details,status);
  }
  var outerror = function(details,status){
    error(output.res,details,status);
  }
  var outinternal = function(details,status){
    internal(output.res,details,status);
  }
  Object.defineProperty(outsuccess, "name", { value: "success" });
  Object.defineProperty(outerror, "name", { value: "error" });
  Object.defineProperty(outinternal, "name", { value: "internal" });
  return [outsuccess,outerror,outinternal];
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
