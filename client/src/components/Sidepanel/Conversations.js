import React, { useContext, useEffect, Fragment } from 'react';
import ConversationItem from './ConversationItem';
import io from 'socket.io-client';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';

const Conversations = ({ user }) => {
  const chatContext = useContext(ChatContext);
  const { getConversations, conversations, setConversation, filtered, loading } = chatContext;
  useEffect(() => {
    getConversations();
   //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    const socketUrl = 'http://localhost:5000/api/conversations/messages';
 
    const socket = io(socketUrl);
  
    socket.on('message', data => setConversation(data));
    //  eslint-disable-next-line
}, []);
  if (conversations !== null && conversations.length === 0 && !loading) {
    return (
      <div className='chat_list '>
        <div className='chat_people'>
          <div className='chat_ib'>
            <h5>You have no conversations for now.</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {conversations !== null && !loading ? (
        <div className='inbox_chat'>
          {filtered !== null
            ? filtered.map((conversation) => (
                <ConversationItem
                  key={conversation._id}
                  conversation={conversation}
                  conversations={conversations}
                  user={user}
                />
              ))
            : conversations.map((conversation) => (
                <ConversationItem
                  key={conversation._id}
                  conversation={conversation}
                  conversations={conversations}
                  user={user}
                />
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Conversations;