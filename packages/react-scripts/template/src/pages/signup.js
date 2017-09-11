import React from 'react';
import * as statuses from '../redux/loginstatuses';
import {signup} from '../redux/actions/login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import AutoBind from 'react-autobind';

class Login extends React.Component {
  constructor(){
    super();
    AutoBind(this);
  }
  signup(username,password,email){
    console.log('Logging in...');
    this.props.dispatch(signup(username,password,email));
  }
  submitSignup(){
    var email = this.emailField.value;
    var username = this.usernameField.value;
    var password = this.passwordField.value;
    var confirmation = this.confirmationField.value;
    if (email.length >= 5 && username.length > 0 && password.length >= 5 && password === confirmation) {
      this.signup(username,password,email);
    }
  }
  renderSignupForm(){
    return (
      <div className='signupform'>
        <p>Email:</p>
        <input ref={ref=>{this.emailField = ref}} id="email"/>
        <p>Username:</p>
        <input ref={ref=>{this.usernameField = ref}} id="username"/>
        <p>Password:</p>
        <input ref={ref=>{this.passwordField = ref}} type='password' id='password'/>
        <p>Confirmation:</p>
        <input ref={ref=>{this.confirmationField = ref}} type='password' id='password'/>
        <button onClick={this.submitSignup}>Signup</button>
      </div>
    );
  }
  render() {
    if (this.props && this.props.loginStatus) {
      if (this.props.loginStatus === statuses.loggedOut) {
        return this.renderSignupForm();
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
