import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import io from "socket.io-client";
import theme from "./theme.js";
import "./App.css";

import ChatToolbar from "./components/ChatToolbar";
import SignInCard from "./components/SignInCard";
import MessageListCard from "./components/MessageListCard";
import UserListDialog from "./components/UserListDialog";

import { TextField, Typography } from "@material-ui/core";

const App = () => {
  useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialState = {
    viewUsersDialog: false,
    usersInRoom: [],
    chatName: "",
    roomName: "",
    signedIn: false,
    activeRooms: [],
    chatNameStatus: "enter a chat name",
    messages: [],
    message: "",
    isTyping: false,
    typingMessage: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const serverConnect = () => {
    // connect to server
    const socket = io.connect("localhost:5000", { forceNew: true });
    //connect to server on Heroku cloud
    //const socket = io.connect();
    //emit load message so that the server sends the currently active rooms
    socket.emit("load", {});
    socket.on("sendrooms", onGetRooms);
    socket.on("usersinroom", onGetUsers);
    socket.on("nameexists", onExists);
    socket.on("welcome", onWelcome);
    socket.on("someonejoined", addMessage);
    socket.on("someoneleft", addMessage);
    socket.on("someoneistyping", onTyping);
    socket.on("newmessage", onNewMessage);
    setState({ socket: socket });
  };

  const handleDialogOpen = () => {
    state.socket.emit("getusers", {
      roomName: state.roomName,
    });
    setState({
      viewUsersDialog: true,
    });
  };

  const handleDialogClose = () => {
    setState({
      viewUsersDialog: false,
    });
  };

  const handleChatStatusChange = (chatStatus) => {
    setState({
      chatNameStatus: chatStatus,
    });
  };
  //Intercepts the active rooms from the server and stores them in state
  const onGetRooms = (dataFromServer) => {
    setState({
      activeRooms: dataFromServer.payload,
    });
  };

  const onGetUsers = (dataFromServer) => {
    setState({
      usersInRoom: dataFromServer.payload,
    });
  };

  const handleJoin = (name, room) => {
    state.socket.emit("join", {
      chatName: name,
      roomName: room,
    });
    setState({
      chatName: name,
      roomName: room,
    });
  };

  const onExists = (dataFromServer) => {
    setState({ chatNameStatus: dataFromServer.text });
  };

  const onWelcome = (dataFromServer) => {
    //set login status
    setState({
      signedIn: true,
    });
    console.log("welcome called");
    addMessage(dataFromServer);
  };

  const onNewMessage = (dataFromServer) => {
    addMessage(dataFromServer);
    setState({
      isTyping: false,
      message: "",
      typingMessage: "",
    });
  };
  // keypress handler for message TextField
  const onMessageChange = (e) => {
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.chatName }, (err) => {});
    }
    setState({ message: e.target.value, isTyping: true });
  };
  // enter key handler to send message
  const handleSendMessage = () => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: state.chatName, text: state.message },
        (err) => {}
      );
    }
  };

  const onTyping = (dataFromServer) => {
    setState({
      typingMessage: dataFromServer.text,
      isTyping: true,
    });
  };

  // generic handler for all messages:
  const addMessage = (dataFromServer) => {
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({ messages: messages });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div className="container">
        <ChatToolbar
          viewDialog={handleDialogOpen}
          showDialogButton={state.signedIn}
        />

        {!state.signedIn && (
          <SignInCard
            activeRooms={state.activeRooms}
            handleJoin={handleJoin}
            handleChatStatusChange={handleChatStatusChange}
            chatNameStatus={state.chatNameStatus}
          />
        )}
        {state.signedIn && (
          <div>
            <div className="messagesList">
              <MessageListCard messages={state.messages} />
            </div>
            <div style={{ position: "absolute", bottom: 25 }}>
              <TextField
                style={{ minWidth: 300 }}
                onChange={onMessageChange}
                placeholder="type something here"
                autoFocus={true}
                value={state.message}
                onKeyPress={(e) =>
                  e.key === "Enter" ? handleSendMessage() : null
                }
              />
            </div>
            <div style={{ position: "absolute", bottom: 2 }}>
              {state.isTyping && (
                <Typography color="primary">{state.typingMessage}</Typography>
              )}
            </div>
          </div>
        )}
        <UserListDialog
          usersInRoom={state.usersInRoom}
          show={state.viewUsersDialog}
          handleDialogClose={handleDialogClose}
          room={state.roomName}
        />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
