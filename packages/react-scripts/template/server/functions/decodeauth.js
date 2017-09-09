module.exports = function(req) {
  if (!req || !req.headers || !req.headers.authorization || typeof req.headers.authorization !== "string") {
    return null;
  }
  auth = req.headers.authorization;
  if (!auth.startsWith('Basic ')) {
    return null;
  }
  return Buffer.from(auth.substring(6), 'base64').toString('utf8');
}
