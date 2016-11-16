const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
// browser ports: server or local
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//going to public folder
app.use(express.static(publicPath));

// doing something on server side by user when connecting to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  // doing something on client side by user when disconnecting to the server
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// to launch the localhost:3000
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
