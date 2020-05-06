import React, { Component } from "react";

// Import Search Bar Components
import { Search, Input } from "semantic-ui-react";

// Import React Scrit Libraray to load Google object
import Script from "react-load-script";

class SearchComp2 extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: "",
      query: ""
    };
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"]
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    console.log("hello");
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        ...this.state,
        city: address[0].long_name,
        query: addressObject.formatted_address
      });
    }
  };

  handleChange = e => {
    console.log(e.target.value);
    console.log(e.target);
    this.setState({ ...this.state, input: e.target.value });
  };

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyATO-qfqEDrcOxjP9v8kmDWAaJkfJratdY&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <input
          id="autocomplete"
          placeholder="Search Address"
          value={this.state.query}
          onChange={this.handleChange}
          // style={{
          //   margin: "0 auto",
          //   maxWidth: 800
          // }}
        />
      </div>
    );
  }
}

export default SearchComp2;
