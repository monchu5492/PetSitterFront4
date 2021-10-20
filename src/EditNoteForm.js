import React, { Component } from "react";
import {
  Button,
  Form,
  Radio,
  Select,
  TextArea,
  Segment,
} from "semantic-ui-react";
import NoteHeader from "./NoteHeader";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { convertNeSwToNwSe } from "google-map-react";

const options = [
  { key: "h", text: "Health Care", value: "catagory" },
  { key: "f", text: "Feeding", value: "catagory" },
  { key: "b", text: "Bathing", value: "catagory" },
  { key: "e", text: "Exercise", value: "catagory" },
  { key: "o", text: "Other", value: "catagory" },
];

class EditNoteForm extends Component {
  state = {};

  componentDidMount = () => {
    let editNote = this.props.currentNote;
    this.setState({ value: editNote.priority });
  };

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
      id: this.props.currentNote.id,
    };
    console.log(newState);
    this.props.handleEditNoteSubmit(newState);
    this.props.history.push("/notes");
  };

  displayOptions = (option) => {
    // let optionAry = ["Health Care", "Feeding", "Bathing", "Exercise", "Other"];
    let editNote = this.props.currentNote;

    console.log(option);
    console.log(editNote.catagory);
    if (option !== editNote.catagory) {
      return <option value={option}>{option}</option>;
    }
  };

  render() {
    const { value } = this.state;
    let editNote = this.props.currentNote;
    let optionAry = ["Health Care", "Feeding", "Bathing", "Exercise", "Other"];

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
            <option value="">{editNote.catagory}</option>
            {optionAry.map((option) => {
              if (option !== editNote.catagory) {
                return <option value={option}>{option}</option>;
              }
            })}
            {/* <option value="Health Care">Health Care</option>
            <option value="Feeding">Feeding</option>
            <option value="Bathing">Bathing</option>
            <option value="Exercise">Exercise</option>
            <option value="Other">Other</option> */}
          </select>

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
            placeholder={editNote.description}
            onChange={this.handleDesChange}
            style={{ marginTop: "15px" }}
          />
          <Button
            // onClick={this.handleOnSubmit}
            type="submit"
            color="green"
            style={{ marginTop: "1.5em", marginRight: ".5em", width: "30%" }}
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

export default withRouter(EditNoteForm);
