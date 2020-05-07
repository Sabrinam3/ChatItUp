require("dotenv").config();
let colours = [
  "#ef9a9a",
  "#e57373",
  "#ef5350",
  "#f44336",
  "#e53935",
  "#d32f2f",
  "#c62828",
  "#b71c1c",
  "#ff8a80",
  "#ff5252",
  "#ff1744",
  "#d50000",
  "#f48fb1",
  "#f06292",
  "#ec407a",
  "#e91e63",
  "#d81b60",
  "#c2185b",
  "#ad1457",
  "#880e4f",
  "#ff80ab",
  "#ff4081",
  "#f50057",
  "#c51162",
  "#ce93d8",
  "#ba68c8",
  "#ab47bc",
  "#9c27b0",
  "#8e24aa",
  "#7b1fa2",
  "#6a1b9a",
  "#4a148c",
  "#ea80fc",
  "#e040fb",
  "#d500f9",
  "#aa00ff",
  "#9575cd",
  "#7e57c2",
  "#673ab7",
  "#5e35b1",
  "#512da8",
  "#4527a0",
  "#311b92",
  "#7c4dff",
  "#651fff",
  "#6200ea",
  "#7986cb",
  "#5c6bc0",
  "#3f51b5",
  "#3949ab",
  "#303f9f",
  "#283593",
  "#1a237e",
  "#536dfe",
  "#3d5afe",
  "#304ffe",
  "#42a5f5",
  "#2196f3",
  "#1e88e5",
  "#1976d2",
  "#1565c0",
  "#0d47a1",
  "#448aff",
  "#2979ff",
  "#2962ff",
  "#4fc3f7",
  "#29b6f6",
  "#03a9f4",
  "#039be5",
  "#0288d1",
  "#0277bd",
  "#01579b",
  "#00b0ff",
  "#0091ea",
  "#26c6da",
  "#00bcd4",
  "#00acc1",
  "#0097a7",
  "#00838f",
  "#006064",
  "#4db6ac",
  "#26a69a",
  "#009688",
  "#00897b",
  "#00796b",
  "#00695c",
  "#004d40",
  "#4caf50",
  "#43a047",
  "#388e3c",
  "#2e7d32",
  "#1b5e20",
  "#7cb342",
  "#689f38",
  "#558b2f",
  "#33691e",
  "#ff8f00",
  "#ff6f00"
];
//Array to hold the users and what room they are in
let users = [];
//Array to keep track of active rooms - with default room 'main'
let rooms = [];

const getActiveRooms = () => {
  //add default room
  if (!rooms.includes("main")) {
    rooms.push("main");
  }
  return rooms;
};

const checkUserNameExists = (userName, roomName) => {
  let userExists = false;
  users.map(user => {
    if (user.name === userName && user.room === roomName) userExists = true;
  });
  //The name can be used so add this user to array and set room
  if (!userExists) {
    //get a colour for the user
    let coloursInUse = users.map(user => user.colour);
    let userColour = "";
    do {
      userColour = getRandomColour();
    } while (coloursInUse.includes(userColour));
    users.push({ name: userName, room: roomName, colour: userColour });
    //Add the room to the array of rooms if it doesn't exist
    if (!rooms.includes(roomName)) {
      rooms.push(roomName);
    }
  }
  return userExists;
};

//Checks what room the client is in and returns the name
const getRoom = userName => {
  let userRoom = "";
  users.map(user => {
    if (user.name === userName) userRoom = user.room;
  });
  return userRoom;
};

//Gets users currently in room
const getUsersInRoom = roomName => {
  return users.filter(user => user.room === roomName);
};

//Gets the colour assigned to a user
const getColour = userName => {
  let userColour = "";
  users.map(user => {
    if (user.name === userName) userColour = user.colour;
  });
  return userColour;
};

//Removes a user from users array
const removeUser = userName => {
  users = users.filter(function(user) {
    return user.name !== userName;
  });
};

//Gets a random colour from the json file
const getRandomColour = () => {
  const matColours = require("./colours.json");
  let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  return matColours.colours[coloridx];
};

module.exports = {
  getActiveRooms,
  checkUserNameExists,
  getRoom,
  getUsersInRoom,
  removeUser,
  getColour
};
