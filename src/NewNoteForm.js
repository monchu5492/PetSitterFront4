import React, { Component } from "react";
import { Button, Form, Radio, TextArea, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NoteHeader from "./NoteHeader";
import { withRouter } from "react-router";

class NewNoteForm extends Component {
  state = {};

  handleChange = (e, { value }) => {
    this.setState({ ...this.state, value: value, priority: value });
  };
  handleCatChange = (e) => {
    console.log(e.target.value);
    this.setState({ ...this.state, catagory: e.target.value });
  };
  handleDesChange = (e, { value }) => {
    this.setState({ ...this.state, description: value });
  };
  handlePetChange = (e, { value }) => {
    this.setState({ ...this.state, pet_id: value });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    let { description, catagory, priority } = this.state;
    let newState = {
      description: description,
      catagory: catagory,
      priority: priority,
      pet_id: this.props.currentPet.id,
    };
    console.log(newState);
    this.props.handleNoteSubmit(newState);
    this.props.history.push("/notes");
  };

  render() {
    const { value } = this.state;
    return (
      <Segment
        style={{
          height: "100vh",
          textAlign: "-webkit-center",
        }}
        inverted
      >
        <NoteHeader />
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

          <select
            class="ui fluid search dropdown"
            multiple=""
            onChange={this.handleCatChange}
            id="catagory"
          >
            <option value="" hidden>
              Catagory
            </option>
            <option value="Health Care">Health Care</option>
            <option value="Feeding">Feeding</option>
            <option value="Bathing">Bathing</option>
            <option value="Exercise">Exercise</option>
            <option value="Other">Other</option>
          </select>
          <Form.Group
            inline
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <label>
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
            type="submit"
            color="green"
            style={{ marginTop: "20px", width: "30%" }}
          >
            Submit
          </Button>
          <Button
            color="facebook"
            style={{ marginTop: "1.5em", marginLeft: ".5em", width: "30%" }}
            as={Link}
            to="/notes"
          >
            Notes
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default withRouter(NewNoteForm);
