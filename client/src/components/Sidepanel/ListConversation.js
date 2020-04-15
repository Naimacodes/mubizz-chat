import React from 'react';
import Messages from '../Messages/Messages';
import Conversations from './Conversations';
import SearchConversation from './SearchConversation';

const ListConversation = () => {
  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <SearchConversation />

          <Conversations></Conversations>
        </div>

        <Messages></Messages>
      </div>
    </div>
  );
};

export default ListConversation;
