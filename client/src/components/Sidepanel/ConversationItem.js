import React, { useContext, useEffect, Fragment } from 'react';


const ConversationItem = ({ conversation }) => {
  
  const { lastMessage, recipientObj, date } = conversation;

  return (

    
      <div className='chat_list active_chat'>
        <div className='chat_people'>
          <div className='chat_img'>
            <img
              src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
              alt='icon'
            />
          </div>
          <div className='chat_ib'>
            <h5>
              {recipientObj[0].name}
              <span className='chat_date'>{date.toString()}</span>
            </h5>
            <p>{lastMessage}</p>
          </div>
        </div>
      </div>
    
  );
};

export default ConversationItem;
