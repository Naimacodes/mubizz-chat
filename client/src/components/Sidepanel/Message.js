import React, { useEffect, useContext, Fragment } from 'react';
// import './Message.css';
import ReactEmoji from 'react-emoji';
// import ChatContext from '../../context/chat/chatContext';
import moment from 'moment';

const Message = ({ user, message, current }) => {
  // const chatContext = useContext(ChatContext);
  // const { current} = chatContext;
  console.log(current);
  return (
    <Fragment>
      <div className='incoming_msg'>
        {message && message.name !== user.name ? (
          <Fragment>
            <div className='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='received_msg'>
              <div className='received_withd_msg'>
                <p>{message.text}</p>
                <span className='time_date'> {moment(`${message.date}`).format('MM/DD/YYYY')}</span>
              </div>
            </div>{' '}
          </Fragment>
        ) : null}
      </div>

      <div className='outgoing_msg'>
        {message && message.name === user.name ? (
          <Fragment>
            <div className='sent_msg'>
              <p>{message.text}</p>
              <span className='time_date'>
                {' '}
                {moment(`${message.date}`).format('MM/DD/YYYY')}
              </span>
            </div>{' '}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Message;