import React, { Fragment } from 'react';
import ReactEmoji from 'react-emoji';
import moment from 'moment';

const Message = ({ user, message }) => {
  const { name, text, date, url } = message;

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
                <p>
                  {message.type === 'VideoOrImage' ? (
                    url.substring(url.length - 3, url.length) === 'mp4' ? (
                      <video
                        src={`http://localhost:5000/${url}`}
                        alt='uploaded-vid'
                        type='video/mp4'
                        controls
                      ></video>
                    ) : (
                      <span>
                        <img
                          src={`http://localhost:5000/${url}`}
                          alt='uploaded-pic'
                        ></img>
                      </span>
                    )
                  ) : (
                    ReactEmoji.emojify(text)
                  )}
                </p>
                <span className='time_date'>
                  {' '}
                  {moment(date).format('MMM Do YY, h:mm a')}
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
              <p>
                {message.type === 'VideoOrImage' ? (
                  url.substring(url.length - 3, url.length) === 'mp4' ? (
                    <video
                      src={`http://localhost:5000/${url}`}
                      alt='video'
                      type='video/mp4'
                      controls
                    ></video>
                  ) : (
                    <img src={`http://localhost:5000/${url}`} alt='sent-pic'></img>
                  )
                ) : (
                  ReactEmoji.emojify(text)
                )}
              </p>
              <span className='time_date'>
                {' '}
                {moment(date).format('MMM Do YY, h:mm a')}
              </span>
            </div>{' '}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Message;
