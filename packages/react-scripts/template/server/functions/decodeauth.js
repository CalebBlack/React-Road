module.exports = function(req) {
  if (!req || !req.headers || !req.headers.authorization || typeof req.headers.authorization !== "string") {
    return null;
  }
  var auth = req.headers.authorization;
  if (!auth.startsWith('Basic ')) {
    return null;
  }
  auth = Buffer.from(auth.substring(6), 'base64').toString('utf8').split(':');
  if (auth.length !== 2) {
    return null;
  }
  return {username:auth[0],password:auth[1]};
}
