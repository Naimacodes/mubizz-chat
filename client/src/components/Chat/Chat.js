import React, { useEffect, useState } from 'react';
import Qs from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

const Chat = ({ location }) => {
  const [username, setName] = useState('');
  const [room, setRoom] = useState('');
  const endpoint = 'localhost:5000';

  let socket;
  useEffect(() => {
    const { name, room } = Qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    setName(name);
    setRoom(room);
    console.log(name, room);
    socket = io(endpoint);

    socket.emit('join', { name, room }, () => {
      
      return () => {
        socket.emit('disconnect');
        socket.off()      }
    });
  }, [endpoint, location.search]);

  return <div>Chat</div>;
};

export default Chat;
