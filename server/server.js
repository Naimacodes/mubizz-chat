const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit('message', {
      user: 'Admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });
    socket.broadcast.to(user.room).emit('message', {user: 'Admin', text:`${user.name} has joined the conversation.`})
    socket.join(user.room);

    callback();
  });

  socket.on('disconnect', () => {
    console.log('user has left');
  });
});

app.use(router);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
