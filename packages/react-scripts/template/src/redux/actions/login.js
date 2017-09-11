import request from '../../functions/request';
import secureRequest from '../../functions/securerequest';
import * as statuses from '../loginstatuses';
import {setLoginStatus} from '../actiontypes';
import safeParse from '../../functions/safeparse';
export function initialize(){
  return dispatch => {
    dispatchLoginStatus(dispatch,statuses.initializing);
    secureRequest('get','/api/validatetoken').then(()=>{
      dispatchLoginStatus(dispatch,statuses.loggedIn);
    }).catch(err=>{
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    });
  }
}
export function logout(){
  return dispatch => {
    dispatchLoginStatus(dispatch,statuses.loggedOut);
  }
}
export function login(username,password) {
  return dispatch => {
    request('get','/api/login',[username,password]).then(xhr=>{
      var result = safeParse(xhr.response);
      if (result) {
        localStorage.token = JSON.stringify(result.details);
        dispatchLoginStatus(dispatch,statuses.loggedIn);
      } else {
        dispatchLoginStatus(dispatch,statuses.loggedOut);
      }
    }).catch(err=>{
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    });
  }
}
export function signup(username,password,email) {
  return dispatch => {
    request('post','/api/createuser',null,{username,password,email}).then(xhr=>{
      var result = safeParse(xhr.response);
      if (result) {
        localStorage.token = JSON.stringify(result.details);
        dispatchLoginStatus(dispatch,statuses.loggedIn);
      } else {
        dispatchLoginStatus(dispatch,statuses.loggedOut);
      }
    }).catch(err=>{
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    });
  }
}
function dispatchLoginStatus(dispatch,status) {
  dispatch({type:setLoginStatus,status});
}
