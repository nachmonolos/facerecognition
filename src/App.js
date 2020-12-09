import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Register/SignUp";

const app = new Clarifai.App({
  apiKey: "0c9557c8bb49414f855f8c6eac68fdd0",
});

const particlesOptions = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      input: "",
      imageURL: "",
      show: true,
      boxes: [],
      route: "signout",
      isSignedIn: false,
    };
  }

  onRouteChange = (route) => {
    this.setState({ route: route });

    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    console.log(this.state.isSignedIn);
  };

  handleKeypress = (event) => {
    console.log(event.key);
    //it triggers by pressing the enter key
    event.key === "Enter" && this.onButtonSubmit();
  };

  faceLocationArray = (data) => {
    const locationArray = data.outputs[0].data.regions;
    return locationArray;
  };

  faceBoxes = (boxes) => {
    const boxLocations = boxes.map((face, i) => {
      const clarifaiFace = boxes[i].region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    this.setState({ boxes: boxLocations });
    console.log(boxLocations);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ loading: true, show: false });
    app.models
      .predict("d02b4508df58432fbb84e800597b8959", this.state.input)
      .then((response) => {
        // There was a successful response
        this.faceBoxes(this.faceLocationArray(response));
        this.setState({ loading: false, show: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, show: true });
      })
      .finally(this.setState({ imageURL: this.state.input }));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              loading={this.state.loading}
              handleKeypress={this.handleKeypress}
            />

            <FaceRecognition
              show={this.state.show}
              display={this.state.display}
              imageURL={this.state.imageURL}
              boxes={this.state.boxes}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <SignUp onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
