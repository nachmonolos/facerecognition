import React from "react";
import "./ImageLinkForm.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
});

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <p className="f3 white center">{"Face Detection"}</p>
      <div className="center">
        <div
          className="form pa4 br3 shadow-5 center"
          style={{ alignItems: "center" }}
        >
          <TextField
            id="image-url"
            variant="outlined"
            placeholder="Image URL"
            className={classes.root}
            onChange={onInputChange}
            fullWidth
          />
          <Button
            id="submit"
            variant="contained"
            size="large"
            endIcon={<AspectRatioIcon />}
            onClick={onButtonSubmit}
          >
            Detect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
