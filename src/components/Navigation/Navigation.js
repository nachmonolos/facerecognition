import React from "react";
import Button from "@material-ui/core/Button";
import "./Navigation.css";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        id="logout-button"
        variant="contained"
        onClick={() => onRouteChange("signin")}
      >
        SIGN OUT
      </Button>
    </nav>
  );
};

export default Navigation;
