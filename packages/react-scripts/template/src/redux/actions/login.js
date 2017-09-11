import request from '../../functions/request';
import * as statuses from '../loginstatuses';
import {setLoginStatus} from '../actiontypes';
import safeParse from '../../functions/safeparse';
export function initialize(){
  return dispatch => {
    dispatchLoginStatus(dispatch,statuses.initializing);
    if (localStorage.token) {
      var token = safeParse(localStorage.token);
      if (token) {
        console.log('found token',token);
        request('get','/api/validatetoken',[token.key,token.secret]).then(xhr=>{
          console.log('status',xhr.status);
          console.log('response',xhr.response);
          var result = safeParse(xhr.response);
          if (result) {
            dispatchLoginStatus(dispatch,statuses.loggedIn);
          } else {
            dispatchLoginStatus(dispatch,statuses.loggedOut);
          }
        }).catch(err=>{
          dispatchLoginStatus(dispatch,statuses.loggedOut);
        });
      } else {
        dispatchLoginStatus(dispatch,statuses.loggedOut);
      }
    } else {
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    }
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
      console.log('LOGIN RESPONSE',xhr.response);
      var result = safeParse(xhr.response);
      if (result) {
        localStorage.token = JSON.stringify(result.details);
        dispatchLoginStatus(dispatch,statuses.loggedIn);
      } else {
        dispatchLoginStatus(dispatch,statuses.loggedOut);
      }
    }).catch(err=>{
      console.log('request error',err);
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    });
  }
}
export function signup(username,password,email) {
  return dispatch => {
    request('post','/api/createuser',null,{username,password,email}).then(xhr=>{
      console.log('SIGNUP RESPONSE',xhr.response);
      var result = safeParse(xhr.response);
      if (result) {
        localStorage.token = JSON.stringify(result.details);
        dispatchLoginStatus(dispatch,statuses.loggedIn);
      } else {
        dispatchLoginStatus(dispatch,statuses.loggedOut);
      }
    }).catch(err=>{
      console.log('request error',err);
      dispatchLoginStatus(dispatch,statuses.loggedOut);
    });
  }
}
function dispatchLoginStatus(dispatch,status) {
  dispatch({type:setLoginStatus,status});
}
