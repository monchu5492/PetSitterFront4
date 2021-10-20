import React from "react";
import { Button, Form, Header, Image, Modal } from "semantic-ui-react";

// const INITIAL_STATE = {
//   name: "",
//   image: "",
//   anmial_type: "",
//   age: ""
//   //    owner_id: ""
// };
class EditPetForm extends React.Component {
  //testing modal click functionality
  state = { open: false };
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });
  //-------------------------------------------

  state = {
    // INITIAL_STATE
    id: this.props.pet.id,
    name: this.props.pet.name,
    image: this.props.pet.image,
    anmial_type: this.props.pet.anmial_type,
    age: this.props.pet.age,
  };

  INITIAL_STATE() {
    return this.state;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditButton = (e) => {
    // debugger;
    e.preventDefault();
    this.props.editPetChange(this.state);
    this.setState(this.INITIAL_STATE());
    this.close();
  };
  render() {
    console.log("hit edit pet form");
    //testing modal:
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={this.closeConfigShow(false, true)}
          id="edit"
          color="#2185d0"
          inverted
          // style={{ maxWidth: "13.2em" }}
        >
          Edit
        </Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Edit Your Pet</Modal.Header>
          <Modal.Content>
            <p>Please update info about your pet</p>
          </Modal.Content>
          <form className="ui form" onSubmit={this.handleEditButton}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder={this.props.pet.name}
              />
            </div>
            <div className="field">
              <label>Profile Image</label>
              <input
                type="text"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
                placeholder={this.props.pet.image}
              />
            </div>
            <div className="field">
              <label>Anmial Type</label>
              <input
                type="text"
                name="anmial_type"
                value={this.state.anmial_type}
                onChange={this.handleChange}
                placeholder={this.props.pet.anmial_type}
              />
            </div>
            <div className="field">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
                placeholder={this.props.pet.age}
              />
            </div>
            {/* <button type="submit" className="ui button">Submit</button> */}
          </form>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Close
            </Button>
            <Button
              onClick={this.handleEditButton}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Submit"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default EditPetForm;
