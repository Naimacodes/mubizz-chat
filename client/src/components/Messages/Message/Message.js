import React, { Fragment } from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimName = name.trim().toLowerCase();
  if (user === trimName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Fragment>
      <div className='name-top'>
        <p className='sent-text pr-10 '>{trimName}</p>
      </div>

      <div className='messageContainer justifyEnd'>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
    <div className='name-top-grey'>
      <p className='sent-text pr-10 '>{user}</p>
    </div>
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      
    </div>
    </Fragment>
  );
};

export default Message;
