import * as types from './actiontypes';
import * as loginStatuses from './loginstatuses';
const initialstate = {loginStatus:loginStatuses.uninitialized};

function reducer(state=initialstate, action) {
  switch (action.type) {
    case types.setLoginStatus:
      if (action.status === loginStatuses.loggedOut) {
        localStorage.token = null;
      }
      return Object.assign({}, state, {
        loginStatus: action.status
      });
    default:
      return state
  }
}
export default reducer;
