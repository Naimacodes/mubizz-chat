const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

connectDB();

app.use(bodyParser.json());

// CORS middleware
app.use(cors());

let users = {};

//sockets section
/////////////////////////////////////////////////////

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', ({ username, userID }) => {
    console.log(username + ' with ID number ' + userID + ' is connected');
    users[socket.id] = username;
    console.log(users[socket.id]);

    socket.emit('online', [users]);
  });

  socket.on('logout', ({ username, userID }) => {
    console.log(username + ' with ID number ' + userID + ' has logged out');
    delete users[socket.id];
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
    delete users[socket.id];
  });
});

//my routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conversations', require('./routes/conversations'));

app.use('/uploads', express.static('uploads'));

// Serves static assets (react) in production

if (process.env.NODE_ENV === 'production') {
  //set static folder

  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
