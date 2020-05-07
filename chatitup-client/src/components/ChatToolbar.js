import React from "react";
import People from "@material-ui/icons/People";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
const ChatToolbar = (props) => {
  const onIconClicked = () => props.viewDialog(); // notify the parent
  return (
    <AppBar position="static">
      <Toolbar color="primary" title="Chat it Up Toolbar">
        <Typography variant="h6" color="inherit">
          Chat it Up!
        </Typography>
        {props.showDialogButton && (
          <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
            <IconButton onClick={onIconClicked}>
              <People style={{ color: "white", height: 60, width: 60 }} />
            </IconButton>
          </section>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default ChatToolbar;
