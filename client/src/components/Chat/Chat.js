import React, { useEffect, useState } from 'react';
import Qs from 'query-string';
import io from 'socket.io-client';
import './Chat.css';


let socket;
const Chat = ({ location }) => {
  const [username, setName] = useState('');
  const [room, setRoom] = useState('');
  //one message
  const [message, setMessage] = useState('');
  //every messages
  const [messages, setMessages] = useState([]);

  const endpoint = 'localhost:5000';

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////USE EFFECT FOR JOINING AND GETTING NAME AND ROOM////////////////////////
  
  useEffect(() => {
    const { name, room } = Qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    setName(name);
    setRoom(room);
    socket = io(endpoint);

    socket.emit('join', { name, room }, () => {
      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    });
  }, [endpoint, location.search]);

  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////USE EFFECT FOR MESSAGES//////////////////////////////////////
  
  
  useEffect(() => {
    socket.on('message', message => {
      //sending all the messages to our messages array
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', {message}, () => {
        setMessage('')
      
      })
    }
  };


 

  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
