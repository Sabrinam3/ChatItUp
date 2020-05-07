import React from "react";
import "../App.css";
const Bubble = ({ message }) => {
  return (
    <div
      className={message.currentUser ? "chatBubbleUser" : "chatBubbleOther"}
      style={{ backgroundColor: message.colour }}
    >
      <span style={{ fontSize: "smaller" }}>{`${message.from} says:`}</span>
      <span className="bubbleMessage">{`room:${message.room}`}</span>
      <br />
      <span className="bubbleMessage">{`@:${message.time}`}</span>
      <br />
      <br />
      <span style={{ fontSize: "medium", fontWeight: "bold" }}>
        {message.text}
      </span>
      <br />
    </div>
  );
};
export default Bubble;
