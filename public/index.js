
var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log('New message: ', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery("#messages").append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery("[name=message]").val()
  }, function() {

  })
})
