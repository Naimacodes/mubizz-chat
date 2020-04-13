import React, { Fragment } from 'react';
import Messages from '../Messages/Messages';


const ListConversation = () => {
  return (
    <div class='messaging'>
      <div class='inbox_msg'>
        <div class='inbox_people'>
          <div class='headind_srch'>
            <div class='recent_heading'>
              <h4>Recent</h4>
            </div>
            <div class='srch_bar'>
              <div class='stylish-input-group'>
                <input
                  type='text'
                  class='search-bar'
                  placeholder='Search'
                ></input>
                <span class='input-group-addon'>
                  <button type='button'>
                    {' '}
                    <i class='fa fa-search' aria-hidden='true'></i>{' '}
                  </button>
                </span>
              </div>
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <div class='inbox_chat'>
            <div class='chat_list active_chat'>
              <div class='chat_people'>
                <div class='chat_img'>
                  <img
                    src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                    alt='sunil'
                  />
                </div>
                <div class='chat_ib'>
                  <h5>
                    Test user <span class='chat_date'>April 13th</span>
                  </h5>
                  <p>
                    Test, this will display the last message of our
                    conversations.
                  </p>
                </div>
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div class='chat_list'>
              <div class='chat_people'>
                <div class='chat_img'>
                  <img
                    src='https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/19339625881548233621-256.png'
                    alt='sunil'
                  />
                </div>
                <div class='chat_ib'>
                  <h5>
                    Test user2 <span class='chat_date'>April 12th</span>
                  </h5>
                  <p>
                    Test, this will display the last message of our
                    conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§ */}
        <Messages></Messages>
      </div>
    </div>
  );
};

export default ListConversation;
