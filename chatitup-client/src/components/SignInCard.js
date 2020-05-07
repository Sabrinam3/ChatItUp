import React, { useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import logo from "../assets/speak.png";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import theme from "../theme";
import "../App.css";

const SignInCard = ({
  activeRooms,
  handleJoin,
  handleChatStatusChange,
  chatNameStatus,
}) => {
  const initialState = {
    chatName: "",
    chatNameStatus: "enter a chat name",
    roomName: "",
    roomNameStatus: "enter a room name",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  // handler for TextField entry
  const onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //If the field is empty, set the status
    switch (name) {
      case "chatName":
        handleChatStatusChange(value === "" ? "enter a chat name" : "");
        break;
      case "roomName":
        setState({
          roomNameStatus: value === "" ? "enter a room name" : "",
        });
        break;
      default:
        break;
    }
    setState({ [name]: value });
  };

  //handler for radio button change
  const onRadioRoomChange = (e, selectedOption) => {
    setState({
      roomNameStatus: "",
    });
    setState({
      roomName: selectedOption,
    });
  };
  //Controls whether the join button is enabled
  const formValid = state.chatName !== "" && state.roomName !== "";

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ marginTop: "2%" }}>
        <img src={logo} alt="chat logo" className="center" />
        <Typography color="secondary" className="titleHead">
          Sign In
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <TextField
              name="chatName"
              onChange={onInputChange}
              placeholder="Chat Name"
              autoFocus={true}
              required
              value={state.chatName}
              error={chatNameStatus !== ""}
              helperText={chatNameStatus}
            />
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography color="secondary" className="subHead">
              Join Existing or Enter Room Name
            </Typography>
            <RadioGroup
              aria-label="Select an existing room to join"
              name="room names"
              value={state.selectedRoom}
              onChange={onRadioRoomChange}
            >
              {activeRooms.map((room, index) => (
                <FormControlLabel
                  value={room}
                  key={index}
                  control={<Radio color="secondary" />}
                  label={room}
                />
              ))}
            </RadioGroup>
            <TextField
              name="roomName"
              onChange={onInputChange}
              placeholder="Room Name"
              autoFocus={false}
              required
              value={state.roomName}
              error={state.roomNameStatus !== ""}
              helperText={state.roomNameStatus}
            />
          </CardContent>
        </Card>
        <Button
          disabled={!formValid}
          style={{ margin: 15, border: "solid" }}
          onClick={() => handleJoin(state.chatName, state.roomName)}
        >
          Join
        </Button>
      </div>
    </MuiThemeProvider>
  );
};
export default SignInCard;
