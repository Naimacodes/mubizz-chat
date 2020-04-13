import React, { useEffect, useContext, Fragment } from 'react';
// import './Message.css';
import ReactEmoji from 'react-emoji';
import ChatContext from '../../../context/chat/chatContext';
import Input from '../../Input/Input';

const Message = () => {
  const chatContext = useContext(ChatContext);
  const { getConversationMsgs } = chatContext;

  return (
    <Fragment>
      <div class='mesgs'>
        <div class='msg_history'>
          <div class='incoming_msg'>
            <div class='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='sunil'
              />
            </div>
            <div class='received_msg'>
              <div class='received_withd_msg'>
                <p>Hey, this is a placeholder conversation.</p>
                <span class='time_date'> 10:01 AM | April 9</span>
              </div>
            </div>
          </div>
          <div class='outgoing_msg'>
            <div class='sent_msg'>
              <p>Great.</p>
              <span class='time_date'> 11:30 AM | April 10</span>
            </div>
          </div>
          <div class='outgoing_msg'>
            <div class='sent_msg'>
              <p>There is still work to do.</p>
              <span class='time_date'> 11:31 AM | April 10</span>
            </div>
          </div>

          <div class='incoming_msg'>
            <div class='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='sunil'
              />
            </div>
            <div class='received_msg'>
              <div class='received_withd_msg'>
                <p>I know right ?</p>
                <span class='time_date'> 01:35 PM | April 10</span>
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
