import React from "react";
import { Card, Icon, Image, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EditPetForm from "./EditPetForm";
import addNoteModal from "./NoteContainer";
import NoteForm from "./NoteForm";

class PetCard extends React.Component {
  state = { open: false };
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });
  //-------------------------------------------

  // notesOrAddNoteFunc = () => {
  //   if (this.props.pet.notes >= 1) {
  //     return (
  //       <Button as={Link} to="/notes" onClick={this.handleNotesOnClick}>
  //         Notes
  //       </Button>
  //     );
  //   }
  // };

  petNotesCallBack = () => {
    this.props.petNotes(this.props.pet.notes);
  };

  handleDeleteButton = () => {
    this.props.deletePet(this.props.pet);
  };

  handleNotesOnClick = () => {
    this.props.setCurrentPet(this.props.pet);
  };

  handleAddNotesOnClick = () => {
    this.props.setCurrentPet(this.props.pet);
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    let pet = this.props.pet;
    let petNotes = this.props.currentPetNotes;
    console.log(pet.notes == 0);
    console.log(petNotes);
    return (
      <div>
        {pet.notes == 0 ? (
          <Card
            style={{
              marginRight: "28px",
              maxHeight: "458.2px",
              marginTop: "15px",
            }}
            key={pet.id}
          >
            {console.log(pet.name)}
            <Image
              src={pet.image}
              wrapped
              ui={false}
              style={{ minHeight: "290px" }}
            />
            <Segment
              className="cardseg"
              style={{ margin: "unset", paddingBottom: "5px" }}
            >
              <Card.Content>
                <Card.Header style={{ color: "black" }}>
                  {pet.name}
                  <div style={{ float: "right" }}>{pet.anmial_type}</div>
                </Card.Header>
                <Card.Description>{`${pet.age} years old`}</Card.Description>
                <div
                  className="notebutton"
                  style={{
                    textAlign: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    as={Link}
                    to="/noteForm"
                    onClick={this.handleAddNotesOnClick}
                  >
                    Add a Note
                  </Button>
                </div>
              </Card.Content>
            </Segment>
            <EditPetForm
              editPet={this.props.editPet}
              user={this.props.user}
              pet={this.props.pet}
              editPetChange={this.props.editPetChange}
            />
            <div style={{ marginRight: "1px", marginLeft: "1px" }}>
              <Button
                className="ui button"
                color="orange"
                onClick={this.handleDeleteButton}
                style={{ width: "100%", marginBottom: "2px" }}
              >
                Delete Pet
              </Button>
            </div>
          </Card>
        ) : (
          <Card
            style={{
              marginRight: "28px",
              maxHeight: "458.2px",
              marginTop: "15px",
            }}
          >
            {console.log(pet.name)}
            <Image
              src={pet.image}
              wrapped
              ui={false}
              style={{ minHeight: "290px" }}
            />
            <Segment
              className="cardseg"
              style={{ margin: "unset", paddingBottom: "5px" }}
            >
              <Card.Content>
                <Card.Header style={{ color: "black" }}>
                  {pet.name}
                  <div style={{ float: "right" }}>{pet.anmial_type}</div>
                </Card.Header>
                <Card.Description>{`${pet.age} years old`}</Card.Description>
                <div
                  className="notebutton"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    as={Link}
                    to="/noteForm"
                    style={{ minWidth: "8.2em" }}
                    onClick={this.handleAddNotesOnClick}
                  >
                    Add a Note
                  </Button>
                  <Button
                    as={Link}
                    to="/notes"
                    style={{ minWidth: "8.2em" }}
                    onClick={this.handleNotesOnClick}
                  >
                    Notes
                  </Button>
                </div>
              </Card.Content>
            </Segment>
            <div
              style={{
                // textAlign: "center",
                width: "18em",
                margin: "0 auto",
              }}
            >
              <EditPetForm
                editPet={this.props.editPet}
                user={this.props.user}
                pet={this.props.pet}
                editPetChange={this.props.editPetChange}
                style={{ width: "100%" }}
              />
              <Button
                className="ui button"
                color="orange"
                onClick={this.handleDeleteButton}
                style={{
                  width: "100%",
                  marginBottom: "2px",
                }}
              >
                Delete Pet
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default PetCard;
