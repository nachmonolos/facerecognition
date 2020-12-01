import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes, show }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          alt=""
          id="inputimage"
          src={imageURL}
          width="500px"
          height="auto"
          style={{ borderRadius: "10px" }}
        />

        {boxes.map((box, i) => {
          return (
            show && (
              <div
                key={i}
                className="bounding-box"
                style={{
                  top: boxes[i].topRow,
                  right: boxes[i].rightCol,
                  bottom: boxes[i].bottomRow,
                  left: boxes[i].leftCol,
                }}
              ></div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
