import request from '../../functions/request';
import statuses from '../loginstatuses';
import {setLoginStatus} from '../actiontypes';
export function initialize(){
  return dispatch => {
    if (localStorage.key && localStorage.secret) {
      request('get','validatetoken').then(response=>{
        console.log('response',response);
      }).catch(err=>{
        console.log('error',error);
        setLoginStatus(dispatch,statuses.loggedOut);
      })
    } else {
      setLoginStatus(dispatch,statuses.loggedOut);
    }
  }
}
function setLoginStatus(dispatch,status) {
  dispatch({type:setLoginStatus,status});
}
