import React, { useContext, useEffect, useState, Fragment } from 'react';
import ConversationItem from './ConversationItem';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';

const Conversations = ({ user, usersID }) => {
  const chatContext = useContext(ChatContext);
  const { conversations, filtered, loading, current } = chatContext;

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
      {conversations && conversations !== null && !loading ? (
        <div className='inbox_chat'>
          {filtered && filtered !== null
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
                  usersID={usersID}
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
