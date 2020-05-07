import React from "react";
const Triangle = ({ message }) => {
  let alignTriangle = message.currentUser ? "80%" : "12%";
  return (
    <div
      style={{
        content: "" /* triangle */,
        position: "absolute",
        bottom: "-15px" /* value = - border-top-width - border-bottom-width */,
        left: alignTriangle /* controls horizontal position */,
        borderWidth:
          "15px 15px 0" /* vary these values to change the angle of the vertex */,
        borderStyle: "solid",
        borderColor: `${message.colour} transparent`
      }}
    />
  );
};
export default Triangle;
