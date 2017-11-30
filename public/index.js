
var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log('New message: ', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
   jQuery("#messages").append(html);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('geoLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current geolocation</a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);

  jQuery("#messages").append(html);
});

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery("[name=message]").val()
  }, function() {
    jQuery("[name=message]").val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    console.log('Your browser does not support geolocation');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('sendGeolocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
