import React from "react";
import Button from "@material-ui/core/Button";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        id="signout-button"
        variant="contained"
        onClick={() => onRouteChange("signout")}
      >
        SIGN OUT
      </Button>
    </nav>
  ) : (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        id="signin-button"
        variant="contained"
        onClick={() => onRouteChange("signin")}
      >
        SIGN IN
      </Button>
      <Button
        id="signup-button"
        variant="contained"
        onClick={() => onRouteChange("signup")}
      >
        SIGN UP
      </Button>
    </nav>
  );
};

export default Navigation;
