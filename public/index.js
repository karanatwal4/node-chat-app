var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log('New message: ', message);
});

socket.on('welcome', function (message) {
  console.log('new message: ', message)
});

socket.on('newUser', function (message) {
  console.log('new message: ', message)
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
