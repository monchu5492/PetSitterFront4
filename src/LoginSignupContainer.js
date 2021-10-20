import React from 'react';

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


//Callbacks:
// setUser()
// getUser()
// createUser()
// logUserOut()

//render either login or signup form based on which one was clicked in the navbar
//testing notes feature
//testing notes #2
//testing notes #3

export default class LoginSignupContainer extends React.Component {
  render() {
      return(
        <div>
        <LoginForm onLogInUser={this.props.onLogInUser} userState={this.props.userState} isLoggedIn={this.props.isLoggedIn}/>
  
        </div>
      )
    }
  }

// export default LoginSignUpContainer