import React from "react";
import { Card, Icon, Image, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EditPetForm from "./EditPetForm";
import addNoteModal from "./NoteContainer";
import NoteForm from "./NoteForm";

class PetCard extends React.Component {
  // handleDeleteButton = () => {
  //   props.deletePet(props.pet)
  // }
  //testing modal click functionality
  state = { open: false };
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });
  //-------------------------------------------

  handleDeleteButton = () => {
    this.props.deletePet(this.props.pet);
    console.log("DELETE BUTTON CLICKED!!!");
    console.log(this.props);
  };

  render() {
    console.log(this.props.pet);
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    let pet = this.props.pet;
    console.log(pet);
    return (
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
            <div className="notebutton" style={{ textAlign: "center" }}>
              <Button
                as={Link}
                to="/notes"
                // style={{ marginTop: "10px" }}
                onClick={console.log("ho")}
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
    );
  }
}

export default PetCard;
