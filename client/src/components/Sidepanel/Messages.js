import React, { useContext, Fragment, useRef, useEffect } from 'react';

import Message from './Message';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';
import Input from '../Input/Input'
import ScrollToBottom from 'react-scroll-to-bottom'

const Messages = ({ user, socket, conversations}) => {
  const chatContext = useContext(ChatContext);
  const { current, loading, addMessage, updateLastMessageReadToServer} = chatContext;



  if (conversations === null && conversations === undefined || loading) {
    return (
      <div className='mesgs'>
        <div className='msg_history'>
          
            <h5>Loading.</h5>
         
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className='mesgs'>
        <ScrollToBottom className='msg_history'>
          {current && current !== null && !loading  ? (
            <div>
              
              {current.messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  current={current}
                  user={user}
                  messages={current.messages}
                />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </ScrollToBottom>
        <Input current={current} user={user} socket={socket}></Input>
      </div>
    </Fragment>
  );
};

export default Messages;
