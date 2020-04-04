import React, { useEffect, useState } from 'react';
import Qs from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../Infobar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  //one message
  const [message, setMessage] = useState('');
  //every messages
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  // const endpoint = 'https://mubizz-chat-app.herokuapp.com/';
  const endpoint = 'http://localhost:5000/';

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
        socket.disconnect();
      };
    });
  }, [endpoint, location.search]);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});





  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////USE EFFECT FOR MESSAGES//////////////////////////////////////

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} name={name} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
