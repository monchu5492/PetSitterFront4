import React, { useState } from "react";
import "./App.css";
import HomepageLayout from "./HomepageLayout";
import NavBar from "./NavBar";
import LoginSignupContainer from "./LoginSignupContainer";
import MyProfile from "./MyProfile";
import SignupForm from "./SignupForm";
import AboutComp from "./AboutComp";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import EditNoteForm from "./EditNoteForm";
import NewNoteForm from "./NewNoteForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoteContainer from "./NoteContainer";

const ownersURL = "http://localhost:3000/owners";
const petsURL = "http://localhost:3000/pets";
const notesURL = "http://localhost:3000/notes";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      owners: [], //all owners, from db, and object containing all that user's pets
      isLoggedIn: false,
      newSignup: false,
      notedPet: "",
      user: [{}],
      userLatLng: {},
      currentPet: null, //the pets that belong to the current user
      currentUserPets: [],
      petNotes: [],
      ChosenPetNoteId: "",
      // user: [{
      //   id: 8,
      //   name: "Mario",
      //   address: "657 Waters Mall",
      //   user_image: "https://picsum.photos/seed/jbmdqaufloldlkmoprrgfznagbhtfyapkhoflpvklyjbduohcq/250",
      //   background_image: "https://picsum.photos/seed/jbmdqaufloldlkmoprrgfznagbhtfyapkhoflpvklyjbduohcq/250"
      // }]
    };
  }

  // setLocalStorage = (user) => {
  //   localStorage.setItem('user', JSON.stringify(user))
  //   let localUserId = localStorage.getItem('user').id
  // }

  // localUser = () => {
  //   let user = JSON.parse(localStorage.getItem('user'))
  //   return user
  // }
  componentDidMount() {
    this.getAllOwners();
    if (this.state.user) {
      // this.getFreshPets()
      console.log("user is in state");
    } else {
      return (
        <div>
          <Router>
            <Route path="/" exact render={() => <HomepageLayout />} />
          </Router>
        </div>
      );
    }

    // fetch(petsURL)
    // .then(res => res.json())
    // .then(pets => {
    //   // console.log(pets);
    //   // debugger;
    //   this.setState({...this.state, pets: pets})
    // })
  }

  getAllOwners = () => {
    fetch(ownersURL)
      .then((res) => res.json())
      .then(
        (owners) => (this.setOwner(owners), this.setState({ owners: owners }))
      );
  };

  setOwner = (owners) => {
    console.log(owners);
    let newUser;
    this.state.user.name
      ? ((newUser = owners.filter((user) => {
          user.id !== this.state.user.id;
        })),
        this.setState({ user: newUser }))
      : null;
  };

  getFreshPets = (pets) => {
    let newPetAry = this.state.currentUserPets;
    newPetAry.push(pets);
    this.setState({ currentUserPets: newPetAry });
  };

  editPet = (pets) => {
    let userPets = this.state.currentUserPets;
    let newPet;
    let filteredPet = userPets.filter((pet) => {
      if (pet.id === pets.id) {
        newPet = userPets.indexOf(pet);
      }
      return pet.id != pets.id;
    });
    filteredPet.splice(newPet, 0, pets);
    this.setState({
      currentUserPets: filteredPet,
    });
    console.log("current pets set");
  };

  // form for add pets: onsubmit -> post new pet to database
  // at the end of the .then, take the JSON data (newpet) call a function to:
  // query the database for the pet (getfreshpets) that match the user id (from props.user), send those to PetContainer
  // in petContainer -> filter over freshpets and create a PetCard for each

  // Login Feature, save state as user
  onLogInUser = (username) => {
    console.log("WE TRIED");
    let newNotes;
    let ownersfiltered = this.state.owners.filter(
      (owner) => owner.name == username
    );
    console.log(ownersfiltered);
    console.log(this.state.owners);
    if (ownersfiltered.length === 1) {
      console.log("OWNER FOUND", ownersfiltered[0]);
      ownersfiltered[0].pets
        ? (newNotes = ownersfiltered[0].pets.map((pet) => {
            return pet.notes.map((note) => {
              return note;
            });
          }))
        : (newNotes = []);
      this.setState({
        isLoggedIn: true,
        user: ownersfiltered[0],
        currentUserPets: ownersfiltered[0].pets,
        newSignup: false,
        petNotes: newNotes,
      });
      console.log(ownersfiltered);
      // this.getFreshPets(ownersfiltered[0].pets);
    }
  };

  setUserLatLng = (latLng) => {
    this.setState({ userLatLng: latLng });
  };

  //Sign Up Feature: Adding User to state of owners
  addUser = (owner) => {
    this.setState(
      (prevState) => {
        return {
          owners: [...prevState.owners, owner],
          newSignup: true,
        };
      },
      () => this.postOwner(owner)
    );
  };

  //Sign Up Feature: POSTING User to Database
  postOwner = (owner) => {
    fetch(ownersURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(owner),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  // Delete Pet Feature: instantly deletes pets, trying to set alert message
  deletePet = (pet) => {
    console.log(pet);
    const petsToKeep = this.state.currentUserPets.filter((i) => i.id != pet.id);
    this.setState(
      {
        currentUserPets: petsToKeep,
      },
      () => this.deletePetPost(pet)
    );
  };

  deletePetPost = (pet) => {
    console.log(pet);
    fetch(`http://localhost:3000/pets/${pet.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => console.log("deleted pet"));
  };

  editPetChange = (pet) => {
    console.log(pet);
    fetch(`http://localhost:3000/pets/${pet.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pet: { ...pet, owner_id: this.state.user.id },
      }),
    })
      .then((res) => res.json())
      .then((data) => (this.editPet(data), this.setCurrentPet(data)));
  };

  handleNoteSubmit = (note) => {
    fetch(notesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        note: note,
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setPetNotes(data));
  };

  handleEditNoteSubmit = (editNote) => {
    fetch(`http://localhost:3000/notes/${editNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        note: editNote,
      }),
    })
      .then((res) => res.json())
      .then((data) => this.editSetPets(data));
  };

  setPetNotes = (note) => {
    let userPets = this.state.currentUserPets;
    let currentPet = this.state.currentPet;
    let i = 0;
    userPets.forEach((pet) => {
      if (pet.id === currentPet.id) {
        let notes = userPets[i].notes;
        notes = [...notes, note];
        userPets[i].notes = notes;
        console.log(userPets[i]);
        this.setState({
          currentPetNotes: userPets,
        });
      }
      i++;
    });
  };

  editSetPets = (note) => {
    let currentPet = this.state.currentPet;
    let currentPetNotes = this.state.currentPet.notes;
    let newNoteInd;
    let newNotes;

    newNotes = currentPetNotes.filter((petNote) => {
      petNote.id === note.id
        ? (newNoteInd = currentPetNotes.indexOf(petNote))
        : null;
      return petNote.id !== note.id;
    });
    console.log(newNotes);
    newNotes.splice(newNoteInd, 0, note);
    currentPet.notes = newNotes;
    this.setState({
      currentPet: currentPet,
    });
  };

  setOwnerPetNotes = (ownerPetNotes) => {
    if (localStorage.getItem("ownerPetNotes")) {
      localStorage.removeItem("ownerPetNotes");
      localStorage.setItem("ownerPetNotes", ownerPetNotes);
      this.setState({ petNotes: ownerPetNotes });
    } else {
      localStorage.setItem("ownerPetNotes", ownerPetNotes);
      this.setState({ petNotes: ownerPetNotes });
    }
  };

  setCurrentPet = (currentPet) => {
    this.setState({
      currentPet: currentPet,
      currentPetNotes: currentPet.notes,
    });
  };

  setChosePetNoteId = (petId) => {
    if (this.state.user.name) {
      this.setState({
        ChosenPetNoteId: petId,
      });
    }
  };

  handleDeleteNoteOnClick = (ev) => {
    ev.preventDefault();
    this.deletNoteFromState(ev);
    fetch(`${notesURL}/${ev.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((deletedNote) => console.log(deletedNote))
      .catch((error) => {
        console.error("Error", error);
      });
    console.log("Note was deleted");
  };

  deletNoteFromState = (ev) => {
    let userPets = this.state.currentUserPets;
    let currentPet = this.state.currentPet;

    let i = 0;
    userPets.forEach((pet) => {
      if (pet.id === currentPet.id) {
        let notes = userPets[i].notes.filter((note) => {
          console.log(note);
          return note.id !== parseInt(ev.target.id);
        });
        userPets[i].notes = notes;
        this.setState({
          currentPetNotes: userPets,
        });
      }

      i++;
    });
  };

  editNoteOnClick = (editNote) => {
    this.setState({
      currentNote: editNote,
    });
  };

  randFunc = (data) => {
    console.log(data);
    return data;
  };

  logout = () => {
    this.setState({
      currentUserPets: [],
      isLoggedIn: false,
      user: [{}],
    });
  };

  petNotes = (newPetNotes) => {
    this.setState({ petNotes: [...this.state.petNotes, newPetNotes] });
  };

  //SUGGESTIONS
  // Global User object or Id
  // API calls that collect pets only
  // set up your components to account for the async pet loading, something in the meantime to load

  showPets = () => {
    return this.state.user.pets;
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar
            logout={this.logout}
            user={this.state.user}
            newSignUpState={this.state.newSignup}
          />

          <Route path="/" exact render={() => <HomepageLayout />} />

          <Route
            path="/login"
            exact
            render={() => (
              <LoginSignupContainer
                onLogInUser={this.onLogInUser}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />

          <Route
            path="/signup"
            exact
            render={() => (
              <SignupForm
                onAddUser={this.addUser}
                newSignUpState={this.state.newSignup}
                setUserLatLng={this.setUserLatLng}
              />
            )}
          />
          {this.state.user.name ? (
            <Route
              path="/profile"
              exact
              render={() => (
                <MyProfile
                  currentUserPets={this.state.currentUserPets}
                  currentPetNotes={this.state.currentPetNotes}
                  updatePets={this.updatePets}
                  user={this.state.user}
                  postPet={this.postPet}
                  freshPetsFunction={this.getFreshPets}
                  editPet={this.editPet}
                  deletePet={this.deletePet}
                  newSignup={this.state.newSignup}
                  notedPet={this.notedPet}
                  editPetChange={this.editPetChange}
                  setChosePetNoteId={this.setChosePetNoteId}
                  setCurrentPet={this.setCurrentPet}
                  petNotes={this.petNotes}
                />
              )}
            />
          ) : null}
          <Route
            path="/noteForm"
            exact
            render={() => (
              <NewNoteForm
                handleNoteSubmit={this.handleNoteSubmit}
                currentUserPets={this.state.currentUserPets}
                currentPet={this.state.currentPet}
              />
            )}
          />
          <Route
            path="/notes"
            exact
            render={() => (
              <NoteCard
                // petNotes={this.state.petNotes}
                currentUserPets={this.state.currentUserPets}
                ChosenPetNoteId={this.state.ChosenPetNoteId}
                deleteNoteFromAppState={this.deleteNoteFromAppState}
                handleDeleteNoteOnClick={this.handleDeleteNoteOnClick}
                user={this.state.user}
                currentPet={this.state.currentPet}
                currentPetNotes={this.state.currentPetNotes}
                editNoteOnClick={this.editNoteOnClick}
              />
            )}
          />
          <Route
            path="/editnoteform"
            exact
            render={() => (
              <EditNoteForm
                currentNote={this.state.currentNote}
                currentPet={this.state.currentPet}
                handleEditNoteSubmit={this.handleEditNoteSubmit}
              />
            )}
          />
          {this.state.user.name ? (
            <Route
              path="/about"
              exact
              render={() => <AboutComp userLatLng={this.state.userLatLng} />}
            />
          ) : null}
        </Router>
      </div>
    );
  }
}

export default App;
