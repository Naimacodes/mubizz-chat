import React, { useContext, useEffect, useState, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const ConversationItem = ({ conversation }) => {
  const { lastMessage, recipientObj, date } = conversation;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Fragment>
      {conversation !== null && user !== null ? (
        <div className='chat_list '>
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
                name
                <span className='chat_date'>{date}</span>
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
