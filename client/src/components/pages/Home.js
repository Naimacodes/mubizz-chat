import React, { useContext, useState, useEffect } from 'react';
import ChatContext from '../../context/chat/chatContext';
import socket from '../../socketConfig';
import AuthContext from '../../context/auth/authContext';
import Messages from '../Sidepanel/Messages';
import Conversations from '../Sidepanel/Conversations';
import SearchConversation from '../Sidepanel/SearchConversation';

const Home = ({}) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const chatContext = useContext(ChatContext);
  const {
    getConversations,
    conversations,
    conversation,
    addMessage,
  } = chatContext;

  const [usersID, setUsersID] = useState({});

  useEffect(() => {
    getConversations();
  }, [getConversations, conversations]);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  // socket for user connecting to the app

  useEffect(() => {
    if (user && user !== null && user !== undefined) {
      const username = user.name;
      const userID = user._id;

      socket.emit('join', { username, userID }, () => {});
      console.log(username);

      /// DISCONNECT

      return () => {
        socket.emit('disconnect', { username, userID }, () => {});
        socket.off();
      };
    }
  }, [user]);

  //work in progress to see who is online
  useEffect(() => {
    socket.on('online', (data) => {
      console.log(data);
      setUsersID(data);
    });
  }, [usersID]);

  useEffect(() => {
    if (socket.hasListeners('message')) {
      socket.removeEventListener('message');
    }

    socket.on('message', (data) => {
      console.log('socket', conversation);
      handleNewMessage(data, addMessage);
      console.log('received message', data);
    });
  }, [conversation]);

  const handleNewMessage = async (data, addMessage) => {
    // Conversation id and message.

    const { _id, message } = data;
    console.log(conversation, _id);
    if (conversation && _id === conversation._id) {
      await addMessage(_id, message);
    }
  };

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <SearchConversation user={user} />

          <Conversations
            conversations={conversations}
            user={user}
            usersID={usersID}
          ></Conversations>
        </div>

        <Messages
          conversations={conversations}
          user={user}
          socket={socket}
        ></Messages>
      </div>
    </div>
  );
};

export default Home;
