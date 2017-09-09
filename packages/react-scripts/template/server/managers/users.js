const bcrypt = require('bcrypt');
function create(models,username,password,email){
  var userData = {username:username.toLowerCase(),displayname:username,email};
}
function login(models,username,password){

}
module.exports = {login,create};
