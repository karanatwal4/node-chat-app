var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', function (message) {
    console.log('New message: ', message);
  });

  socket.emit('createMessage', {
    to: "karan",
    text: "Hey!"
  });
  
});


socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
