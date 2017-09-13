module.exports = function(dbtoken){
  return {owner:dbtoken.owner,created:dbtoken.created,expires:dbtoken.expires,key:dbtoken.key,secret:dbtoken.secret}
}
