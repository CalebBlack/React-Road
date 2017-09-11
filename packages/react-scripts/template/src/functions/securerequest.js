const safeParse = require('./safeparse');
const securerequest = function (method, url, content) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    if (!localStorage.token) {
      reject('token missing');
      return;
    }
    var token = safeParse(localStorage.token);
    if (!token || !token.key || !token.secret) {
      reject('invalid token encoding');
      return;
    }
    xhr.setRequestHeader('Authorization', generateAuthStrings([token.key,token.secret]));
    if (content) {
      if (typeof content === 'object') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(content));
      } else {
        xhr.send(content);
      }
    } else {
      xhr.send();
    }
  });
}
function generateAuthStrings(strings) {
    console.log('gen strings',strings);
    var string = strings.join(':');
    console.log('prebasic string',string);
    var hash = window.btoa(string);
    console.log('hash',hash);
    return 'Basic ' + hash;
}
export default request;
