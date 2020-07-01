import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Segment,
} from "semantic-ui-react";

const options = [
  { key: "h", text: "Health Care", value: "catagory" },
  { key: "f", text: "Feeding", value: "catagory" },
  { key: "b", text: "Bathing", value: "catagory" },
  { key: "e", text: "Exercise", value: "catagory" },
  { key: "o", text: "Other", value: "catagory" },
];

class FormExampleFieldControl extends Component {
  state = {};

  newCurrentPets = () => {
    let userPets = this.props.currentUserPets.map((pet) => {
      return {
        key: pet.id,
        text: pet.name,
        value: pet.id,
      };
    });
    console.log(userPets);
    return userPets;
  };

  // componentDidMount = () => {
  //   this.newCurrentPets();
  // };

  handleChange = (e, { value }) =>
    this.setState({ ...this.state, value: value, priority: value });
  handleCatChange = (e, { value }) => {
    this.setState({ ...this.state, catagory: e.target.innerText });
  };
  handleDesChange = (e, { value }) => {
    this.setState({ ...this.state, description: value });
  };
  handlePetChange = (e, { value }) => {
    this.setState({ ...this.state, pet_id: value });
  };
  handleOnSubmit = () => {
    let { description, catagory, priority, pet_id } = this.state;
    let newState = {
      description: description,
      catagory: catagory,
      priority: priority,
      pet_id: pet_id,
    };
    this.props.handleNoteSubmit(newState);
    this.props.addedNote(newState);
  };

  render() {
    const { value } = this.state;
    return (
      <Segment
        style={{
          minHeight: "calc(100vh - 155px)",
          marginTop: "20px",
          textAlign: "-webkit-center",
        }}
        inverted
      >
        <Form
          onSubmit={this.handleOnSubmit}
          inverted
          style={{ maxWidth: "75%" }}
        >
          <label>
            <h3>
              <b>Catagory</b>
            </h3>
          </label>
          <Form.Field
            control={Select}
            options={options}
            placeholder="Catagory"
            onChange={this.handleCatChange}
            style={{ marginTop: "20px" }}
          />
          <label>
            <h3>
              <b>Select your pet</b>
            </h3>
          </label>
          <Form.Field
            control={Select}
            options={this.newCurrentPets()}
            placeholder="Your pets"
            onChange={this.handlePetChange}
            style={{ marginTop: "20px" }}
          />
          <Form.Group inline>
            <label style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3>
                <b>Priority</b>
              </h3>
            </label>
            <Form.Field
              control={Radio}
              label="General"
              value="General"
              checked={value === "General"}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label="Low"
              value="Low"
              checked={value === "Low"}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label="Moderate"
              value="Moderate"
              checked={value === "Moderate"}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label="Severe"
              value="Severe"
              checked={value === "Severe"}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label="Urgent"
              value="Urgent"
              checked={value === "Urgent"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <label>
            <h3>
              <b>Description</b>
            </h3>
          </label>
          <Form.Field
            control={TextArea}
            placeholder="Tell us more about you..."
            onChange={this.handleDesChange}
            style={{ marginTop: "15px" }}
          />
          <Button
            // onClick={this.handleOnSubmit}
            type="submit"
            floated="left"
            color="green"
            style={{ marginTop: "20px", width: "30%" }}
          >
            Submit
          </Button>
          <Button
            floated="right"
            primary
            style={{ marginTop: "20px", width: "30%" }}
          >
            Notes
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default FormExampleFieldControl;
