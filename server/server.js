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


server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);


app.locals.io = io