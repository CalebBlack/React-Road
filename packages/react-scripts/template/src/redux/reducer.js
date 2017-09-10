import * as types from './actiontypes';
import * as loginstatuses from './loginstatuses';
const initialstate = {loginstatus:loginstatuses.initializing};

function reducer(state=initialstate, action) {
  console.log('ACTION',action);
  switch (action.type) {
    case types.setLoginStatus:
      return Object.assign({}, state, {
        loginstatus: action.status
      });
    default:
      return state
  }
}
export default reducer;
