import React from "react";
import { List } from "@material-ui/core";
import ChatBubble from "./ChatBubble";

const MessageListCard = props => {
  let messages = props.messages.map((message, idx) => {
    return <ChatBubble key={idx} message={message} />;
  });
  return <List>{messages}</List>;
};
export default MessageListCard;
