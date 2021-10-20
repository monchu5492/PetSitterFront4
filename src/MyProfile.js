import React from "react";
import { Image, Header, Divider, Segment } from "semantic-ui-react";
import PetsContainer from "./PetsContainer";
import { withRouter } from "react-router-dom";

// testing note #1 alice

const ProfilePicture = (props) => (
  <Segment inverted>
    <div className="profile-top-section">
      <Image
        className="profilepic"
        src={props.user.user_image}
        size="medium"
        circular
      />
      <Header
        className="profilename"
        as="h3"
        style={{ fontSize: "2em", color: "white" }}
      >
        {props.user.name}
      </Header>
    </div>

    <Divider
      as="h4"
      className="header"
      horizontal
      style={{ margin: "3em 0em", textTransform: "uppercase" }}
    >
      <p>My Pets</p>
    </Divider>

    <PetsContainer
      currentUserPets={props.currentUserPets}
      currentPetNotes={props.currentPetNotes}
      updatePets={props.updatePets}
      user={props.user}
      freshPetsFunction={props.freshPetsFunction}
      editPet={props.editPet}
      deletePet={props.deletePet}
      editPetChange={props.editPetChange}
      setChosePetNoteId={props.setChosePetNoteId}
      setCurrentPet={props.setCurrentPet}
      petNotes={props.petNotes}
      // notedPet={props.notedPet}
    />
  </Segment>
);

export default ProfilePicture;
