import React from 'react';
import { Redirect } from 'react-router-dom'
// import { Button, Form } from 'semantic-ui-react'
const INITIAL_STATE = {
  name: ""
}

class LoginForm extends React.Component {
  state = INITIAL_STATE

  handleOnChange = e => {
    this.setState({name: e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.onLogInUser(this.state.name)
    this.setState(INITIAL_STATE)
    
  }

  render() {
    return(
      this.props.isLoggedIn ? ( <Redirect to="/profile"/> ) : (
      //Want to redirect user to MyProfile after Login
      // this.props.isLoggedIn ? ( <Redirect to="/profile"/> ) : (
      <div>
      <h3 className="form-title">Please Login to view your account</h3>
      <form className="ui form" onSubmit={this.handleOnSubmit}>
      <div className="field">
        <label>Username</label>
        <input name="first name" placeholder="First Name" onChange={this.handleOnChange}/>
      </div>
      <button type="submit" className="ui button">Submit</button>
    </form>
    </div>
      )
    )
    // )
  }
}

export default LoginForm