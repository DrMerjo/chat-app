const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message.js');
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

  // greeting the new user when joing the chat
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));


  // New user joinded chat app message
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // receiving data from user to server
  socket.on('createMessage', (message, callback) => {
    console.log('Message: ', message);

    // sending message to all chat participants, including the sender
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback();
  });


  //receiving geolocation from browser to server
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
  });

  // // sending message to all chat participants, except the sender
  // oi.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });

  // doing something on client side by user when disconnecting to the server
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});




// to launch the localhost:3000
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
