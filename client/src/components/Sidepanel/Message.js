import React, { Fragment, useState,useEffect,  useContext } from 'react';
import ReactEmoji from 'react-emoji';
import moment from 'moment';

const Message = ({ user, message}) => {
  const { name, text, date } = message;



  return (
    <Fragment>
      <div className='incoming_msg'>
        {user && message && name !== user.name ? (
          <Fragment>
            <div className='incoming_msg_img'>
              <img
                src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                alt='icon'
              />
            </div>
            <div className='received_msg'>
              <div className='received_withd_msg'>
                <p>{ReactEmoji.emojify(text)}</p>
                <span className='time_date'>
                  {' '}
                  {moment(`${date}`).format('MMM Do YY, h:mm a')}
                </span>
              </div>
            </div>{' '}
          </Fragment>
        ) : null}
      </div>

      <div className='outgoing_msg'>
        {user && message && name === user.name ? (
          <Fragment>
            <div className='sent_msg'>
              <p>{ReactEmoji.emojify(text)}</p>
              <span className='time_date'>
                {' '}
                {moment(`${date}`).format('MMM Do YY, h:mm a')}
              </span>
            </div>{' '}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Message;
