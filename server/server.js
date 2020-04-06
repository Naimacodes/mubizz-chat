const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const Message = require('./models/Message');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);
app.use(cors);
connectDB();

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    /////////this one right here emits to the front end ADMIN generated messages
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined the conversation.`,
    });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  /////////we are expecting user generated messages
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // //Someone is typing
  // socket.on('typing', (data) => {
  //   const user = getUser(socket.id);
  //   socket.broadcast.emit('notifyTyping', {
  //     user: user.name,
  //     message: data.message,
  //   });
  // });

  // //when someone stops typing
  // socket.on('stopTyping', () => {
  //   socket.broadcast.emit('notifyStopTyping');
  // });

  

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left`,
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
