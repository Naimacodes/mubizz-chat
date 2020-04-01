import React, { useEffect, useState } from 'react';
import Qs from 'query-string';
import io from 'socket.io-client';

const Chat = ({ location }) => {
  const [username, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    const { name, room } = Qs.parse(location.search);
    setName(namez);
    setRoom(room);
  });

  return <div>Chat</div>;
};

export default Chat;
