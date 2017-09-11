import React from 'react';
import {logout} from '../redux/actions/login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Logout extends React.Component {
  componentDidMount(){
    if (this.props && this.props.dispatch) {
      this.props.dispatch(logout());
    } else {
      console.log('logout error');
    }
  }
  render(){return(<Redirect to='/'/>);}
}
export default connect(null, null)(Logout);
