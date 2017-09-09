const routemap = require('./routes/routemap.js');
function setupRouter(app) {
  for (var i; i < routemap.length; i++) {
    app.get('')
  }
}
module.exports = setupRouter
