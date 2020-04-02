import React from 'react';
import './Message.css';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimName = name.trim().toLowerCase();
  if (user === trimName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sent-text pr-10'>{trimName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{text}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{text}</p>
      </div>
      <p className='sent-text pl-10'>{user}</p>
    </div>
  );
};

export default Message;
