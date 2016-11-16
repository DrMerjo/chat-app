var socket = io()

// doing something on client side by user when connecting to the server
socket.on('connect', function () {
  console.log('Connected to server')

  // //emiting and sending data to the server
  // socket.emit('newMessage', {
  //   from: 'Maga',
  //   text: 'Assalamu Alaikum'
  // });

});

// doing something on client side by user when disconnecting to the server
socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

// catching data from the server of event 'newMessage'
socket.on('newMessage', function (message) {
   console.log('New email', message);
});
