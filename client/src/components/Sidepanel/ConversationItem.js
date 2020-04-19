import React, { useContext, useEffect, useState, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';
import moment from 'moment'

const ConversationItem = ({ message, conversation, user, conversations }) => {
  const [conversation1, setConversation] = useState(null);

  const chatContext = useContext(ChatContext);
  const { loading, getConversationMsgs, setCurrentConversation, setRecipient, recipient } = chatContext;


  




  const handleRecipient = (recipients) => {
    for (let i = 0; i < conversation.recipients.length; i++) {
      if (recipients[i] !== user.name) {
        return recipients[i];
        
      }
    }
    return null;
  };



let length = conversation.messages.length
let newDate = moment(`${conversation.messages[length-1].date}`).format('MM/DD/YYYY');

  return (
    <Fragment>
      {conversation !== null && !loading ? (
        <div className='chat_list ' onClick={() => setCurrentConversation(conversation)}>
          {/* need to toggle active_chat class on click later */}
          <div className='chat_people'>
            <div className='chat_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='chat_ib'>
              <h5>
           {user !== null && conversation !== null ? handleRecipient(conversation.recipients) : null
           }
                <Fragment>
                 
                    <span className='chat_date'>{newDate}</span>
    
                </Fragment>
              </h5>
              <p>{conversation.messages[length-1].text}</p>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default ConversationItem;
