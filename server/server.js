const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('welcome', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newUser', generateMessage('Admin', 'new user joined'));

  socket.on('createMessage', (message) => {
    console.log('Create message: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from server');
  });
});

server.listen(port, () => {
  console.log('Server is up at port: '+port);
});
