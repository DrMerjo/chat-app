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
  //formatted time
  var formattedTime = moment(message.createdAt).format('hh:mm a');

   //cattch the message sent from server
   var li = jQuery('<li></li>');
   li.text(`${message.from} ${formattedTime}: ${message.text}`);
   // display message on browser
   jQuery('#messages').append(li)
});

socket.on('newLocationMessage', function(message) {
  //formatted time
  var formattedTime = moment(message.createdAt).format('hh:mm a');

  var li = jQuery('<li></li>');
  //_blank will create a link that will oepn a new window for
  var a = jQuery('<a target="_blank"> My current location </a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


// sending user messages
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); // the default url won't change when entering the text

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});


// send user location
var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  //disable button
  locationButton.attr('disabled', 'disabled true').text('Sending location...');

  navigator.geolocation.getCurrentPosition( function (position) {
    locationButton.removeAttr('disabled true').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    console.log(position);
  }, function () {
    locationButton.removeAttr('disabled true').text('Send location');
    alert('Unable to fetch location');
  });
});
