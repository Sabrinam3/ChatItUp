//THE LINK TO MY HEROKU APP: https://sabrinatessier-chatitup.herokuapp.com/
require("dotenv").config();
const util = require("./util");
const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const moment = require("moment");
const port = process.env.PORT || 5000;
const adminColour = process.env.ADMINCOLOUR || "#ff9b16";
let server = http.createServer(app);
let io = socketIO(server);

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable("trust proxy");
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use((req, res, next) => {
  req.secure
    ? // request was via https, so do no special handling
      next()
    : // request was via http, so redirect to https
      res.redirect("https://" + req.headers.host + req.url);
});

app.use(express.static("public"));
// main socket routine
io.on("connection", (socket) => {
  console.log("new connection established");
  socket.on("load", () => {
    //Send the active rooms to the client
    socket.emit("sendrooms", { payload: util.getActiveRooms() });
  });
  // Client has joined
  socket.on("join", (client) => {
    const room = client.roomName;
    //use the room property to create a room
    socket.join(room);
    //Check if the client's requested name exists in this room
    if (util.checkUserNameExists(client.chatName, client.roomName)) {
      //Send a nameexists message to the client to let them know they cannot join with that name and suggest they choose another
      socket.emit("nameexists", {
        text: `The name ${client.chatName} is already in use. Try another`,
      });
    } else {
      socket.name = client.chatName;
      console.log(`${socket.name} has joined ${client.roomName}`);

      //Send welcome message to client from generic Admin account containing admin colour
      socket.emit("welcome", {
        text: `Welcome ${socket.name}`,
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        room: room,
        colour: adminColour,
        currentUser: false,
      });

      // send message to rest of the room the client just joined
      socket.to(client.roomName).emit("someonejoined", {
        text: `${socket.name} has joined the ${client.roomName} room`,
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        room: room,
        colour: adminColour,
        currentUser: false,
      });
    }
  });

  //Client disconnected
  socket.on("disconnect", async () => {
    let room = util.getRoom(socket.name);
    socket.to(room).emit("someoneleft", {
      text: `${socket.name} has left room ${room}`,
      from: "Admin",
      time: moment().format("h:mm:ss a"),
      room: room,
      colour: adminColour,
      currentUser: false,
    });
    //Remove the user
    util.removeUser(socket.name);
  });

  // Client starts typing
  socket.on("typing", async (clientData) => {
    let room = util.getRoom(socket.name);
    socket.to(room).emit("someoneistyping", {
      text: `${clientData.from} is typing`,
    });
  });

  //New message
  socket.on("message", async (clientData) => {
    let room = util.getRoom(socket.name);
    //broadcast message to the user who sent it
    socket.emit("newmessage", {
      text: clientData.text,
      from: clientData.from,
      time: moment().format("h:mm:ss a"),
      room: room,
      colour: util.getColour(clientData.from),
      currentUser: true,
    });
    //broadcast message to everyone else
    socket.to(room).emit("newmessage", {
      text: clientData.text,
      from: clientData.from,
      time: moment().format("h:mm:ss a"),
      room: room,
      colour: util.getColour(clientData.from),
      currentUser: false,
    });
  });
  //Request to fetch users in room
  socket.on("getusers", async (clientData) => {
    let users = util.getUsersInRoom(clientData.roomName);
    socket.emit("usersinroom", {
      payload: users,
    });
  });
});
// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
}); // error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
server.listen(port, () => console.log(`starting on port ${port}`));
