const routemap = require('./routes/map.js');
function setupRouter(app,APIRoute="") {
  if (typeof APIRoute !== "string"){
    throw new Error("Invalid API Route, got "+APIRoute+", but a string is required.");
  }
  for (var routename in routemap) {
    var route = routemap[routename];
    var path = route.url || routename;
    if (route.get) {
      app.get(APIRoute+path,route.get);
    }
    if (route.post) {
      app.post(APIRoute+path,route.create);
    }
    if (route.create) {
      app.create(APIRoute+path,route.get);
    }
    if (route.delete) {
      app.delete(APIRoute+path,route.delete
    }
    if (route.put) {
      app.put(APIRoute+path,route.delete)
    }
  }
}
module.exports = setupRouter
