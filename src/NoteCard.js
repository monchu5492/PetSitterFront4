import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeleteNoteModal from "./DeleteNoteModal";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York.",
].join(" ");

const centeredCSS = { display: "flex", justifyContent: "center" };

const notesURL = "http://localhost:3000/notes";

class CardExampleExtraContent extends React.Component {
  constructor() {
    super();
    this.state = {
      changed: false,
    };
  }

  handleEditNoteOnClick = (e) => {
    let editNoteId = e.target.id;
    let editNote;
    this.props.currentPet.notes.map((note) => {
      if (note.id === parseInt(editNoteId)) {
        editNote = note;
      }
    });

    console.log(editNote);
    this.props.editNoteOnClick(editNote);
  };

  mapPetNotes = (currentPet) => {
    console.log(currentPet);
    return currentPet.notes.map((note) => {
      return (
        <div className="card" key={note.id}>
          <div className="content" style={{ textAlign: "center" }}>
            <img
              className="mini ui image"
              src={currentPet.image}
              style={{ marginBottom: "1vh" }}
            ></img>
            <div className="header">{currentPet.name}</div>
          </div>
          <div class="meta" style={{ textAlign: "center" }}>
            <span class="date">Priority: {note.priority}</span>
          </div>
          <div className="content" style={{ textAlign: "center" }}>
            <div className="description">{note.description}</div>
          </div>
          <div
            className="extra content"
            style={{ textAlign: "center", display: "flex" }}
          >
            <div className="ui two buttons">
              <Button
                className="ui basic green button"
                as={Link}
                to="/editnoteform"
                id={note.id}
                style={{ maxWidth: "50%" }}
                onClick={this.handleEditNoteOnClick}
              >
                Edit
              </Button>
              <DeleteNoteModal
                style={{ minWidth: "100%" }}
                handleDeleteNoteOnClick={this.props.handleDeleteNoteOnClick}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <Segment inverted style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <div className="ui three cards">
          {this.mapPetNotes(this.props.currentPet)}
        </div>
      </Segment>
    );
  }
}

export default CardExampleExtraContent;
