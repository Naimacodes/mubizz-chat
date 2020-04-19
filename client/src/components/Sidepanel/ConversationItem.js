import React, { useContext, Fragment } from 'react';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';
import moment from 'moment';

const ConversationItem = ({conversation, user }) => {


  const chatContext = useContext(ChatContext);
  const {
    loading,
    setCurrentConversation,
  } = chatContext;

  const handleRecipient = (recipients) => {
    for (let i = 0; i < conversation.recipients.length; i++) {
      if (recipients[i] !== user.name) {
        return recipients[i];
      }
    }
    return null;
  };

  let length = conversation.messages.length;
  let newDate;
  return (
    <Fragment>
      {conversation !== null && !loading ? (
        <div
          className='chat_list '
          onClick={() => setCurrentConversation(conversation)}
        >
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
                 {handleRecipient(conversation.recipients)}
                  
                <Fragment>
                  {  conversation.messages.length !== 0 ? 
                  <span className='chat_date'>{moment(`${conversation.messages[length-1].date}`).format('MM/DD/YYYY')}</span> : null}
                </Fragment>
              </h5>
              <p>{conversation.messages.length !== 0 ? conversation.messages[length - 1].text : null}</p>
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
