import React, { useContext, useEffect, Fragment } from 'react';
import ConversationItem from './ConversationItem';
import ListConversation from './ListConversation';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';

const Conversations = () => {
  const chatContext = useContext(ChatContext);
  const { conversations, filtered, loading } = chatContext;


  if (conversations !== null && conversations.length === 0 && !loading) {
    return <h4>Please start a conversation</h4>;
  }

  return (
    <Fragment>
      {conversations !== null && !loading ? (
        <div className='inbox_chat'>
          {filtered !== null
            ? filtered.map((conversation) => (
          
                  <ConversationItem key={conversation._id} conversation={conversation} />
                
              ))
            : conversations.map((conversation) => (
                
                  <ConversationItem key={conversation._id} conversation={conversation} />
               
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>

  )
};

export default Conversations;
