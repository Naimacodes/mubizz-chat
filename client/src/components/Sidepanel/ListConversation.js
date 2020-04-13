import React from 'react';
import Messages from '../Messages/Messages';
import Conversations from './Conversations'
import SearchConversation from './SearchConversation'


const ListConversation = () => {
  

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <div className='headind_srch'>
            <div className='recent_heading'>
              <h4>Recent</h4>
            </div>
          {/* here */}
          <SearchConversation/>
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
