const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

connectDB();

app.use(bodyParser.json());

//my routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conversations', require('./routes/conversations'));

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

let users = {};
//sockets section
/////////////////////////////////////////////////////

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', ({ username, userID }) => {
    console.log(username + ' with ID number ' + userID + ' is connected');
    users[socket.id] = userID;
    // // console.log(users[socket.id] );
    // const data = { users };
    console.log(users[socket.id]);

    socket.emit('online', users);
  });

  socket.on('logout', ({ username, userID }) => {
    console.log(username + ' has logged out');
    delete users[socket.id];
  });

  socket.on('disconnect', ({ username, userID }) => {
    console.log(username + ' with ID number ' + userID + ' is gone');
    delete users[socket.id];
  });
});
