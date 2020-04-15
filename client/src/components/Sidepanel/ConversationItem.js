import React, { useContext, useEffect, useState, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';


const ConversationItem = ({ conversation }) => {

  const [conversation1, setConversation] = useState(null)
  

  const chatContext = useContext(ChatContext);
  const {loading, getConversationMsgs, setCurrentConversation} = chatContext
 
 
const { _id, lastMessage, recipientObj, date } = conversation;


let dateString = (new Date(1586803713875)).toLocaleString()
const loadConvo= () => {
  setCurrentConversation(conversation)
  getConversationMsgs(_id)}

  return (
    <Fragment>
      {conversation  && !loading ? (
        <div className='chat_list ' onClick={loadConvo} >
          {/* need to toggle active_chat class on click later */}
          <div className='chat_people' >
            <div className='chat_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='chat_ib'>
              <h5>
            {recipientObj[0].name}
            <Fragment>{conversation  && !loading ? <span className='chat_date'>{date}</span> : {date} }</Fragment>
              </h5>
              <p>{lastMessage}</p>
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
