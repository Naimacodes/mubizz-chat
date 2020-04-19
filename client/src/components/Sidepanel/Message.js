import React, { useEffect, useContext, Fragment } from 'react';
// import './Message.css';
import ReactEmoji from 'react-emoji';
import ChatContext from '../../context/chat/chatContext';
import Input from '../Input/Input';

const Message = () => {
  const chatContext = useContext(ChatContext);
  const { getConversationMsgs } = chatContext;

  return (
    <Fragment>
      <div className='mesgs'>
        <div className='msg_history'>
          <div className='incoming_msg'>
            <div className='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='received_msg'>
              <div className='received_withd_msg'>
                <p>Hey, this is a placeholder conversation.</p>
                <span className='time_date'> 10:01 AM | April 9</span>
              </div>
            </div>
          </div>
          <div className='outgoing_msg'>
            <div className='sent_msg'>
              <p>Great.</p>
              <span className='time_date'> 11:30 AM | April 10</span>
            </div>
          </div>
          <div className='outgoing_msg'>
            <div className='sent_msg'>
              <p>There is still work to do.</p>
              <span className='time_date'> 11:31 AM | April 10</span>
            </div>
          </div>

          <div className='incoming_msg'>
            <div className='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='received_msg'>
              <div className='received_withd_msg'>
                <p>I know right ?</p>
                <span className='time_date'> 01:35 PM | April 10</span>
              </div>
            </div>
          </div>
        </div>
        <Input></Input>
      </div>
    </Fragment>
  );
};

export default Message;
