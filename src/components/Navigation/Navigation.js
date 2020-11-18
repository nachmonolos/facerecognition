import React from "react";
import Button from "@material-ui/core/Button";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button id="logout-button" variant="contained">
        Logout
      </Button>
    </nav>
  );
};

export default Navigation;
