import React from "react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import NoteHeader from "./NoteHeader";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

class PetsContainer extends React.Component {
  state = { addednote: false, notes: [] };

  addednote = (newState) => {
    let newNotes = this.state.notes;
    newNotes.push(newState);
    this.setState({ addednote: !this.state.addednote, notes: newNotes });
  };

  render() {
    return (
      <Segment inverted className="note-container">
        <NoteHeader />
        {this.state.addednote === false ? (
          <NoteForm
            currentUserPets={this.props.currentUserPets}
            handleNoteSubmit={this.props.handleNoteSubmit}
            // addedNote={this.addednote}
          />
        ) : (
          <NoteCard
            petNotes={this.state.notes}
            currentUserPets={this.props.currentUserPets}
          />
        )}
        {/* <NoteForm
          currentUserPets={this.props.currentUserPets}
          handleNoteSubmit={this.props.handleNoteSubmit}
          addedNote={this.addednote}
        />
        <NoteCard /> */}
      </Segment>
    );
  }
}
export default PetsContainer;
// notedPet={this.props.notedPet}
