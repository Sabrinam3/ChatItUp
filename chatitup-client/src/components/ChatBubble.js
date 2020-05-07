import React, { useEffect, useRef } from "react";
import { ListItem } from "@material-ui/core";
import Bubble from "./Bubble";
import Triangle from "./Triangle";
const ChatBubble = ({ message }) => {
  const messageRef = useRef(null);
  useEffect(() => {
    messageRef.current.scrollIntoView(true);
  }, []);
  return (
    <div>
      <ListItem
        ref={messageRef}
        style={{ textAlign: "left", marginBottom: "5px" }}
      >
        <Bubble message={message} />
        <Triangle message={message} />
      </ListItem>
      <p></p>
    </div>
  );
};
export default ChatBubble;
