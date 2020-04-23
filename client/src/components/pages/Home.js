import React, { useContext, useState, useEffect } from 'react';
import ChatContext from '../../context/chat/chatContext';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';
import Messages from '../Sidepanel/Messages';
import Conversations from '../Sidepanel/Conversations';
import SearchConversation from '../Sidepanel/SearchConversation';

const Home = () => {
  const socket = io('http://localhost:5000/');
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const chatContext = useContext(ChatContext);
  const { getConversations, current, addMessage } = chatContext;


  // On mount, get user data from server.
  useEffect((current) => {
    getConversations();

    return () => socket.disconnect();
  }, [getConversations]);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const handleNewMessage = async (data, addMessage) => {
    // Conversation id and message.

    const { _id, message } = data;

    if (current && _id === current._id && message) {
      await addMessage(_id, message);
    }
  };

  // On incoming message, add message to client state.
  socket.on('message', (data) => {
    handleNewMessage(data, addMessage);
  });

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <SearchConversation user={user} />

          <Conversations user={user}></Conversations>
        </div>

        <Messages user={user}></Messages>
      </div>
    </div>
  );
};

export default Home;
