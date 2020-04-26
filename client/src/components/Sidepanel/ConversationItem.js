import React, { useContext, useState, useEffect, Fragment } from 'react';
import ChatContext from '../../context/chat/chatContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import onlineIcon from '../../icons/onlineIcon.png';

const ConversationItem = ({ conversation, user, usersID }) => {
  const [active, setActive] = useState(false);
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const { isAuthenticated } = authContext;
  const {
    loading,
    setCurrentConversation,
    getCurrentConversation,
    getConversations,
    current,
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

  const getconvo = () => {
    setCurrentConversation(conversation);

    if (current) {
      getCurrentConversation(current._id);
    }
    console.log(conversation);
  };

  return (
    <Fragment>
      {conversation && conversation !== null && !loading ? (
        <div
          className={
            current && current._id === conversation._id
              ? 'chat_list active_chat'
              : 'chat_list '
          }
        >
          <div className='chat_people'>
            <div className='chat_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='chat_ib' onClick={getconvo}>
              <h5>
                {conversation.recipients.length !== 0 && user
                  ? handleRecipient(conversation.recipients)
                  : 'loading'}

                <Fragment>
                  {conversation.messages.length !== 0 ? (
                    <span className='chat_date'>
                      {moment(
                        `${conversation.messages[length - 1].date}`
                      ).format('MMM Do YY')}
                    </span>
                  ) : null}
                </Fragment>
                {/* { ? <img  className="iconOnline"  alt="Online Icon" src={onlineIcon}/> : ""} */}
              </h5>

              {conversation.messages.length !== 0 ? (
                <div>
                  {ReactEmoji.emojify(conversation.messages[length - 1].text)}
                </div>
              ) : null}
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
