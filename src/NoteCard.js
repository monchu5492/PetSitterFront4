import React from "react";
import CardSnippets from "./CardSnippets";
import { Card, Icon } from "semantic-ui-react";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York.",
].join(" ");

export default class CardExampleExtraContent extends React.Component {
  render() {
    // {
    //   console.log(this.props.petNotes);
    // }
    if (this.props.petNotes) {
      console.log(this.props.petNotes);
      let currentPet = this.props.currentUserPets.filter(
        (pet) => pet.id === this.props.petNotes[0].pet_id
      );
      console.log(currentPet);
      return (
        <Card>
          <Card.Content header={`Notes for ${currentPet[0].name}`} />
          <Card.Content description={this.props.petNotes[0].description} />
          <Card.Content extra>
            <Icon name="user" />4 Friends
          </Card.Content>
        </Card>
      );
    }
  }
}
