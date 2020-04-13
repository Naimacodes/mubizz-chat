import React from 'react';
import Messages from '../Messages/Messages';
import Conversations from './Conversations'


const ListConversation = () => {
  

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <div className='headind_srch'>
            <div className='recent_heading'>
              <h4>Recent</h4>
            </div>
            <div className='srch_bar'>
              <div className='stylish-input-group'>
                <input
                  type='text'
                  className='search-bar'
                  placeholder='Search'
                ></input>
                <span className='input-group-addon'>
                  <button type='button'>
                    {' '}
                    <i className='fa fa-search' aria-hidden='true'></i>{' '}
                  </button>
                </span>
              </div>
            </div>
          </div>

          
          
          <div className='inbox_chat'>
           <Conversations></Conversations>
          </div>
          
        </div>

       
        <Messages></Messages>
      </div>
    </div>
  );
};

export default ListConversation;
