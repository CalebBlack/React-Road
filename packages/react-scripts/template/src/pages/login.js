import React from 'react';
import * as statuses from '../redux/loginstatuses';
import {login} from '../redux/actions/login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import AutoBind from 'react-autobind';

class Login extends React.Component {
  constructor(){
    super();
    AutoBind(this);
  }
  login(username,password){
    console.log('Logging in...');
    this.props.dispatch(login(username,password));
  }
  submitLogin(){
    var username = this.usernameField.value;
    var password = this.passwordField.value;
    if (username.length > 0 && password.length >= 5) {
      this.login(username,password);
    }
  }
  renderLoginForm(){
    return (
      <div className='loginform'>
        <p>Username:</p>
        <input ref={ref=>{this.usernameField = ref}} id="username"/>
        <p>Password:</p>
        <input ref={ref=>{this.passwordField = ref}} type='password' id='password'/>
        <button onClick={this.submitLogin}>Login</button>
      </div>
    );
  }
  render() {
    if (this.props && this.props.loginStatus) {
      if (this.props.loginStatus === statuses.loggedOut) {
        return this.renderLoginForm();
      } else if (this.props.loginStatus === statuses.loggedIn) {
        return (<Redirect to="/"/>);
      } else {
        return (<p>Loading...</p>)
      }
    } else {
      return (<p>Loading...</p>);
    }
  }
}
function mapStateToProps(state){
  return ({loginStatus:state.loginStatus});
}
export default connect(mapStateToProps, null)(Login);
