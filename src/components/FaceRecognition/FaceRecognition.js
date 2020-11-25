import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
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
          );
        })}
        {/* <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default FaceRecognition;
