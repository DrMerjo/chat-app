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
   //console.log('New email', message);
   //cattch the message sent from server
   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);
   // display message on browser
   jQuery('#messages').append(li)
});

socket.emit("createMessage", {
  from: 'Maga',
  text: 'Salam'
}, function (data) {
  console.log('Got it.', data)
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); // the default url won't change when entering the text

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
