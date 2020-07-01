import React from "react";
import "./App.css";
import HomepageLayout from "./HomepageLayout";
import NavBar from "./NavBar";
import LoginSignupContainer from "./LoginSignupContainer";
import MyProfile from "./MyProfile";
import SignupForm from "./SignupForm";
import AboutComp from "./AboutComp";
import PetsContainer from "./PetsContainer";
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
      currentUserPet: null, //the pets that belong to the current user

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
      .then((owners) => this.setState({ owners: owners }));
  };

  getFreshPets = () => {
    //refresh the currentUserPets array
    fetch(petsURL)
      .then((res) => res.json())
      .then((pets) => this.filterFreshPets(pets));
  };

  filterFreshPets = (pets) => {
    console.log(pets);
    if (pets.length > 1) {
      let filteredPets = pets.filter((pet) => {
        return pet.owner.id == this.state.user.id;
      });
      console.log("LOGGING FILTERED PETS:", filteredPets);
      this.setState({ currentUserPets: filteredPets });
    } else if (pets.length <= 1) {
      console.log(this.state.currentUserPets);
      let filteredPet = [];
      let newCurrentPets = () => {
        filteredPet.push(pets);
        return filteredPet;
      };
      this.setState({
        currentUserPets: newCurrentPets(),
      });
      console.log("current pets set");
    }
  };

  editPetChange = (pets) => {
    console.log(this.state.currentUserPets);
    let filteredPet = this.state.currentUserPets.filter((pet) => {
      return pet.id != pets.id;
    });
    let newCurrentPets = () => {
      filteredPet.push(pets);
      return filteredPet;
    };
    this.setState({
      currentUserPets: newCurrentPets(),
    });
    console.log("current pets set");
  };

  // form for add pets: onsubmit -> post new pet to database
  // at the end of the .then, take the JSON data (newpet) call a function to:
  // query the database for the pet (getfreshpets) that match the user id (from props.user), send those to PetContainer
  // in petContainer -> filter over freshpets and create a PetCard for each

  // updatePets = (pet) => {
  //   console.log("working")
  //   let newPetsArray = this.state.pets.push(pet)
  //   this.setState({
  //     pets: newPetsArray
  //   })
  // }

  // Login Feature, save state as user
  onLogInUser = (username) => {
    console.log("WE TRIED");
    // console.log(username)
    // this.getAllOwners()
    let ownersfiltered = this.state.owners.filter(
      (owner) => owner.name == username
    );
    console.log(ownersfiltered);
    console.log(this.state.owners);
    if (ownersfiltered.length === 1) {
      console.log("OWNER FOUND", ownersfiltered[0]);
      this.setState({
        isLoggedIn: true,
        user: ownersfiltered[0],
        currentUserPets: ownersfiltered[0].pets,
        newSignup: false,
      });
      console.log(ownersfiltered);
      // this.setLocalStorage(ownersfiltered[0])
      this.getFreshPets();
    } else {
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
    const petsToKeep = this.state.currentUserPets.filter((i) => i.id != pet.id);
    console.log("CONSOLE LOGGING DELETE FUNCTION:", petsToKeep);

    this.setState(
      {
        currentUserPets: petsToKeep,
      },
      () => this.deletePetPost(pet)
    );

    console.log(pet);
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

  editPet = (pet) => {
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
      .then((pet) => (console.log("tryin"), this.filterFreshPets(pet)));
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
      .then((data) => console.log("hello"));
    // console.log(data.pet.notes);
    //   let newPetNotes = () => {
    //     if (this.state.petNotes) {
    //       let petNotes = data.pet.notes;
    //       petNotes.push(data);
    //       return petNotes;
    //     } else {
    //       let petNotes = data.pet.notes;
    //       petNotes.push(data);
    //       return petNotes;
    //     }
    //   };
    //   return (
    //     this.setState({
    //       ...this.state,
    //       petNotes: newPetNotes()
    //     }),
    //     this.randFunc(data)
    //   );
    // });
  };

  randFunc = (data) => {
    console.log(data);
    return data;
  };
  // notedPet = pet => {
  //   this.setState({ ...this.state, notedPet: pet });
  // };

  logout = () => {
    this.setState({
      currentUserPets: [],
      isLoggedIn: false,
      user: [{}],
      // pets: [{}]
    });
  };
  // method: "DELETE",
  // headers: {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json"
  // },
  // body: JSON.stringify({
  //   currentUserPets: {...currentUserPets, id: this.props.pet.id}
  // // })
  // this.state.currentUserPets[0]
  // renderOwnersProfile = (firstName) => {
  //   console.log(firstName)
  //   fetch(ownersURL)
  //   .then(res => res.json())
  //   .then(owners => console.log(owners))
  // }

  // handleOnLogIn = () => {
  //   console.log("ello mate")
  // }

  //SUGGESTIONS
  // Global User object or Id
  // API calls that collect pets only
  // set up your components to account for the async pet loading, something in the meantime to load

  showPets = () => {
    return this.state.user.pets;
  };

  render() {
    // debugger;
    return (
      <div>
        {/* {console.log(this.localUser().pets)} */}
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
                  updatePets={this.updatePets}
                  user={this.state.user}
                  postPet={this.postPet}
                  freshPetsFunction={this.getFreshPets}
                  editPet={this.editPet}
                  deletePet={this.deletePet}
                  newSignup={this.state.newSignup}
                  notedPet={this.notedPet}
                  editPetChange={this.editPetChange}
                />
              )}
            />
          ) : null}
          <Route
            path="/notes"
            exact
            render={() => (
              <NoteContainer
                handleNoteSubmit={this.handleNoteSubmit}
                currentUserPets={this.state.currentUserPets}
                petNotes={this.state.petNotes}
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
