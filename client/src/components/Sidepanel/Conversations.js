import React, { useContext, useEffect, Fragment } from 'react';
import ConversationItem from './ConversationItem';

import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';

const Conversations = ({ user }) => {
  const chatContext = useContext(ChatContext);
  const { getConversations, conversations, filtered, loading } = chatContext;
  useEffect(() => {
    getConversations();
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
