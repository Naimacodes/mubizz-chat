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

//sockets
app.set('socketio', io)

io.on('connect', socket => {
  socket.emit('id', socket.id) // send each client their socket id
})