import React, { useContext, Fragment } from 'react';

import Message from './Message';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';
import Input from '../Input/Input';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ user, socket }) => {
  const chatContext = useContext(ChatContext);
  const { conversation, loading } = chatContext;

  return (
    <Fragment>
      <div className='mesgs'>
        <ScrollToBottom className='msg_history'>
          {conversation && conversation !== null && !loading ? (
            <div>
              {' '}
              {conversation.messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  conversation={conversation}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </ScrollToBottom>
        <Input conversation={conversation} user={user} socket={socket}></Input>
      </div>
    </Fragment>
  );
};

export default Messages;
