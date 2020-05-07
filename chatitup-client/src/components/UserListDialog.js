import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import Close from "@material-ui/icons/Close";
import "../App.css";
const UserListDialog = ({ usersInRoom, show, handleDialogClose, room }) => {
  return (
    <Dialog fullWidth={true} style={{ margin: 20 }} open={show}>
      <IconButton onClick={handleDialogClose}>
        <Close className="closeButton" />
      </IconButton>
      <DialogTitle style={{ textAlign: "center" }}>Who's on?</DialogTitle>
      <DialogContent>
        {usersInRoom.map((user, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 5 }}>
            <AccountBox
              style={{
                color: user.colour,
                height: 20,
                width: 20,
                marginLeft: 10,
                marginRight: 25,
                marginTop: 2
              }}
            />

            <Typography color="primary">{`${user.name} is in room ${room}`}</Typography>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default UserListDialog;
