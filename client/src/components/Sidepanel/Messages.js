import React, { useContext, Fragment, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';

const Messages = ({ user }) => {
  const chatContext = useContext(ChatContext);
  const { current, loading } = chatContext;
  // console.log(current);

  return (
    <Fragment>
      <div className='mesgs'>
        <div className='msg_history'>
          {current && current !== null && !loading ? (
            <div>
              {' '}
              {current.messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  current={current}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Messages;
