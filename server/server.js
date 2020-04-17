const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

connectDB();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conversations', require('./routes/conversations'));
<<<<<<< HEAD
=======

// io.on('connection', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });
//     if (error) return callback(error);

//     socket.join(user.room);

//     /////////this one right here emits to the front end ADMIN generated messages
//     socket.emit('message', {
//       user: 'admin',
//       text: `${user.name}, welcome to room ${user.room}.`,
//     });
//     socket.broadcast.to(user.room).emit('message', {
//       user: 'admin',
//       text: `${user.name} has joined the conversation.`,
//     });

//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });

//     callback();
//   });

//   /////////we are expecting user generated messages
//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });
//     io.to(user.room).emit('roomData', {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);
//     if (user) {
//       io.to(user.room).emit('message', {
//         user: 'Admin',
//         text: `${user.name} has left`,
//       });
//     }
//   });
// });

>>>>>>> refs/remotes/origin/master


server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);


app.locals.io = io