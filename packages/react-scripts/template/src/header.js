import React from 'react';
import * as loginActions from './redux/actions/login';
import {connect} from 'react-redux';
import * as statuses from './redux/loginstatuses';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(){
    super();
    this.props = {};
  }
  componentDidMount(){
      if (this.props.dispatch) {
        this.props.dispatch(loginActions.initialize());
      }
  }
  render(){
    return (<header id="header">{this.renderLogin()}</header>)
  }
  renderLogin(){
    if (this.props.loginStatus) {
      if (this.props.loginStatus === statuses.uninitialized || this.props.loginStatus === statuses.initializing) {
        return null;
      } else if (this.props.loginStatus === statuses.loggedOut) {
        return (<div className='loginholder'><Link className='login' to='/login'>Login</Link><Link className='signup' to='/signup'>Signup</Link></div>);
      } else if (this.props.loginStatus === statuses.loggedIn) {
        return (<div className='loginholder'><Link className='logout' to='/logout'>Logout</Link></div>);
      } else {
        return (<p>Login Error</p>);
      }
    } else {
      return (<p>login error</p>);
    }
  }
}
function mapStateToProps(state) {
  return({loginStatus:state.loginStatus});
}
export default connect(mapStateToProps, null)(Header)
