import React from "react";
import SearchComp3 from "./SearchComp3";
import { Button, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  address: "",
  image: "",
  background_image: ""
};

class SignupForm extends React.Component {
  state = INITIAL_STATE;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onAddUser(this.state);
    this.setState(INITIAL_STATE);
  };

  render() {
    return this.props.newSignUpState ? (
      <Redirect to="/login" />
    ) : (
      <div>
        <h3 className="form-title">Please sign up to create an account</h3>
        <form className="ui form" onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Address</label>
            <SearchComp3 setUserLatLng={this.props.setUserLatLng} />
            {/* <input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" /> */}
          </div>
          <div className="field">
            <label>Profile Image</label>
            <input
              type="text"
              name="user_image"
              value={this.state.user_image}
              onChange={this.handleChange}
              placeholder="Profile Image URL"
            />
          </div>
          <div className="field">
            <label>Background Image</label>
            <input
              type="text"
              name="background_image"
              value={this.state.background_image}
              onChange={this.handleChange}
              placeholder="Background Image URL"
            />
          </div>
          <button type="submit" className="ui button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
