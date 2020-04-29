import React, { useContext,Fragment } from 'react';
import ChatContext from '../../context/chat/chatContext';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import ReactEmoji from 'react-emoji';
import onlineIcon from '../../icons/onlineIcon.png';
import socket from '../../socketConfig';

const ConversationItem = ({ conversation, user, usersID }) => {
  const chatContext = useContext(ChatContext);

  const {
    loading,
    setCurrentConversation,
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
    console.log('setting conversation', conversation);
    setCurrentConversation(conversation);
  };



  const whosOnline = (usersID) => {
    for (let i = 0; i < usersID.length; i++) {
      if (usersID[i][socket.id] !== user.name) {
        console.log(usersID[i][socket.id]);
        return usersID[i][socket.id];
      

      }
    }
    return null;
  };

  // if(usersID)
  // {console.log()}

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
              </h5>
              <div>{user !== null && usersID ? whosOnline(usersID) : null}</div>
              {conversation.messages.length !== 0 ? (
                conversation.messages[length - 1].text === '' ? (
                  <div>
                    <p>
                      {' '}
                      <i className='fas fa-mountain'></i> A media file was sent.
                    </p>{' '}
                  </div>
                ) : (
                  <div>
                    <p>
                      {ReactEmoji.emojify(
                        conversation.messages[length - 1].text
                      )}
                    </p>
                  </div>
                )
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
