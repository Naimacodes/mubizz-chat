const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users.js');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    /////////this one right here emits to the front end ADMIN generated messages
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined the conversation`
    });

    callback();
  });

  /////////we are expecting user generated messages
  socket.on('sendMessage', message => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', () => {
    console.log('user has left');
  });
});

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
