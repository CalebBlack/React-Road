function setupResponse(res){
  var res = res;
  var outsuccess = function(details,status){
    success(res,details,status);
  }
  var outerror = function(details,status){
    error(res,details,status);
  }
  var outinternal = function(details,status){
    internal(res,details,status);
  }
  Object.defineProperty(outsuccess, "name", { value: "success" });
  Object.defineProperty(outerror, "name", { value: "error" });
  Object.defineProperty(outinternal, "name", { value: "internal" });
  return [outsuccess,outerror,outinternal];
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
  if (details) {
    console.log('###INTERNAL ERROR');
    console.log(details);
  }
  res.json({status:'internal error',{})
}
module.exports = setupRoute;
